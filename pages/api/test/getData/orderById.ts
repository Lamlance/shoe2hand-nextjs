import type { NextApiRequest, NextApiResponse } from "next";
import { myPrismaClient } from "../../../../helper/prismaClient";
import { handleQuery } from "../../../../helper/queryHelper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    await myPrismaClient.$connect();
    const id = Number.parseInt(handleQuery(req.query.orderId))
    const getData = await myPrismaClient.oRDER.findFirst({
      where:{
        orderId: id
      },
      include:{
        ORDERDETAIL:{
          select:{
            orderdetailId: true,
            productId:true,
            quantity: true
          }
        }
      },
      take: 3,
    });
    res.status(200).json(getData);
    return;
  }
  res.status(200).json({
    error: "Wrong params",
  });
}