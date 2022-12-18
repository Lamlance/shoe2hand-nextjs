import { useStore } from "@nanostores/react";
import { cartItems } from "../helper/CartStore";
import styles from "../styles/ShopCart.module.css";

export default function ShopCart() {
  const $cartItems = useStore(cartItems);
  return (
    <div className={styles["sideBar"]}>
      {Object.values($cartItems).length ? (
        <ul>
          {Object.values($cartItems).map((item, index) => {
            return (
              <li key={index}>
                #{item.name}: {item.quantity}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Cart is empty!!</p>
      )}
    </div>
  );
}
