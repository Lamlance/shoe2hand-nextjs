import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient();

interface Data{
  name:String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const findLAM = await prisma.cUSTOMER.findFirst({
    where:{
      customerFullname:"Hoang LAM"
    }
  });

  if(findLAM){
    res.status(200).json({
      ...findLAM,
      msg:"LAM already exist"
    });
  }else{
    const addLam = await prisma.cUSTOMER.create({
      data:{
        customerFullname:"Hoang LAM"
      }});
    res.status(200).json({
      ...addLam,
      msg:"LAM added"
    });
  }


  
}