import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
//5 admins
const adminData = [
  {
    adminId: 1,
    adminName: "Fanchette Grief",
  },
  {
    adminId: 2,
    adminName: "Wally Burtenshaw",
  },
  {
    adminId: 3,
    adminName: "Katalin Tennant",
  },
  {
    adminId: 4,
    adminName: "Sherman McSporrin",
  },
  {
    adminId: 5,
    adminName: "Dall Caillou",
  },
];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    const client = new PrismaClient();
    await client.$connect();
    const addData = await client.aDMIN.createMany({
      data: adminData,
      skipDuplicates: true,
    });
    client.$disconnect();
    res.status(200).json({
      addCount: addData.count,
    });
    return;
  }
  res.status(200).json({
    addCount: 0,
    error: "Wrong params",
  });
}
