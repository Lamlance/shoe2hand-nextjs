import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import Navbar from "../Navbar";


export default function ShopLayout({ children }:any){
  return(<>
  <Navbar />
  <hr />
  {children}
  </>)
}