import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const findAll = await prisma.bRAND.findMany();
  res.status(200).json(findAll);
}