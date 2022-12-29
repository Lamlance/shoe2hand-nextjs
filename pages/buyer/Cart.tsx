import styles from "../../styles/Cart.module.css";

import ShopAndItems from "../../components/Buyer/ShopAndItems";

export default function Cart() {
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={styles["top"]}>
          <div className={styles["check_box"]}>
            <div className={styles["column_product"]}>Sản Phẩm</div>
          </div>
          <div className={styles["column_price"]}>Đơn Giá</div>
          <div className={styles["column_quantity"]}>Số Lượng</div>
          <div className={styles["column_action"]}>Thao Tác</div>
        </div>

        <ShopAndItems />

        <div className={styles["makepayment_sticky"]}></div>
      </div>
    </div>
  );
}
