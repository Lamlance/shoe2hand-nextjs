import { myPrismaClient } from "../../helper/prismaClient";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import { USER } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { userId,name } = req.body;

  if(!userId){
    const fetchUser:{userData:USER} = await (await fetch("/api/user")).json();
    userId = fetchUser.userData.userId;
  }

  if(!(userId)){
    res.status(404).json({
      error: "Request body error"
    })
    return;
  }

  await myPrismaClient.$connect();
  const savedData = await myPrismaClient.sHOP.findFirst({
    where: {
      ownerId:{
        equals: userId
      }
    }
  })

  if(!savedData){
    const newShop = await myPrismaClient.sHOP.create({
      data:{
        ownerId: userId,
        shopName: (name) ? name : `User${userId}'s Shop`
      },
    })
    res.status(200).json({
      shop:newShop
    })
    return
  }

  res.status(200).json({
    shop:savedData
  })
}


export default withApiAuthRequired(handler);