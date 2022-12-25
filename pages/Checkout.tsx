import styles from "../styles/Checkout.module.css";

import ShopAndItems from "../components/Buyer/ShopAndItems";

export default function Checkout() {
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={styles["top"]}>
          <div className={styles["check_box"]}>
            <input className={styles["checkbox_input"]} type="checkbox" />
            <div className={styles["column_product"]}>Sản Phẩm</div>
          </div>
          <div className={styles["column_price"]}>Đơn Giá</div>
          <div className={styles["column_quantity"]}>Số Lượng</div>
          <div className={styles["column_total_price"]}>Số Tiền</div>
          <div className={styles["column_action"]}>Thao Tác</div>
        </div>

        <ShopAndItems />
      </div>
    </div>
  );
}
