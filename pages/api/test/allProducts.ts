import { PrismaClient, PRODUCT } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

interface Data{
  productTitle:String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PRODUCT[]>
) {
  const findAll = await prisma.pRODUCT.findMany();
  res.status(200).json(findAll);
}