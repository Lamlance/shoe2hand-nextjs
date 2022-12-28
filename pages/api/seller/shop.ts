import { myPrismaClient } from '../../../helper/prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0';
import { validateUser } from './product';

interface ShopInfoRequest extends NextApiRequest{
  body:{
    shopId:number,
    shopName:string
  }
}

async function handler(req:ShopInfoRequest,res:NextApiResponse){
  const user = (await getSession(req, res))?.user;
  const email = user?.email;
  const sub = user?.sub;

  if (!user || !(email && sub)) {
    res.status(401).json({
      data: "Login required"
    })
    return;
  }

  const userValidation = await validateUser(email, sub);
  if (!userValidation) {
    res.status(404).json({
      data: "Cant find user on DB"
    })
    return;
  }

  if(req.method !== "PUT"){
    res.status(404).json({
      data: "Invalid method"
    })
    return;
  }

  const shopId = req.body.shopId;
  const shopName = req.body.shopName;
  if(!shopId || !shopName){
    res.status(404).json({
      data: "Invalid body"
    })
    return;
  }

  await myPrismaClient.$connect();
  try {
    const updateShop = await myPrismaClient.sHOP.update({
      where:{
        shopId: shopId
      },
      data:{
        shopName: shopName
      }
    })
    res.status(200).json(updateShop);
    return;
  } catch (error) {
    res.status(404).json({
      data: "shopId not found"
    })
    return;
  }
  return;
}

export default handler;