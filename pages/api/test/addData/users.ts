import { prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const userData = [
  { "userId": 0, "userName": "LamSiuKool", "email": "SiuNgau@bruh.com", "address": "9th Lunar Base", "phone": "420-420-6969" },
  { "userId": 1, "userName": "htrowsdall0", "email": "kmerry0@cbc.ca", "address": "9 Golf Course Pass", "phone": "246-859-6772" },
  { "userId": 2, "userName": "trugge1", "email": "htorre1@lulu.com", "address": null, "phone": null },
  { "userId": 3, "userName": "bantushev2", "email": "cantham2@timesonline.co.uk", "address": "57 Independence Way", "phone": "129-528-6707" },
  { "userId": 4, "userName": "afumagallo3", "email": "dpenketh3@xrea.com", "address": "10591 Dexter Point", "phone": "521-188-0693" },
  { "userId": 5, "userName": "fgiottini4", "email": "lizatson4@exblog.jp", "address": "8720 Hollow Ridge Center", "phone": "281-415-1843" },
  { "userId": 6, "userName": "celse5", "email": "rglasheen5@blogs.com", "address": "6 Dovetail Pass", "phone": "281-136-6684" },
  { "userId": 7, "userName": "mziemsen6", "email": "dpaik6@desdev.cn", "address": "6 Kinsman Junction", "phone": "503-943-6734" },
  { "userId": 8, "userName": "bfeore7", "email": "sheddy7@dmoz.org", "address": "42 Meadow Ridge Circle", "phone": "789-260-5146" },
  { "userId": 9, "userName": "mpanther8", "email": "lgare8@jiathis.com", "address": "30648 Canary Street", "phone": "393-526-5935" },
  { "userId": 10, "userName": "tager9", "email": "rshord9@imgur.com", "address": "3 Old Gate Center", "phone": "632-515-0488" }
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123"){
    const client = new PrismaClient();
    await client.$connect();
    const addData = await client.uSER.createMany({
      data:userData,
      skipDuplicates:true
    });
    client.$disconnect();
    res.status(200).json({
      addCount: addData.count
    })
    return;
  }
  res.status(200).json({
    addCount: 0,
    error:"Wrong params"
  })
}