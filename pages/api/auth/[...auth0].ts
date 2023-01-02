import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { atom } from "nanostores";
import { myPrismaClient } from '../../../helper/prismaClient';

import { userInfo_inDB } from '../../../helper/userInfo_inDB';
import { useStore } from '@nanostores/react';


const afterCallback = (
  req: NextApiRequest, res: NextApiResponse, session: any, state?: {}) => {
  if (!session.user || !session) {
    return session;
  }
  myPrismaClient.$connect().then(() => {
    const savedUser = myPrismaClient.uSER.findFirst({
      where: {
        OR: [
          { email: { equals: session.user.email } },
          { uuid: { contains: session.user.sub } }
        ]
      },
      select: {
        userId: true,
        uuid: true
      }
    })
    savedUser.then((savedData) => {
      if (!savedData || savedData == null) {
        const newUser = myPrismaClient.uSER.create({
          data: {
            email: session.user.email,
            userName: session.user.nickname || session.user.name,
            uuid: session.user.sub
          },
          select: {
            userId: true
          }
        })
      } else if (session.user.sub && (!savedData.uuid || !savedData.uuid.includes(session.user.sub))) {
        const newUUID = savedData.uuid ? savedData.uuid.concat(` , ${session.user.sub}`) : <string>session.user.sub;
        const updateUser = myPrismaClient.uSER.update({
          where: {
            userId: savedData.userId
          },
          data: {
            uuid: newUUID
          }
        })
      }
    })
  });

  return session;
}


export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (err) {
      // console.error("Status:", "-", err);
      res
        .redirect(
          `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?${new URLSearchParams(
            {
              client_id: process.env.AUTH0_CLIENT_ID as string,
              returnTo: process.env.AUTH0_BASE_URL as string,
            }
          )}`
        )
        .end();
    }
  }
});