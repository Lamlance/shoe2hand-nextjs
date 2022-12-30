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
    productId: number;
    orderId: number; //1 review chi ton tai voi dieu kien khi khach hang co dat hang,
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
      orderId: orderId,
      userId: userId,
    },
  });

  return orderData;
};

const createReview = async (
  productId: number,
  userId: number,
  orderId: number,
  rating: number,
  comment: string
) => {
  await myPrismaClient.$connect();
  const orderDetail = await myPrismaClient.oRDERDETAIL.findFirst({
    where: {
      AND: [{ orderId: { equals: orderId }, productId: { equals: productId } }],
    },
  });

  if (!orderDetail) {
    return null;
  }
  try {
    const review = await myPrismaClient.rEVIEW.create({
      data: {
        productId: productId,
        orderId: orderId,
        customerId: userId,
        rating: rating,
        comment: comment,
      },
    });
    return review;
  } catch (error) {
    return null;
  }
};

async function POST(req: RatingNextApiRequest, userId: number) {
  const { productId, orderId, rating, comment } = req.body;
  if (!userId || !productId || !orderId || !rating) {
    return null;
  }

  const productData = await getProduct(productId);
  const orderData = await getOrder(orderId, userId);
  if (!productData || !orderData) {
    return null;
  }

  const review = await createReview(
    productData.productId,
    userId,
    orderData.orderId,
    rating,
    comment ? comment : ""
  );
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
        res.status(404);
        return;
      }
      res.status(200).json(order);
      return;
    }
  }
  res.status(404);
  return;
}

export default withApiAuthRequired(handler);
