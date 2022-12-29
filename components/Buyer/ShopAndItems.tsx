import styles from "/styles/ShopAndItems.module.css";
import Image from "next/image";
import userImage from "/public/logo-64.png";

import Navbar from "../Navbar";
import Items from "./Items";
import { OrderDetailResult } from "../../pages/api/buyer/order";
import { CartItem } from "../../helper/CartStore";

const shopInfor = {
  name: "MIA.vn Official Store",
  label: "Mall",
  link: "#HOME",
};

interface ShopAndItemsProps {
  data: CartItem
}

export default function ShopAndItems({ data }: ShopAndItemsProps) {
  return (
    <div className={styles["container"]}>
      {/* <Navbar /> */}
      <div className={styles["main"]}>
        <div className={styles["shop"]}>
          <div className={`${styles["check_box"]} ${styles["content"]}`}>
            {/* <input className={styles["checkbox_input"]} type="checkbox" /> */}
            <a className={styles["shop_link"]}>
              {/* <div className={styles["shop_label"]}>{shopInfor.label}</div> */}
              <span className={styles["shop_name"]}>{data.shopId} {data.shopName}</span>
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
