import { myPrismaClient } from '../../helper/prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery, handleQueryArray } from '../../helper/queryHelper'
import { PRODUCT } from '@prisma/client';

// interface QueryObj {
//   skip: number | 0,
//   take: number,
//   where: {
//     brandID?: number,
//     AND: [
//       {price: { lte: number }}?, 
//       {price: { gte: number }}?,
//       {title:{contains:string}}?,
//       {isHidden: boolean}?,
//       {quantity:{gte:number}}?
//     ],
//     OR?:{[index: number]:{brandId:Number}}
//     shopID?: number
//   }
// }

interface ProductRespond {
  shopId: number;
  price: number;
  title: string;
  productId: number;
  description: string | null;
  quantity: number;
  image: string[];
  SHOP: {
    shopName: string;
  };
}

type ProductGetRespond = PRODUCT & {
  SHOP: {
      shopName: string;
  };
}

export type { ProductRespond , ProductGetRespond}

interface BrandObj {
  OR: { brandId: number }[]
}
interface PriceObj {
  AND: [
    { price: { gte: number } }?,
    { price: { lte: number } }?
  ]
}

interface GetProductRequest extends NextApiRequest {
  body: {
    page?: number,
    min?: number,
    max?: number,
    brandId?: number,
    shopId?: number,
    name?: string,
    priceSort?: "asc" | "desc"
  }
}

export default async function handler(req: GetProductRequest,res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      const getProduct = await POST(req);
      res.status(200).json(getProduct);
      return;
    }
    case "GET":{
      const getProduct = await GET(req);
      if(getProduct){
        res.status(200).json(getProduct);
        return;
      }
      res.status(404).json(null)
    }
  }
  res.status(404);
  return;
}

async function POST(req: GetProductRequest) {
  const { page, min, max, brandId, shopId, name, priceSort } = req.body;

  const orderObj = {
    ...((!priceSort) ? {} : ({
      orderBy: [{ price: priceSort }]
    }))
  }

  await myPrismaClient.$connect();
  const data = await myPrismaClient.pRODUCT.findMany({
    take: 10,
    skip: (page && !isNaN(page)) ? (page * 10) : 0,
    ...orderObj,
    where: {
      AND: [
        ((!shopId || isNaN(shopId)) ? {} : { shopId: { equals: shopId } }),
        ((!min || isNaN(min)) ? {} : { price: { gte: min } }),
        ((!max || isNaN(max)) ? {} : { price: { lte: max } }),
        ((!brandId || isNaN(brandId)) ? {} : { brandId: { equals: brandId } }),
        ((!name) ? {} : { title: { contains: name, mode: "insensitive" } })
      ]
    },
    select: {
      productId: true,
      title: true,
      description: true,
      quantity: true,
      price: true,
      image: true,
      shopId: true,
      SHOP: {
        select: {
          shopName: true
        }
      }
    }
  })
  return data;
}

async function GET(req: GetProductRequest) {
  const productId = Number.parseInt(handleQuery(req.query.productId));
  console.log(handleQuery(req.query.productId));
  if(isNaN(productId)){
    return null;
  }
  await myPrismaClient.$connect();
  const product = await myPrismaClient.pRODUCT.findUnique({
    where:{
      productId: productId
    },
    include:{
      SHOP:{
        select:{
          shopName:true
        }
      }
    }
  })
  return product;
}
