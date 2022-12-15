import { prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    const client = new PrismaClient();
    await client.$connect();
    const delUser = await client.uSER.deleteMany();
    const delProduct = await client.uSER.deleteMany({});
    const delOrder = await client.oRDER.deleteMany({});
    const delDetail = await client.oRDERDETAIL.deleteMany({});

    client.$disconnect();
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

