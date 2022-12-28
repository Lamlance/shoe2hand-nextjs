import { useStore } from "@nanostores/react";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import { isCartOpen } from "../../helper/CartStore";
import Navbar from "../Navbar";
import ShopCart from "../ShopCart";
import Footer from "../Footer";

export default function ShopLayout({ children }: any) {
  const $isCartOpen = useStore(isCartOpen);
  return (
    <>
      <Navbar />
      {$isCartOpen ? <ShopCart /> : null}
      {children}

      <Footer />
    </>
  );
}
