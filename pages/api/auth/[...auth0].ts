import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { atom } from "nanostores";
import { PrismaClient } from '@prisma/client';


// interface userData {
//   userId:number,
//   shopId?:number
// }
// export const userInfo_inDB = atom<userData | null>(null);


const afterCallback = (
  req: NextApiRequest, res: NextApiResponse, session: any, state?: {}) => {

  console.log(session.user.email);
  const client = new PrismaClient();
  console.log("Connect to db");

  client.$connect();

  console.log("Connected to db");

  let savedUser = client.uSER.findFirst({
    where: {
      email: session.user.email
    },
    select: {
      userId: true
    }
  })

  if (!savedUser) {
    savedUser = client.uSER.create({
      data: {
        email: session.user.email,
        userName: session.user.nickname || session.user.name
      }
    })
  }

  console.log(savedUser)

  return session;
}


export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
      res.status(500).end();
    }
  }
});