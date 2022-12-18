import { myPrismaClient } from "../../../_app";
import type { NextApiRequest, NextApiResponse } from 'next'

const brandData: { brandId: number, brandName: string }[] = [
  {
    brandId: 0,
    brandName: "No Brand"
  },
  {
    brandId: 1,
    brandName: "Nike"
  },
  {
    brandId: 2,
    brandName: "Puma"
  },
  {
    brandId: 3,
    brandName: "New Balance"
  },
  {
    brandId: 4,
    brandName: "Addidas"
  }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    await myPrismaClient.$connect();
    const addData = await myPrismaClient.bRAND.createMany({
      data: brandData,
      skipDuplicates: true
    });
    res.status(200).json({
      addCount: addData.count
    })
    return;
  }
  res.status(200).json({
    addCount: 0,
    error:"Wrong params"
  })
}