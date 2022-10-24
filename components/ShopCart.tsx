import { useStore } from "@nanostores/react";
import { cartItems } from "./CartStore";

export default function ShopCart() {
  const $cartItems = useStore(cartItems);
  return (
    <div>
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
