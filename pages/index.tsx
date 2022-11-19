import ShopDisplay from "../components/ShopDisplay";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import ShopLayout from "../components/layouts/ShopLayout";
import ShopCart from "../components/ShopCart";
import { isCartOpen } from "../components/CartStore";
import { useStore } from "@nanostores/react";

function Home() {
  const $isCartOpen = useStore(isCartOpen);

  return (
    <ShopLayout>
      <ShopDisplay />
      {$isCartOpen ? (<ShopCart />) : null}
    </ShopLayout>
  );
}
//LÂM chỉnh sửa :))
//LÂM sửa lần 2
export default Home;
