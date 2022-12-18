import ShopDisplay from "../components/ShopDisplay";
import Navbar from "../components/Navbar";
import styles from "../styles/ShopDisplay.module.css";

import ShopItem from "../components/ShopItem";
import ShopLayout from "../components/layouts/ShopLayout";
import ShopCart from "../components/ShopCart";

import { isCartOpen } from "../helper/CartStore";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { ProductRespond } from "./api/products";

function Home() {
  const $isCartOpen = useStore(isCartOpen);
  const [products,setProducts] = useState<ProductRespond[]>([]);


  const fetchProduct = async () => {
    const rawResponse = await fetch(`/api/products`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    
    const json = await rawResponse.json();
    console.log(json);
    return json;
  }

  useEffect(() => {
    const productFetch = fetchProduct();
    productFetch.then((data)=>{
      setProducts(data);
    })

  },[])



  return (
    <ShopLayout>
      <ul className={styles["ShopDisplay"]}>
        {
          products.map((item,index)=>{
            return(<li key={index}>
              <ShopItem name={`${item.title}`} price={item.price} />
            </li>)
          })
        }
      </ul>
      {$isCartOpen ? (<ShopCart />) : null}
    </ShopLayout>
  );
}
//LÂM chỉnh sửa :))
//LÂM sửa lần 2
export default Home;
