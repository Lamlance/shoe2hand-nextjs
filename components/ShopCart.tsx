import { useStore } from "@nanostores/react";
import Link from "next/link";
import { cartItems } from "../helper/CartStore";
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
            return (<li>
              <p>{`Shop ID: ${shop.shopId} - ${shop.shopName}`}</p>
              <ul>
                {
                  shop.products.map((pInfo) => {
                    return (<li>{`ID:${pInfo.id} - ${pInfo.title}: ${pInfo.quantity}`}</li>)
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
