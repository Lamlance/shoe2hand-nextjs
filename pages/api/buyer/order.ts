import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { ORDERDETAIL } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { myPrismaClient } from '../../../helper/prismaClient';

interface OrderNextApiRequest extends NextApiRequest {
  body: {
    userId: number
    shopId: number,
    product: {
      productId: number,
      quantity: number
    }[]
  }
}

const getUser = async (userId: number) => {
  await myPrismaClient.$connect();
  const userData = await myPrismaClient.uSER.findUnique({
    where: {
      userId: userId
    }
  })

  return userData;
}

const getShop =async (shopId: number) => {
  await myPrismaClient.$connect();
  const shopData = await myPrismaClient.sHOP.findUnique({
    where: {
      shopId: shopId
    }
  })

  return shopData;
}

const createOrderDetail = async (orderId: number, proudctId: number, quantity: number, shopId:number) => {
  await myPrismaClient.$connect();

  const product = await myPrismaClient.pRODUCT.findFirst({
    where: {
      AND: [
        { productId: { equals: orderId } },
        { quantity: { gte: quantity } },
        {shopId : {equals: shopId}}
      ]
    }
  })

  if(!product){
    return null;
  }

  try {
    const orderDetail = await myPrismaClient.oRDERDETAIL.create({
      data:{
        productId: product.productId,
        orderId: orderId,
        quantity: quantity
      }
    })
    product.quantity = product.quantity - quantity;
    await myPrismaClient.pRODUCT.update({
      data: product,
      where:{
        productId: product.productId
      }
    })

    return orderDetail;
  } catch (error) {
    return null;
  }
  

}

async function handler(req: OrderNextApiRequest, res: NextApiResponse) {
  const { userId, shopId, product } = req.body;

  if (!shopId || !product || (product.length === 0) || !userId) {
    res.redirect("/user");
    return;
  }

  const userData = await getUser(userId);
  const shoppData = await getShop(shopId);
  if (!userData || !shoppData) {
    res.redirect("/user");
    return;
  }

  const order = await myPrismaClient.oRDER.create({
    data:{
      bill: 0,
      userId: userData.userId,
      shopId: shoppData.shopId
    }
  })

  if(!order){
    res.redirect("/user");
    return;
  }

  const orderDeatilPromise:Promise<ORDERDETAIL | null>[] = [];

  product.forEach((productInfo)=>{
    orderDeatilPromise.push(createOrderDetail(order.orderId,productInfo.productId,productInfo.quantity,shoppData.shopId));
  })

  await Promise.all(orderDeatilPromise);
  res.redirect("/user");
}

export default withApiAuthRequired(handler);