import type { NextApiRequest, NextApiResponse } from 'next'
import { BRAND } from '@prisma/client';
import { myPrismaClient } from '../../helper/prismaClient';

export default async function handler(req:NextApiRequest,res:NextApiResponse<BRAND[]>){
  await myPrismaClient.$connect();
  const brands = await myPrismaClient.bRAND.findMany({});

  res.status(200).json(brands);
}