import { myPrismaClient } from "../../../../helper/prismaClient";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    await myPrismaClient.$connect();
    const getData = await myPrismaClient.bRAND.findMany({
      take:10
    });
    res.status(200).json(getData);
    return;
  }
  res.status(200).json({
    error:"Wrong params"
  })
}