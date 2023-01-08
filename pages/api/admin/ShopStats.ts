import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { SHOP } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { myPrismaClient } from "../../../helper/prismaClient";
import { handleQuery } from "../../../helper/queryHelper";
import { validateShop, validateUser } from "../seller/product";

interface ShopStatsBody extends NextApiRequest {
  body: {
    shopId: number
  }
}

async function POST(req: ShopStatsBody) {
  if (req.body.shopId === null || req.body.shopId === undefined) {
    return null;
  }
  // const shopData = await validateShop(req.body.shopId,userData.userId);
  const shopData = await myPrismaClient.sHOP.findUnique({
    where: {
      shopId: req.body.shopId
    }
  });
  if (!shopData) {
    return null;
  }
  const shopBill = await myPrismaClient.oRDER.groupBy({
    by: ["shopId"],
    where: {
      shopId: { equals: shopData.shopId },
    },
    _sum: {
      bill: true
    },
    _count: {
      orderId: true
    }
  });
  const shopProducts = await myPrismaClient.pRODUCT.groupBy({
    by: ["shopId"],
    where: {
      shopId: { equals: shopData.shopId },
    },
    _sum: {
      quantity: true
    },
    _count: {
      productId: true
    }
  })
  const shopStats = {
    _sum: {
      ...(!shopBill[0] ? {} : shopBill[0]._sum),
      ...(!shopProducts[0] ? {} : shopProducts[0]._sum)
    },
    _count: {
      ...(!shopBill[0] ? {} : shopBill[0]._count),
      ...(!shopProducts[0] ? {} : shopProducts[0]._count)
    },
    ...shopData
  }
  return shopStats;
}

async function handler(req: ShopStatsBody, res: NextApiResponse) {
  const user = (await getSession(req, res))?.user;
  if (!user) {
    res.status(404).json(null);
    return null;
  }

  await myPrismaClient.$connect();
  const userData = await validateUser(user.email, user.sub);
  if (!userData || !userData.isAdmin) {
    res.status(404).json(null);
    return null;
  }

  switch (req.method) {
    case "POST":{
      const status = await POST(req);
      res.status(200).json(status);
      return;
    }
    case "GET":{
      const page = Number.parseInt(handleQuery(req.query.page));
      await myPrismaClient.$connect();
      const shopIds = await myPrismaClient.sHOP.findMany({
        select:{shopId:true,shopName:true},
        take:10,
        skip: 10* (isNaN(page) ? 0 : page)
      })
      res.status(200).json(shopIds);
      return;
    }
  }
  res.status(404).json(null);
  return;
}
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any

export type ShopStatsRespond = AsyncReturnType<typeof POST>;

export default withApiAuthRequired(handler);