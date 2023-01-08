import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { myPrismaClient } from "../../../helper/prismaClient";
import { validateUser } from "../seller/product";
interface UpdateUserReqest extends NextApiRequest{
  body:{
    name: string,
    phone:string,
    address:string
  }
} 

async function handler (req:UpdateUserReqest,res:NextApiResponse){
  if(req.method !== "PUT"){
    res.status(404).json(null);
    return;
  }
  const user = (await getSession(req,res))?.user;
  if(!user){
    res.status(404).json(null);
    return;
  }

  await myPrismaClient.$connect();
  const userData = await validateUser(user.email,user.sub);
  if(!userData){
    res.status(404).json(null);
    return;
  }

  try {
    const updateData = await myPrismaClient.uSER.update({
      where:{
        userId: userData.userId
      },
      data:{
        userName: req.body.name,
        address: req.body.address,
        phone: req.body.phone
      }
    })
    res.status(200).json(updateData);
    return;
  } catch (error) {
    
  }
  res.status(400).json(null);
}

export default handler;