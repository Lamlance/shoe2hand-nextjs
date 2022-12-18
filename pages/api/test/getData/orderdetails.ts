import type { NextApiRequest, NextApiResponse } from "next";
import { myPrismaClient } from "../../../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    await myPrismaClient.$connect();
    const getData = await myPrismaClient.oRDERDETAIL.findMany({
      take: 3,
    });
    res.status(200).json(getData);
    return;
  }
  res.status(200).json({
    error: "Wrong params",
  });
}
