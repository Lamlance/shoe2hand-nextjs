import { useStore } from "@nanostores/react";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import { isCartOpen } from "../../helper/CartStore";
import Navbar, { NavBarProps } from "../Navbar";
import ShopCart from "../ShopCart";
import Footer from "../Footer";

interface LayoutProps {
  children:any,
  navProps?:NavBarProps
}

export default function ShopLayout({ children,navProps }: LayoutProps) {
  const $isCartOpen = useStore(isCartOpen);
  return (
    <>
      <Navbar submitSearchFunc={navProps?.submitSearchFunc} />
      {$isCartOpen ? <ShopCart /> : null}
      {children}

      <Footer />
    </>
  );
}
