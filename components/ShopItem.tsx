import { Decimal } from "@prisma/client/runtime";
import Link from "next/link";
import React, { createRef, useRef } from "react";
import styles from "../styles/ShopItem.module.css";
import { addCartItem, ItemDisplayInfo, ProductInfo } from "../helper/CartStore";

// interface ShopItemProps{
//     id:string,
//     name:string,
//     price:Currency<number>;
// }
interface ShopItemData {
  id: number;
  title:string;
  price: Decimal | null;
  shopId:number,
  quantity:number
}

class ShopItem extends React.Component<ShopItemData,{}> {
  addCartButton: React.RefObject<HTMLButtonElement>;

  constructor(props:ShopItemData) {
    super(props);
    this.addCartButton = createRef<HTMLButtonElement>();
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  addToCartHandler() {
    if (this.addCartButton.current) {
      const itemInfo: ProductInfo = {
        title: this.props.title,
        id: this.props.id,
        quantity: 1,
      };
      addCartItem(this.props.shopId,itemInfo);
    }
  }
  render(): React.ReactNode {
    return (
      <div className={styles["s2h_ShopItemWrapper"]}>
        <Link href="/detail">
          <div className={styles["s2h_BreifInfo"]}>
            <img alt={"Product img desc"}></img>
            <p>{this.props.title}</p>
            <p>{this.props.price ? `${this.props.price}VND` : "Free"}</p>
            <p>Remain:{this.props.quantity}</p>
          </div>
        </Link >
        <button
          ref={this.addCartButton}
          onClick={() => {
            this.addToCartHandler();
          }}>Add to cart
        </button>
      </div>
    );
  }
}
export default ShopItem;
export type { ShopItemData };
