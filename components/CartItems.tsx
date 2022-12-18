import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../styles/CartItems.module.css";

let Items = {
  belongTo: "AAA shop",
  itemName: "Giày X",
  quantity: "1",
  price: "100.000",
};

export default function CartItems() {
  return (
    <div className={styles["container"]}>
      <form action="">
        <div className={styles["title"]}>
          <div>{Items.belongTo}</div>
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
          <div>
            <p>{Items.price}</p>
            <p>Số lượng: {Items.quantity}</p>
          </div>
        </div>
        <div className={styles["footer"]}>
          <div>
            <p>Tổng thanh toán: 200.000</p>
          </div>
          <div>
            <button className={styles["order"]}>Thanh toán</button>
          </div>
        </div>
      </form>
    </div>
  );
}
