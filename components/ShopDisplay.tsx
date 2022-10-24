import React from "react";
import ShopItem from "./ShopItem";
import styles from "../styles/ShopDisplay.module.css";
import ShopCart from "./ShopCart";

class ShopDisplay extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  render(): React.ReactNode {
    const arr = Array<number>(10);
    arr.fill(0);

    return (
      <div className={styles["ShopDisplay"]}>
        {arr.map((item, index) => {
          return <ShopItem name={index.toString()} />;
        })}
        <ShopCart />
      </div>
    );
  }
}

export default ShopDisplay;
