import { Decimal } from "@prisma/client/runtime";
import React, { createRef, useRef } from "react";
import styles from "../styles/ShopItem.module.css";
import { addCartItem, ItemDisplayInfo } from "./CartStore";

// interface ShopItemProps{
//     id:string,
//     name:string,
//     price:Currency<number>;
// }
interface ShopItemData {
  name: string;
  price: Decimal | null;
}

class ShopItem extends React.Component<ShopItemData, {}> {
  addCartButton: React.RefObject<HTMLButtonElement>;

  constructor(props: ShopItemData) {
    super(props);
    this.addCartButton = createRef<HTMLButtonElement>();
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }
  addToCartHandler() {
    if (this.addCartButton.current) {
      const itemInfo: ItemDisplayInfo = {
        name: this.props.name,
        id: this.props.name,
        quantity:1
      };
      addCartItem(itemInfo);
    }
  }
  render(): React.ReactNode {
    return (
      <div className={styles["ShopItemWrapper"]}>
        <img alt={"Product img desc"}></img>
        <h3>{this.props.name} {this.props.price ? `${this.props.price}VND` : "Free"}</h3>
        <button
          ref={this.addCartButton}
          onClick={() => {
            this.addToCartHandler();
          }}
        >
          Add to cart
        </button>
      </div>
    );
  }
}
export default ShopItem;
export type { ShopItemData };
