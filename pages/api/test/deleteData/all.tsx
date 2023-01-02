import { myPrismaClient } from "../../../../helper/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    await myPrismaClient.$connect();
    const delUser = await myPrismaClient.uSER.deleteMany();
    const delProduct = await myPrismaClient.uSER.deleteMany({});
    const delOrder = await myPrismaClient.oRDER.deleteMany({});
    const delDetail = await myPrismaClient.oRDERDETAIL.deleteMany({});

    res.status(200).json({
      ...delUser,...delProduct,...delOrder,...delDetail
      ,});
    return;
  }
  res.status(200).json({
    addCount: 0,
    error: "Wrong params",
  });
}

