import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../styles/Invoice.module.css";

let Items = {
  belongTo: "AAA shop",
  status: "Đã giao",
  itemName: "Giày X",
  price: "100.000",
};

export default function Invoice() {
  return (
    <div className={styles["container"]}>
      <form action="">
        <div className={styles["title"]}>
          <div>{Items.belongTo}</div>
          <div>{Items.status}</div>
        </div>
        <div className={styles["content"]}>
          <div>
            {Items.itemName}{" "}
            {/* <Image
              src={userImage}
              alt="user_image"
              className={styles["user_image"]}
            /> */}
          </div>
          <div>{Items.price}</div>
        </div>
        <button className={styles["reorder"]}>Đặt Lại</button>
      </form>
    </div>
  );
}
