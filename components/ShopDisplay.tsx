import React from "react";
import ShopItem from "./ShopItem";
import styles from "../styles/ShopDisplay.module.css";
import ShopCart from "./ShopCart";
import { PRODUCT } from "@prisma/client";

interface ShopDisplayState{
  items: PRODUCT[]
}

class ShopDisplay extends React.Component<{}, ShopDisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      items:[]
    }
  }
  // componentDidMount(): void {
  //     fetch("/api/test/allProducts").then((res)=>{
  //       res.json().then((data)=>{
  //         this.setState({items:data})
  //       })
  //     });  
  // }
  render(): React.ReactNode {
    const arr = Array<number>(20);
    arr.fill(0);

    return (
      <ul className={styles["ShopDisplay"]}>
        {/* {this.state.items ? this.state.items.map((item,index)=>{
          return(<ShopItem 
            name={item.productTitle ? item.productTitle : index.toString()}
            price={item.productPrice}/>)
        }) : "No item"} */}
        {
          arr.map((item,index)=>{
            return(<li key={index}>
            <ShopItem name={`Item ${index}`} price={null} />
            </li>)
          })
        }
      </ul>
    );
  }
}

export default ShopDisplay;
