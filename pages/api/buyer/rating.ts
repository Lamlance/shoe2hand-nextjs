import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { REVIEW, USER } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductInfo } from "../../../helper/CartStore";
import { myPrismaClient } from "../../../helper/prismaClient";
import { handleQuery } from "../../../helper/queryHelper";
import { validateUser } from "../seller/product";
import user from "../user";

interface RatingNextApiRequest extends NextApiRequest {
  body: {
    orderId: number;
    detailId:number;
    rating: number;
    comment?: string;
  };
}

const getProduct = async (productId: number) => {
  await myPrismaClient.$connect();
  const productData = await myPrismaClient.pRODUCT.findUnique({
    where: {
      productId: productId,
    },
  });

  return productData;
};

const getOrder = async (orderId: number, userId: number) => {
  await myPrismaClient.$connect();
  const orderData = await myPrismaClient.oRDER.findFirst({
    where: {
      AND:[
        {orderId: {equals: orderId}},
        {userId: userId}
      ]
    },
  });

  return orderData;
};

const createReview = async (orderId:number,detailId:number,userId:number,rating: number,comment: string | null) => {
  await myPrismaClient.$connect();
  const orderDetail = await myPrismaClient.oRDERDETAIL.findFirst({
    where: {
      AND: [{ orderId: { equals: orderId }, orderdetailId:{equals: detailId} }],
    },
  });

  if (!orderDetail) {
    return null;
  }

  try {
    const review = await myPrismaClient.rEVIEW.create({
      data: {
        productId: orderDetail.productId,
        customerId: userId,
        rating: rating,
        comment: comment,
        detailId: detailId
      },
    });
    return review;
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function POST(req: RatingNextApiRequest, userId: number) {
  const { orderId, rating, comment,detailId } = req.body;
  if (!userId || !orderId || !rating) {
    return null;
  }

  const orderData = await getOrder(orderId, userId);
  if (!orderData) {
    return null;
  }
  const review = await createReview(orderData.orderId,detailId,userId,rating,comment ? comment : null);
  return review;
}

async function handler(req: RatingNextApiRequest, res: NextApiResponse) {
  const user = (await getSession(req, res))?.user;
  if (!user) {
    res.status(403);
    return;
  }
  const userData = await validateUser(user.email, user.sub);
  if (!userData) {
    res.status(403);
    return;
  }

  switch (req.method) {
    case "POST": {
      const order = await POST(req, userData.userId);
      if (!order) {
        res.status(404).json(null);
        return;
      }
      res.status(200).json(order);
      return;
    }
  }
  res.status(404).json(null);
  return;
}

export default withApiAuthRequired(handler);
