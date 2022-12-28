import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../../styles/Invoice.module.css";
import { OrderDetailResult } from "../../pages/api/buyer/order";

// let Items = {
//   belongTo: "AAA shop",
//   status: "Đã giao",
//   itemName: "Giày X",
//   price: "100.000",
// };

interface InvoiceProps {
  belongTo: string;
  item: {
    name: string;
    price: number;
  }[];
}

export default function Order(props: OrderDetailResult) {
  return (
    <div className={styles["container"]}>
      <form action="">
        <div className={styles["title"]}>
          <div>{props.SHOP.shopName}</div>
          <div>{props.deliveringStatus}</div>
        </div>
        <ul className={styles["content"]}>
          {props.ORDERDETAIL.map((iteminfo, index) => {
            return (
              <li key={index}>
                <div>{`${iteminfo.PRODUCT.title} x${iteminfo.quantity}`}</div>
              </li>
            );
          })}
        </ul>
        <button className={styles["reorder"]}>Đặt Lại</button>
      </form>
    </div>
  );
}
