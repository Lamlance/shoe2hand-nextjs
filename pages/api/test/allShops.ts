import { PrismaClient, PRODUCT } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await prisma.$connect();
  const findAll = await prisma.sHOP.findMany();
  res.status(200).json(findAll);
}