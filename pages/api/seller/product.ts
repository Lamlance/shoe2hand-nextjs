import { myPrismaClient } from "../../../helper/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleQuery } from "../../../helper/queryHelper";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PRODUCT } from "@prisma/client";
interface SellerProductAPI_PUT {
  data: string | PRODUCT
}
interface SellerProductAPI_DELETE {
  data: string | PRODUCT
}
interface SellerProductAPI_POST {
  data: string | PRODUCT
}
interface SellerProductAPI_GET {
  data: string | PRODUCT[]
}
interface CreateProductBody extends NextApiRequest {
  body: {
    title: string,
    quantity: number,
    price: number,
    hide: false,
    desc: string,
    shopId: number,
    brandId: number
  }
}
interface UpdateProductBody extends NextApiRequest {
  body:{
    productId:number,
    title:string,
    quantity: number,
    price: number,
    hide?: false,
    desc?: string,
    shopId:number
  }
}
export type { SellerProductAPI_PUT, SellerProductAPI_POST, SellerProductAPI_GET, SellerProductAPI_DELETE }

export async function validateUser(email: string, uuid: string) {
  await myPrismaClient.$connect();
  const user = await myPrismaClient.uSER.findFirst({
    where: {
      OR: [
        { email: { equals: email } },
        { uuid: { contains: uuid } }
      ]
    }
  });
  return user;
}

export async function validateShop(shopId: number, userid: number) {
  await myPrismaClient.$connect();
  const shop = await myPrismaClient.sHOP.findFirst({
    where: {
      AND: [
        { ownerId: { equals: userid } },
        { shopId: { equals: shopId } }
      ]
    }
  })
  return shop;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = (await getSession(req, res))?.user;
  const email = user?.email;
  const sub = user?.sub;

  if (!user || !(email && sub)) {
    res.status(401).json({
      data: "Login required"
    })
    return;
  }

  const userValidation = await validateUser(email, sub);
  if (!userValidation) {
    res.status(404).json({
      data: "Cant find user on DB",
    });
    return;
  }

  switch (req.method) {
    case "GET": {
      const getContent = await GET(req, res, userValidation.userId);
      res.status(getContent.status).json({
        data: getContent.content,
      });
      break;
    }
    case "POST": {
      const newContent = await POST(req, res, userValidation.userId);
      res.status(newContent.status).json({
        data: newContent.content,
      });
      break;
    }
    case "PUT": {
      const updateConent = await PUT(req, userValidation.userId);
      if(updateConent){
        res.status(200).json({data: updateConent});
      }
      break;
    }
    case "DELETE": {
      const deleteContent = await DELETE(req, res, userValidation.userId);
      res.status(deleteContent.status).json({
        data:
          typeof deleteContent.content === "string"
            ? deleteContent.content
            : deleteContent.content,
      });
      break;
    }
  }
  res.status(404);
}

async function GET(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const pageQuery = Number.parseInt(handleQuery(req.query.page));
  const shopId = Number.parseInt(handleQuery(req.query.shopId));
  if (isNaN(shopId)) {
    return {
      status: 404,
      content: "Shop id not found",
    };
  }

  const page = isNaN(pageQuery) ? 0 : pageQuery;

  const shop = await validateShop(shopId, userId);
  if (!shop) {
    return {
      status: 404,
      content: "Shop not found",
    };
  }

  await myPrismaClient.$connect();
  const product = await myPrismaClient.pRODUCT.findMany({
    take: 10,
    skip: 10 * page,
    where: {
      AND: [{ shopId: { equals: shop.shopId } }],
    },
  });

  return {
    status: 200,
    content: product,
  };
}
async function PUT(req: UpdateProductBody, userId: number) {
  const {productId,quantity,title,price,hide,desc,shopId} = req.body;
  if( !(productId && shopId) || !( title || quantity || price ) ){
    return null;
  }

  const shopData = await validateShop(shopId,userId);
  if(!shopData){
    return null;
  }
  await myPrismaClient.$connect();
  const update = await myPrismaClient.pRODUCT.update({
    where:{
      productId: productId
    },
    data:{
      title: title,
      quantity: quantity,
      price: price,
      description: desc
    }
  })
  return update;
}


async function POST(req: CreateProductBody, res: NextApiResponse, userId: number) {
  const { shopId, title, quantity, price, hide, desc, brandId } = req.body;

  if (!shopId || !title || !quantity || !price || !desc || !brandId) {
    console.log("Shop id not found")
    return {
      status: 404,
      content: "Shop id not found",
    };
  }

  const shop = await validateShop(shopId, userId);
  if (!shop) {
    console.log("Shop not found");
    return {
      status: 404,
      content: "Shop not found",
    };
  }

  await myPrismaClient.$connect();
  const newProduct = await myPrismaClient.pRODUCT.create({
    data: {
      title: title,
      quantity: isNaN(quantity) ? 0 : quantity,
      price: price,
      description: desc,
      shopId: shopId,
      isHidden: hide ? true : false,
    },
  });

  return {
    status: 200,
    content: newProduct,
  };
}


async function DELETE(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const { shopId: shopQuery, productId, selectId } = req.body;

  const shopId = Number.parseInt(handleQuery(shopQuery));
  const productIdData = Number.parseInt(handleQuery(productId));

  if (isNaN(shopId) || isNaN(productIdData)) {
    return {
      status: 404,
      content: "Body not found",
    };
  }

  const shop = await validateShop(shopId, userId);
  if (!shop) {
    console.log("Shop not found")
    return {
      status: 404,
      content: "Shop not found",
    };
  }

  await myPrismaClient.$connect();
  const deleted = await myPrismaClient.pRODUCT.delete({
    where: {
      productId: productIdData,
    },
  });

  return {
    status: 200,
    content: deleted,
  };
}

export default withApiAuthRequired(handler);


