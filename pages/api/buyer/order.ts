import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { DeliverStats, ORDERDETAIL } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductInfo } from "../../../helper/CartStore";
import { myPrismaClient } from "../../../helper/prismaClient";
import { handleQuery } from "../../../helper/queryHelper";

interface OrderNextApiRequest extends NextApiRequest {
  body: {
    userId: number;
    shopId: number;
    product: ProductInfo[];
  };
}

const getUser = async (userId: number) => {
  await myPrismaClient.$connect();
  const userData = await myPrismaClient.uSER.findUnique({
    where: {
      userId: userId,
    },
  });

  return userData;
};

const getShop = async (shopId: number) => {
  await myPrismaClient.$connect();
  const shopData = await myPrismaClient.sHOP.findUnique({
    where: {
      shopId: shopId,
    },
  });

  return shopData;
};

const createOrderDetail = async (
  orderId: number,
  proudctId: number,
  quantity: number,
  shopId: number
) => {
  await myPrismaClient.$connect();
  const product = await myPrismaClient.pRODUCT.findFirst({
    where: {
      AND: [
        { productId: { equals: proudctId } },
        { shopId: { equals: shopId } },
        { quantity: { gte: quantity } },
      ],
    },
  });

  if (!product) {
    return null;
  }

  try {
    const orderDetail = await myPrismaClient.oRDERDETAIL.create({
      data: {
        productId: product.productId,
        orderId: orderId,
        quantity: quantity,
      },
    });
    product.quantity = product.quantity - quantity;
    await myPrismaClient.pRODUCT.update({
      data: product,
      where: {
        productId: product.productId,
      },
    });

    return{
      bill: product.price * quantity,
      data:orderDetail
    } ;
  } catch (error) {
    return null;
  }
};

async function handler(req: OrderNextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      const order:(OrderDetailResult | null) = await POST(req);
      if (!order) {
        res.status(404);
        return;
      }
      res.status(200).json(order);
      return;
    }
    case "GET": {
      const detail = await GET(req);
      res.status(200).json(detail);
    }
  }
  res.status(404);
}

async function POST(req: OrderNextApiRequest) {
  const { userId, shopId, product } = req.body;

  if (!shopId || !product || product.length === 0 || !userId) {
    return null;
  }

  const userData = await getUser(userId);
  const shoppData = await getShop(shopId);
  if (!userData || !shoppData) {
    return null;
  }

  const order = await myPrismaClient.oRDER.create({
    data: {
      bill: 0,
      userId: userData.userId,
      shopId: shoppData.shopId,
      date: new Date()
    },
  });      
  
  if (!order) {
    return null;
  }

  const orderDeatilPromise: Promise<{bill: number,data: ORDERDETAIL} | null>[] = [];

  product.forEach((productInfo) => {
    orderDeatilPromise.push(
      createOrderDetail(
        order.orderId,
        productInfo.id,
        productInfo.quantity,
        shoppData.shopId
      )
    );
  });

  const finish = await Promise.all(orderDeatilPromise);
  const filter = finish.filter((item) => {
    return item !== null;
  });

  if (filter.length === 0) {
    await myPrismaClient.oRDER.delete({
      where: {
        orderId: order.orderId,
      },
    });
    return null;
  }

  let totalBill = 0;
  filter.forEach(item=>{
    totalBill += (item) ? item.bill : 0;
  })

  const updateData = await myPrismaClient.oRDER.update({
    where:{
      orderId: order.orderId
    },
    data:{
      bill: totalBill
    },
    select: {
      orderId: true,
      deliveringStatus:true,
      SHOP: {
        select: {
          shopName: true
        }
      },
      ORDERDETAIL: {
        select: {
          PRODUCT: {
            select: {
              title: true
            }
          },
          quantity: true
        }
      }
    }
  })


  return updateData;
}

async function GetOrderById(userIdData: number, orderIdData: number) {
  await myPrismaClient.$connect();
  const orderResult: OrderDetailResult | null =
    await myPrismaClient.oRDER.findFirst({
      where: {
        orderId: orderIdData,
        userId: userIdData,
      },
      select: {
        orderId: true,
        deliveringStatus: true,
        SHOP: {
          select: {
            shopName: true,
          },
        },
        ORDERDETAIL: {
          select: {
            PRODUCT: {
              select: {
                title: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  return orderResult;
}
async function GetOrder(userIdData: number, filter:string, page: number = 0) {
  await myPrismaClient.$connect();
  const orders: OrderDetailResult[] = await myPrismaClient.oRDER.findMany({
    skip: 10 * page,
    take: 10,
    orderBy: [{ date: "desc" }],
    select: {
      orderId: true,
      deliveringStatus: true,
      SHOP: {
        select: {
          shopName: true,
        },
      },
      ORDERDETAIL: {
        select: {
          PRODUCT: {
            select: {
              title: true,
            },
          },
          quantity: true,
        },
      },
    },
  });
  return orders;
}
async function GET(req: OrderNextApiRequest) {
  const { userId, orderId, page,filter } = req.query;

  const userIdData = Number.parseInt(handleQuery(userId));
  const orderIdData = Number.parseInt(handleQuery(orderId));
  const pageData = Number.parseInt(handleQuery(page));
  const filterData = handleQuery(filter);

  if (isNaN(userIdData)) {
    return null;
  }

  if (isNaN(orderIdData)) {
    const pageNumber = isNaN(pageData) ? 0 : pageData;
    const orders = await GetOrder(userIdData,filterData,pageNumber);
    return orders;
  }

  const orderResult = await GetOrderById(userIdData, orderIdData);

  return orderResult;
}

export interface OrderDetailResult {
  orderId: number;
  SHOP: {
    shopName: string;
  };
  ORDERDETAIL: {
    quantity: number;
    PRODUCT: {
      title: string;
    };
  }[];
  deliveringStatus: DeliverStats;
}

export default withApiAuthRequired(handler);
