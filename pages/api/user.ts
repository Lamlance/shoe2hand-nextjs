import { myPrismaClient } from "../../helper/prismaClient";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { email, name, sub:uuid } = req.body;

  if( !(email && uuid ) ){
    const session = await getSession(req, res);
    email = session?.user.email
    name = session?.user.name || session?.user.nickname
    uuid = session?.user.sub
  }
  
  if( !(email && uuid ) ){
    res.status(404).json({
      error: "Request body error"
    })
    return;
  }

  await myPrismaClient.$connect();
  const savedData = await myPrismaClient.uSER.findFirst({
    where: {
      OR: [
        { email: { equals: email } },
        { uuid: { contains: uuid } }
      ]
    }
  })


  if (!savedData) {
    const newUser = await myPrismaClient.uSER.create({
      data: {
        email: email,
        userName: name || "Unknow user",
        uuid: uuid
      }
    })

    res.status(200).json({
      userData: newUser
    });
    return
  } else if ((!savedData.uuid || !savedData.uuid.includes(uuid))) {
    const newUUID = savedData.uuid ? savedData.uuid.concat(` , ${uuid}`) : <string>uuid;
    const updateUser = await myPrismaClient.uSER.update({
      where: {
        userId: savedData.userId
      },
      data: {
        uuid: newUUID
      }
    })
    res.status(200).json({
      userData: updateUser
    });
    return
  }

  res.status(200).json({
    userData: savedData
  });
  
}

export default withApiAuthRequired(handler);