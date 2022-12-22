import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../styles/Invoice.module.css";

let Items = {
  belongTo: "AAA shop",
  status: "Đã giao",
  itemName: "Giày X",
  price: "100.000",
};

interface InvoiceProps {
  belongTo: string,
  item: {
    name: string,
    price: number
  }[]
}

export default function Invoice(props: InvoiceProps) {
  return (
    <div className={styles["container"]}>
      <form action="">
        <div className={styles["title"]}>
          <div>{props.belongTo}</div>
          <div>{Items.status}</div>
        </div>
        <ul className={styles["content"]}>
          {
            props.item.map((iteminfo) => {
              return (<li>
                <div>{iteminfo.name}{" "}</div>
                <div>{iteminfo.price}</div>
              </li>);
            })
          }

        </ul>
        <button className={styles["reorder"]}>Đặt Lại</button>
      </form>
    </div>
  );
}
