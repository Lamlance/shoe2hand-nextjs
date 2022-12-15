import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
//20 shopes
const shopData: {
  shopId: number;
  shopName: string;
  isHidden: boolean;
  ownerId: number;
}[] = [
  {
    shopId: 1,
    shopName: "Tambee",
    isHidden: false,
    ownerId: 4,
  },
  {
    shopId: 2,
    shopName: "Kayveo",
    isHidden: true,
    ownerId: 40,
  },
  {
    shopId: 3,
    shopName: "Mynte",
    isHidden: true,
    ownerId: 10,
  },
  {
    shopId: 4,
    shopName: "Skilith",
    isHidden: false,
    ownerId: 43,
  },
  {
    shopId: 5,
    shopName: "Twinder",
    isHidden: true,
    ownerId: 37,
  },
  {
    shopId: 6,
    shopName: "Chatterpoint",
    isHidden: false,
    ownerId: 16,
  },
  {
    shopId: 7,
    shopName: "Meedoo",
    isHidden: true,
    ownerId: 12,
  },
  {
    shopId: 8,
    shopName: "Jaxbean",
    isHidden: true,
    ownerId: 43,
  },
  {
    shopId: 9,
    shopName: "Quamba",
    isHidden: true,
    ownerId: 19,
  },
  {
    shopId: 10,
    shopName: "Viva",
    isHidden: false,
    ownerId: 29,
  },
  {
    shopId: 11,
    shopName: "Thoughtsphere",
    isHidden: false,
    ownerId: 7,
  },
  {
    shopId: 12,
    shopName: "Quinu",
    isHidden: true,
    ownerId: 37,
  },
  {
    shopId: 13,
    shopName: "Mycat",
    isHidden: true,
    ownerId: 40,
  },
  {
    shopId: 14,
    shopName: "Katz",
    isHidden: false,
    ownerId: 8,
  },
  {
    shopId: 15,
    shopName: "Gabspot",
    isHidden: false,
    ownerId: 49,
  },
  {
    shopId: 16,
    shopName: "Wordware",
    isHidden: true,
    ownerId: 44,
  },
  {
    shopId: 17,
    shopName: "Yodoo",
    isHidden: false,
    ownerId: 18,
  },
  {
    shopId: 18,
    shopName: "Tagchat",
    isHidden: true,
    ownerId: 40,
  },
  {
    shopId: 19,
    shopName: "Skinte",
    isHidden: false,
    ownerId: 48,
  },
  {
    shopId: 20,
    shopName: "Pixoboo",
    isHidden: false,
    ownerId: 23,
  },
];
