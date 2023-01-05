import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { myPrismaClient } from "../../../helper/prismaClient";
import { validateUser } from "../seller/product";

interface MakeAdminApi extends NextApiRequest{
  body:{
    userId:number,
  }
}

async function handler(req:MakeAdminApi,res:NextApiResponse){

  const user = (await getSession(req,res))?.user;
  if(!user || req.body.userId === null || req.body.userId === undefined){
    res.status(404).json(null);
    return null;
  }

  await myPrismaClient.$connect();
  const userData = await validateUser(user.email,user.sub);
  if(!userData){
    res.status(404).json(null);  
    return null;
  }

  try {
    const update = await myPrismaClient.uSER.update({
      where:{
        userId: req.body.userId
      },
      data:{
        isAdmin: true
      }
    })
    res.status(200).json(update);
    return update;
  } catch (error) {
    
  }
  
  res.status(404).json({});
  return null;
}

type AsyncReturnType<T extends (...arg:any) => Promise<any>> = T extends (...arg:any) =>Promise<infer R> ? R : any;
export type MakeAdminRespond = AsyncReturnType<typeof handler>;

export default withApiAuthRequired(handler);