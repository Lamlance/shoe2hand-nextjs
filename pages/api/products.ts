import { myPrismaClient } from '../_app';

import type { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery, handleQueryArray } from '../../helper/queryHelper'

interface QueryObj {
  skip: number | 0,
  take: number,
  where: {
    brandID?: number,
    AND: [
      {price: { lte: number }}?, 
      {price: { gte: number }}?,
      {title:{contains:string}}?,
      {isHidden: boolean}?,
      {quantity:{gte:number}}?
    ],
    OR?:{[index: number]:{brandId:Number}}
    shopID?: number
  }
}

interface ProductRespond {
  productId:number,
  price:number,
  title:string,
}
export type {ProductRespond}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductRespond[]>
) {
  const itemPerPage = 10;
  await myPrismaClient.$connect();


  const param = (req.method == "GET") ? req.query : req.body;
  const { brand,min,max,name } = param;

  const queryObj:QueryObj = {
    take:itemPerPage,
    skip:0,
    where: {
      AND:[{isHidden:false},{quantity:{gte:1}}]
    }
  }
  
  const pageNumber = Number.parseInt(handleQuery(param.page))
  if(!isNaN(pageNumber)){
    queryObj.skip = pageNumber*itemPerPage
  }
  handleBrand(handleQueryArray(brand),queryObj);
  handleMinMaxPrice(handleQuery(min),handleQuery(max),queryObj);
  handleName(handleQuery(name),queryObj);
  const ans = await myPrismaClient.pRODUCT.findMany({
    ...queryObj,
    select:{
      price:true,
      quantity:true,
      productId:true,
      title:true  
    }
  });

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
      queryObj.where.OR[index] = {brandId:brandId}      
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
    queryObj.where.AND.push({price: { gte: minPrice }})
  }
  if(!isNaN(maxPrice)){
    queryObj.where.AND.push({price: { lte: maxPrice }})
  }

  return queryObj;
}

function handleName(name:string,queryObj:QueryObj){
  if(!queryObj.where.AND){
    queryObj.where.AND = []
  };
  queryObj.where.AND.push({title:{contains:name}});
}

function GET(){
  
}