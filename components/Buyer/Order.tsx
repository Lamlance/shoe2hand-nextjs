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

export default function Order(props: OrderDetailResult) {

  const stats = props.deliveringStatus;


  return (
    <div className={styles["container"]}>
      <form action="">
        <div className={styles["title"]}>
          <div>{props.SHOP.shopName} - OrderId:{props.orderId}</div>
          <div>{props.deliveringStatus}</div>
        </div>
        <ul className={styles["content"]}>
          {
            props.ORDERDETAIL.map((iteminfo) => {
              return (<li>
                <div>{`${iteminfo.PRODUCT.title} x${iteminfo.quantity}`}</div>
              </li>);
            })
          }

        </ul>
        <div>
          {
            (stats != "DELIVERED" && stats != "CANCELED") ?
              <button type="button" className={styles["reorder"]}>CANCEL</button> :
              ""
          }
        </div>

      </form>
    </div>
  );
}