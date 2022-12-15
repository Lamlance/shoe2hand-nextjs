import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
//10 reviews
const reviewData = [
  {
    reviewId: 1,
    productId: 18,
    customerId: 22,
    date: "5/11/2022",
    rating: 2.8,
    comment: "<script>alert('hi')</script>",
  },
  {
    reviewId: 2,
    productId: 13,
    customerId: 42,
    date: "1/5/2022",
    rating: 2.2,
    comment: "和製漢語",
  },
  {
    reviewId: 3,
    productId: 3,
    customerId: 27,
    date: "6/29/2022",
    rating: 0.6,
    comment: "0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟",
  },
  {
    reviewId: 4,
    productId: 18,
    customerId: 11,
    date: "4/2/2022",
    rating: 1.5,
    comment: "1.00",
  },
  {
    reviewId: 5,
    productId: 12,
    customerId: 15,
    date: "4/11/2022",
    rating: 3.1,
    comment: "(｡◕ ∀ ◕｡)",
  },
  {
    reviewId: 6,
    productId: 1,
    customerId: 46,
    date: "3/19/2022",
    rating: 0.6,
    comment: "Ω≈ç√∫˜µ≤≥÷",
  },
  {
    reviewId: 7,
    productId: 19,
    customerId: 29,
    date: "7/18/2022",
    rating: 3.2,
    comment: "̦H̬̤̗̤͝e͜ ̜̥̝̻͍̟́w̕h̖̯͓o̝͙̖͎̱̮ ҉̺̙̞̟͈W̷̼̭a̺̪͍į͈͕̭͙̯̜t̶̼̮s̘͙͖̕ ̠̫̠B̻͍͙͉̳ͅe̵h̵̬͇̫͙i̹͓̳̳̮͎̫̕n͟d̴̪̜̖ ̰͉̩͇͙̲͞ͅT͖̼͓̪͢h͏͓̮̻e̬̝̟ͅ ̤̹̝W͙̞̝͔͇͝ͅa͏͓͔̹̼̣l̴͔̰̤̟͔ḽ̫.͕",
  },
  {
    reviewId: 8,
    productId: 4,
    customerId: 32,
    date: "8/29/2022",
    rating: 0.1,
    comment: "$1.00",
  },
  {
    reviewId: 9,
    productId: 16,
    customerId: 32,
    date: "2/6/2022",
    rating: 2.1,
    comment: "𠜎𠜱𠝹𠱓𠱸𠲖𠳏",
  },
  {
    reviewId: 10,
    productId: 8,
    customerId: 26,
    date: "3/9/2022",
    rating: 1.1,
    comment: "NULL",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.password && req.query.password === "lam123") {
    const client = new PrismaClient();
    await client.$connect();
    const addData = await client.rEVIEW.createMany({
      data: reviewData,
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
