import { Decimal } from "@prisma/client/runtime";
import Link from "next/link";
import React, { createRef, useRef } from "react";
import styles from "../../styles/ShopItem.module.css";
import shoes from "/public/test-shoe.png";

import {
  addCartItem,
  ItemDisplayInfo,
  ProductInfo,
} from "../../helper/CartStore";
import Image from "next/image";

// interface ShopItemProps{
//     id:string,
//     name:string,
//     price:Currency<number>;
// }
interface ShopItemData {
  id: number;
  title: string;
  price: Decimal | number | null;
  shopId: number,
  quantity: number
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
      const itemInfo: ProductInfo = {
        title: this.props.title,
        id: this.props.id,
        quantity: 1,
      };
      addCartItem(this.props.shopId, itemInfo);
    }
  }
  render(): React.ReactNode {
    return (
      <div className={styles["s2h_ShopItemWrapper"]}>
        <Link href="/detail">
          <div className={styles["s2h_BreifInfo"]}>
            {/* <img alt={"Product img desc"}></img> */}
            <Image src={shoes} alt="shoe" className={styles["test_shoe"]} />
            <p>{this.props.title}</p>
            <p className={styles["price"]}>
              {
                this.props.price ?
                  `${this.props.price.toLocaleString("en-uk", { style: 'currency', currency: 'VND' })}`
                  : "0"
              }
            </p>
            <p>Remain:{this.props.quantity}</p>
          </div>
        </Link>
        <button
          className={styles["btn_add_to_cart"]}
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
