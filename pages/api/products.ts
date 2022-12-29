import { myPrismaClient } from '../../helper/prismaClient'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery, handleQueryArray } from '../../helper/queryHelper'

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
  productId: number,
  price: number,
  title: string,
  shopId: number
}
export type { ProductRespond }

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

export default async function handler(
  req: GetProductRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      const getProduct = GET(req);
      res.status(200).json(getProduct);
      return;
    }
    case "POST": {
      const getProduct = await POST(req);
      res.status(200).json(getProduct);
      return;
    }
  }
  // res.status(200).json(products);
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
    shopId: true
  }
})
return data;
}



function handleBrand(brandQuery: string[]) {
  const brandIdList = handleQueryArray(brandQuery);
  const queryObj: BrandObj = {
    OR: []
  };

  brandIdList.forEach((brand, index) => {
    if (typeof brand === "number") {
      queryObj.OR.push({ brandId: brand });
      return;
    }

    const brandIdNumber = Number.parseInt(brand);
    if (!isNaN(brandIdNumber)) {
      queryObj.OR.push({ brandId: brandIdNumber });

    }
  })

  return queryObj;
}

function handleMinMaxPrice(minQuery: string, maxQuery: string) {
  const minPrice = Number.parseInt(minQuery);
  const maxPrice = Number.parseInt(maxQuery);

  const priceObj: PriceObj = {
    AND: [
    ]
  }

  if (!isNaN(minPrice)) {
    priceObj.AND.push({ price: { gte: minPrice } })
  }
  if (!isNaN(maxPrice)) {
    priceObj.AND.push({ price: { lte: maxPrice } })
  }

  return priceObj;
}

function handleName(name: string) {
  if (name) {
    return {
      AND: [{ title: { contains: name } }]
    }
  }
  return null;
}

async function GET(req: NextApiRequest) {
  const itemPerPage = 10;
  await myPrismaClient.$connect();


  const param = req.query;
  const { brand, min, max, name } = param;

  let queryObj = {
    take: itemPerPage,
    skip: 0,
  }

  const pageNumber = Number.parseInt(handleQuery(param.page))
  if (!isNaN(pageNumber)) {
    queryObj.skip = pageNumber * itemPerPage
  }

  const brandObj = handleBrand(handleQueryArray(brand));
  const priceObj = handleMinMaxPrice(handleQuery(min), handleQuery(max));
  const nameObj = handleName(handleQuery(name));



  // const ans = await myPrismaClient.pRODUCT.findMany({
  //   where: {

  //   }
  // });

  const ans = {
    take: itemPerPage,
    skip: 0,
    ...brandObj,
    ...priceObj,
    ...nameObj
  }

  if (ans.AND.length == 0 && ans.OR.length == 0) {
    const products = await myPrismaClient.pRODUCT.findMany({
      take: itemPerPage,
      skip: 0,
      where: {
        quantity: { gt: 0 }
      }
    });
    // res.status(200).json(products);
    return products;
  }

  if (ans.AND.length != 0 && ans.OR.length == 0) {
    console.log({
      ...(nameObj ? nameObj : {}),
      ...(priceObj.AND[0] ? priceObj.AND[0] : {}),
      ...(priceObj.AND[1] ? priceObj.AND[1] : {})
    })
    const products = await myPrismaClient.pRODUCT.findMany({
      take: itemPerPage,
      skip: 0,
      where: {
        AND: [
          (priceObj.AND[0] ? priceObj.AND[0] : {}),
          (priceObj.AND[1] ? priceObj.AND[1] : {}),
          { quantity: { gt: 0 } }
        ],
        ...(nameObj ? nameObj : {}),

      }
    });

    // res.status(200).json(products);
    return products;
  }

  if (ans.AND.length == 0 && ans.OR.length != 0) {
    const products = await myPrismaClient.pRODUCT.findMany({
      take: itemPerPage,
      skip: 0,
      where: {
        AND: [{ quantity: { gt: 0 } }],
        ...brandObj
      }
    });
    // res.status(200).json(products);

    return products;
  }

  const products = await myPrismaClient.pRODUCT.findMany({
    take: itemPerPage,
    skip: 0,
    include: {
      SHOP: {
        select: {
          shopName: true
        }
      }
    },
    where: {
      ...brandObj,
      AND: [
        (priceObj.AND[0] ? priceObj.AND[0] : {}),
        (priceObj.AND[1] ? priceObj.AND[1] : {}),
        { quantity: { gt: 0 } }
      ],
      ...(nameObj ? nameObj : {}),
    }
  });

  return products;
}