import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BRAND } from '@prisma/client';

export default async function handler(req:NextApiRequest,res:NextApiResponse<BRAND[]>){
  const prisma = new PrismaClient();
  await prisma.$connect();
  const brands = await prisma.bRAND.findMany({});

  res.status(200).json(brands);
}