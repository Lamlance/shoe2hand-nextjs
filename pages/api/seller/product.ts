import { myPrismaClient } from '../../../helper/prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery } from '../../../helper/queryHelper'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PRODUCT } from '@prisma/client';
interface SellerProductAPI_PUT {
  data: string | PRODUCT 
}
interface SellerProductAPI_DELETE {
  data: string | PRODUCT 
}
interface SellerProductAPI_POST {
  data: string | PRODUCT 
}
interface SellerProductAPI_GET{
  data: string | PRODUCT[] 
}

export type {SellerProductAPI_PUT,SellerProductAPI_POST,SellerProductAPI_GET,SellerProductAPI_DELETE}

async function validateUser(email:string,uuid:string) {
  await myPrismaClient.$connect();
  const user = await myPrismaClient.uSER.findFirst({
    where:{
      OR:[
        {email: {equals: email}},
        {uuid: {contains: uuid}}
      ]
    },
    select:{
      userId: true
    }
  });
  return user;
}

async function validateShop(shopId:number,userid:number) {
  await myPrismaClient.$connect();
  const shop = await myPrismaClient.sHOP.findFirst({
    where:{
      AND:[
        {ownerId: {equals: userid}},
        {shopId: {equals: shopId}}
      ]
    }
  })
  return shop;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = (await getSession(req,res))?.user;
  const email = user?.email;
  const sub = user?.sub;

  if(!user || !(email && sub) ){
    res.status(401).json({
      data:"Login required"
    })
    return;
  }

  const userValidation = await validateUser(email,sub);
  if(!userValidation ){
    res.status(404).json({
      data:"Cant find user on DB"
    })
    return;
  }

  switch (req.method) {
    case "GET": {
      const getContent = await GET(req,res,userValidation.userId);
      res.status(getContent.status).json({
        data: getContent.content
      })
      break;
    }
    case "POST": {
      const newContent = await POST(req,res,userValidation.userId);
      res.status(newContent.status).json({
        data: newContent.content
      })
      break;
    }
    case "PUT": {
      const updateConent = await PUT(req,res,userValidation.userId);
      res.status(updateConent.status).json({
        data: (typeof updateConent.content === "string") ? updateConent.content : updateConent.content,
      })
      break;
    }
    case "DELETE":{
      const deleteContent = await DELETE(req,res,userValidation.userId);
      res.status(deleteContent.status).json({
        data: (typeof deleteContent.content === "string") ? deleteContent.content : deleteContent.content,
      })
      break;
    }
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse,userId:number) {
  const pageQuery = Number.parseInt(handleQuery(req.query.page));
  const shopId = Number.parseInt(handleQuery(req.query.shopId));
  if(isNaN(shopId)){
    return {
      status: 404,
      content: "Shop id not found"
    };
  }

  const page = isNaN(pageQuery) ? 0 : pageQuery;

  const shop = await validateShop(shopId,userId);
  if(!shop){
    return{
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const product = await myPrismaClient.pRODUCT.findMany({
    take:10,
    skip: 10 * page,
    where:{
      AND:[
        {shopId:{equals: shop.shopId}},
      ]
    }
  })

  return{
    status:200,
    content:product
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse,userId:number) {
  const {shopId:shopQuery,title,quantity,price,hide,desc} = req.body;
  const shopId = Number.parseInt(handleQuery(shopQuery));

  const titleData = handleQuery(title);
  const quantityData = Number.parseInt(handleQuery(quantity));
  const priceData = Number.parseInt(handleQuery(price));
  const descData = handleQuery(desc);
  const hideData = (handleQuery(hide) === "true") ? true : false;

  if(isNaN(shopId)){
    console.log("Shop id not found")
    return{
      status: 404,
      content: "Shop id not found"
    }
  }

  const shop = await validateShop(shopId,userId);
  if(!shop){
    console.log("Shop not found")
    return{
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const newProduct = await myPrismaClient.pRODUCT.create({
    data:{
      title: titleData,
      quantity: isNaN(quantityData) ? 0 : quantityData,
      price: priceData,
      description: descData,
      shopId: shopId,
      isHidden: hideData
    }
  })

  return{
    status:200,
    content: newProduct
  }
}

async function PUT(req: NextApiRequest, res: NextApiResponse,userId:number) {
  const {shopId:shopQuery,title,quantity,price,hide,desc,productId} = req.body;
  const shopId = Number.parseInt(handleQuery(shopQuery));

  const titleData = handleQuery(title);
  const quantityData = Number.parseInt(handleQuery(quantity));
  const priceData = Number.parseInt(handleQuery(price));
  const descData = handleQuery(desc);
  const hideData = (handleQuery(hide) === "true") ? true : false;
  const productIdData = Number.parseInt(handleQuery(productId));

  if(isNaN(shopId) || isNaN(productIdData)){
    // console.log("Shop body not found",shopQuery,selectId,productId)
    return{
      status: 404,
      content: "Shop body not found"
    }
  }

  const shop = await validateShop(shopId,userId);
  if(!shop){
    console.log("Shop not found")
    return{
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const updateProduct = await myPrismaClient.pRODUCT.update({
    where:{
      productId: productIdData,
    },
    data:{
      title: titleData,
      quantity: quantityData,
      price: priceData,
      description: descData,
      isHidden:hideData
    }
  })
  return {
    status: 200,
    content: updateProduct
  }
}

async function DELETE(req: NextApiRequest, res: NextApiResponse,userId:number) {
  const {shopId:shopQuery,productId,selectId} = req.body;

  const shopId = Number.parseInt(handleQuery(shopQuery));
  const productIdData = Number.parseInt(handleQuery(productId));

  if( isNaN(shopId) || isNaN(productIdData) ){
    return{
      status: 404,
      content: "Body not found"
    }
  }

  const shop = await validateShop(shopId,userId);
  if(!shop){
    console.log("Shop not found")
    return{
      status: 404,
      content: "Shop not found"
    }
  }

  await myPrismaClient.$connect();
  const deleted = await myPrismaClient.pRODUCT.delete({
    where:{
      productId: productIdData,
    }
  });

  return {
    status: 200,
    content: deleted
  }
}

export default withApiAuthRequired(handler);