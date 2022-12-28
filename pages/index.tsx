import ShopDisplay from "../components/ShopDisplay";
import Navbar from "../components/Navbar";
import styles from "/styles/ShopDisplay.module.css";

import ShopItem from "../components/Buyer/ShopItem";
import ShopLayout from "../components/layouts/ShopLayout";
import ShopCart from "../components/ShopCart";

import { isCartOpen } from "../helper/CartStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { PRODUCT } from "@prisma/client";

function Home() {
  const $isCartOpen = useStore(isCartOpen);
  const [products, setProducts] = useState<PRODUCT[]>([]);

  const fetchProduct = async () => {
    const rawResponse = await fetch(`/api/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const json = await rawResponse.json();
    console.log(json);
    return json;
  };

  useEffect(() => {
    const productFetch = fetchProduct();
    productFetch.then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <ShopLayout>
      <ul className={styles["ShopDisplay"]}>
        {products.map((item, index) => {
          return (
            <li key={index}>
              <ShopItem
                id={item.productId}
                title={item.title}
                price={null}
                shopId={item.shopId}
                quantity={item.quantity}
              />
            </li>
          );
        })}
      </ul>
    </ShopLayout>
  );
}
//LÂM chỉnh sửa :))
//LÂM sửa lần 2
export default Home;
