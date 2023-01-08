import styles from "/styles/ShopAndItems.module.css";
import Image from "next/image";
import userImage from "/public/logo-64.png";

import Navbar from "../Navbar";
import Items from "./Items";
import { OrderDetailResult } from "../../pages/api/buyer/order";
import { CartItem, deleteCartItemByShopId, ProductInfo } from "../../helper/CartStore";
import { useStore } from "@nanostores/react";
import { userInfo_inDB } from "../../helper/userInfo_inDB";
import { toast } from "react-toastify";

const shopInfor = {
  name: "MIA.vn Official Store",
  label: "Mall",
  link: "#HOME",
};

interface ShopAndItemsProps {
  data: CartItem
}

export default function ShopAndItems({ data }: ShopAndItemsProps) {
  const $userInfo_inDB = useStore(userInfo_inDB);

  const handleMakeProduct = async (infos:ProductInfo[])=>{
    toast.info("Placing your order");
    const fetchData = await fetch("/api/buyer/order",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        userId: $userInfo_inDB?.user.userId,
        shopId: data.shopId,
        product: infos
      })
    })
    try {
      const order = await fetchData.json();
      if(order){
        toast.success("Place order success, you can see it in your Invoice tab")
      }
      console.log(order);
      deleteCartItemByShopId(data.shopId);
      return;
    } catch (error) {console.log(error)}
    toast.error("Place order failed");
  }

  return (
    <div className={styles["container"]}>
      {/* <Navbar /> */}
      <div className={styles["main"]}>
        <div className={styles["shop"]}>
          <div className={`${styles["check_box"]} ${styles["content"]}`}>
            <a className={styles["shop_link"]}>
              <span className={styles["shop_name"]}>{data.shopId} {data.shopName}</span>
              <button onClick={()=>{handleMakeProduct(data.products)}}>Place Order</button>
            </a>
          </div>
        </div>
        <ul style={{listStyleType:"none"}}>
          {
            data.products.map((item,id)=>{
              return(<li>
                <Items shopId={data.shopId}  info={{
                  id: item.id,
                  title: item.title,
                  quantity: item.quantity,
                  price: item.price
                }} />
              </li>)
            })
          }
        </ul>

      </div>
    </div>
  );
}
