import ShopDisplay from "../components/ShopDisplay";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import ShopLayout from "../components/layouts/ShopLayout";
import ShopCart from "../components/ShopCart";
import { isCartOpen } from "../components/CartStore";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const $isCartOpen = useStore(isCartOpen);

  const fatchProduct = async () => {
    const rawResponse = await fetch("/api/products", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        brand: [1, 2],
        min:12000,
        max:1000000
      })
    })
    
    const json = await rawResponse.json();
    console.log(json);
  }

  useEffect(() => {
    fatchProduct();
  },[])

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
