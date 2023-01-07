import ShopDisplay from "../components/Buyer/ShopDisplay";
import Navbar from "../components/Navbar";
import styles from "/styles/ShopDisplay.module.css";

import ShopItem from "../components/Buyer/ShopItem";
import ShopLayout from "../components/layouts/ShopLayout";
import ShopCart from "../components/ShopCart";

import { isCartOpen } from "../helper/CartStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { PRODUCT } from "@prisma/client";
import { ProductRespond } from "./api/products";

function Home() {
  const $isCartOpen = useStore(isCartOpen);
  const [products, setProducts] = useState<ProductRespond[]>([]);

  const fetchProduct = async () => {
    const rawResponse = await fetch(`/api/products`, {
      method: "POST",
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
                price={item.price}
                shopId={item.shopId}
                quantity={item.quantity}
                shopName={item.SHOP.shopName}
              />
            </li>
          );
        })}
      </ul>
    </ShopLayout>
  );
}
export default Home;
