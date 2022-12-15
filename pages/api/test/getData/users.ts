import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    const client = new PrismaClient();
    await client.$connect();
    const getData = await client.uSER.findMany({
    });
    client.$disconnect();
    res.status(200).json(getData);
    return;
  }
  res.status(200).json({
    error: "Wrong params",
  });
}
