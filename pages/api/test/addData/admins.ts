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
