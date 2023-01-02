import { useStore } from "@nanostores/react";
import Link from "next/link";
import { cartItems, deleteProduct } from "../helper/CartStore";
import styles from "../styles/ShopCart.module.css";

export default function ShopCart() {
  const $cartItems = useStore(cartItems);

  if (Object.values($cartItems).length === 0) {
    return (<div className={styles["sideBar"]}>
      <p>Cart is empty!!</p>
    </div>
    )
  }

  return (
    <div className={styles["sideBar"]}>
      <ul>
        <li>
          <Link href={"/buyer"} >
            Go To Buyer
          </Link>
        </li>
        {
          Object.values($cartItems).map((shop, index) => {
            return (<li className={styles["s2h_shopList"]}>
              <p>{`Shop : ${shop.shopName}`}</p>
              <ul >
                <li>
                  <span>Tên sản phẩm</span>
                  <span>Số lượng</span>
                  <span>Xóa</span>
                </li>
                {
                  shop.products.map((pInfo) => {
                    return (<li>
                      <span>{`${pInfo.title}`}</span>
                      <span>{pInfo.quantity}</span>
                      <span onClick={()=>{deleteProduct(shop.shopId,pInfo.id)}}>{"❌"}</span>
                    </li>)
                  })
                }
              </ul>
            </li>)
          })
        }
      </ul>
    </div>
  );
}
