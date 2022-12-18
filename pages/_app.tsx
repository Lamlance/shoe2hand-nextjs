import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
//Lam edit
export default MyApp
export {client as myPrismaClient}