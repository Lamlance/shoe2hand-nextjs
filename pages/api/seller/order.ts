import { getSession } from "@auth0/nextjs-auth0";
import { DeliverStats, ORDER } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { myPrismaClient } from "../../../helper/prismaClient";
import { handleQuery } from "../../../helper/queryHelper";
import { validateShop, validateUser } from "./product";

interface SellerOrderReq extends NextApiRequest {
  body: {
    shopId: number,
    orderId:number,
    status: DeliverStats
  }
}

export type SellerOrderGET = (ORDER & {
  ORDERDETAIL: {
      quantity: number;
      productId: number;
      PRODUCT: {
          title: string;
          price: number;
      };
  }[];
  USER: {
      userName: string;
      email: string;
  };
})

export type SellerOrderPUT = ORDER;


async function handler(req: SellerOrderReq, res: NextApiResponse) {
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
      data: "Cant find user on DB"
    })
    return;
  }

  switch (req.method) {
    case "GET": {
      const orders = await GET(req, userValidation.userId);
      res.status(orders.status).json(orders.content);
      return
    }
    case "PUT":{
      const updateOrder = await PUT(req,userValidation.userId);
      res.status(updateOrder.status).json(updateOrder.content);
      return;
    }
  }
  
  res.status(404);
}

async function GET(req: SellerOrderReq, userId: number) {
  const shopId = Number.parseInt(handleQuery(req.query.shopId));
  const pageQuery = Number.parseInt(handleQuery(req.query.page));

  if (isNaN(shopId)) {
    return {
      status: 404,
      content: "Shop id not found"
    };
  }
  const page = isNaN(pageQuery) ? 0 : pageQuery;
  const shop = await validateShop(shopId, userId);
  if (!shop) {
    return {
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const orders = await myPrismaClient.oRDER.findMany({
    take: 10,
    skip: page * 10,
    orderBy: [{ date: "desc" }],
    include: {
      ORDERDETAIL: {
        select: {
          quantity: true,
          productId: true,
          PRODUCT: {
            select: { title: true ,price:true}
          }
        }
      },
      USER: {
        select: {
          userName: true,
          email: true
        }
      }
    }
  })
  return {
    status: 200,
    content: orders
  };
}

async function PUT(req: SellerOrderReq, userId: number) {
  const shopId = req.body.shopId;
  const status = req.body.status;
  const orderId = req.body.orderId;

  if (isNaN(shopId) || !status || !orderId) {
    return {
      status: 404,
      content: "Shop id not found"
    };
  }

  const shop = await validateShop(shopId, userId);
  if (!shop) {
    return {
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const updateData = await myPrismaClient.oRDER.update({
    where:{
      orderId: orderId
    },
    data:{
      deliveringStatus: status
    }
  })

  return{
    status: 200,
    content: updateData
  }

}

export default handler;