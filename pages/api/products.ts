import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery, handleQueryArray } from '../../helper/queryHelper'

interface QueryObj {
  skip: number | 0,
  take: number,
  where: {
    brandID?: number,
    AND?: [
      {productPrice: { lte: number }}?, 
      {productPrice: { gte: number }}?,
      {title:{include:string}}?
    ],
    OR?:{[index: number]:{brandID:Number}}
    shopID?: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemPerPage = 3;
  const prisma = new PrismaClient();
  await prisma.$connect();


  const param = (req.method == "GET") ? req.query : req.body;
  const { brand,min,max,name } = param;

  const queryObj:QueryObj = {
    take:itemPerPage,
    skip:0,
    where: {}
  }
  
  const pageNumber = Number.parseInt(handleQuery(param.page))
  if(!isNaN(pageNumber)){
    queryObj.skip = pageNumber*itemPerPage
  }
  handleBrand(handleQueryArray(brand),queryObj);
  handleMinMaxPrice(handleQuery(min),handleQuery(max),queryObj);
  handleName(handleQuery(name),queryObj);
  const ans = await prisma.pRODUCT.findMany(queryObj);

  res.status(200).json(ans)
}



function handleBrand(brandQuery: string[] , queryObj: QueryObj) {
  const brandIdList = handleQueryArray(brandQuery);
  brandIdList.forEach((brand,index)=>{
    const brandId = Number.parseInt(brand);
    if(!isNaN(brandId)){
      if(!queryObj.where.OR){
        queryObj.where.OR = []
      }
      queryObj.where.OR[index] = {brandID:brandId}      
    }
  })
  return queryObj;
}

function handleMinMaxPrice(minQuery: string,maxQuery:string, queryObj: QueryObj){
  const minPrice = Number.parseInt(minQuery);
  const maxPrice = Number.parseInt(maxQuery);
  if(!queryObj.where.AND){
    queryObj.where.AND = []
  };

  if(!isNaN(minPrice)){
    queryObj.where.AND.push({productPrice: { gte: minPrice }})
  }
  if(!isNaN(maxPrice)){
    queryObj.where.AND.push({productPrice: { lte: maxPrice }})
  }

  return queryObj;
}

function handleName(name:string,queryObj:QueryObj){
  if(!queryObj.where.AND){
    queryObj.where.AND = []
  };
  queryObj.where.AND.push({title:{include:name}});
}

function GET(){
  
}