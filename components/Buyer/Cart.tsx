import styles from "../../styles/Cart.module.css";

import ShopAndItems from "./ShopAndItems";
import { CartItem } from "../../helper/CartStore";

interface CartProps {
  orders: CartItem[]
}

export default function Cart({ orders }: CartProps) {
  

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

        <ul style={{listStyleType:"none"}}>
          {
            orders.map((order, id) => {
              return (<li>
                <ShopAndItems data={order} />
              </li>)
            })
          }
        </ul>

        <div className={styles["makepayment_sticky"]}></div>
      </div>
    </div>
  );
}
