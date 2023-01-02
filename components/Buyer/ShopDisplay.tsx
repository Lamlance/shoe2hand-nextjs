import React from "react";
import ShopItem from "./ShopItem";
import styles from "../../styles/ShopDisplay.module.css";
// import ShopCart from "../ShopCart";
import { PRODUCT } from "@prisma/client";

interface ShopDisplayState {
  items: PRODUCT[];
}

class ShopDisplay extends React.Component<{}, ShopDisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items: [],
    };
  }
  render(): React.ReactNode {


    return (
      <ul className={styles["ShopDisplay"]}>
        {
          this.state.items.map((item,index)=>{
            return(<li key={index}>
            <ShopItem id={item.productId} title={item.title} price={null} shopId={item.shopId} quantity={item.quantity}  />
            </li>)
          })
        }
      </ul>
    );
  }
}

export default ShopDisplay;
