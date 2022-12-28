import styles from "/styles/Items.module.css";
import Image from "next/image";
import shoesImage from "/public/jordan1.png";

const ItemInfo = {
  name: "Giày Mia",
  size: "42",
  price: "2.000.000 VNĐ",
  quantity: "1",
  totalPrice: "2.000.000 VNĐ",
  link: "#HOME",
};

export default function Items() {
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={`${styles["item"]} ${styles["check_box"]}`}>
          <div className={styles["item_content"]}>
            <div className={styles["item_name_and_image"]}>
              <a href={ItemInfo.link} className={styles["item_infor"]}>
                <Image
                  src={shoesImage}
                  alt="shoe-image"
                  className={styles["shoes_image"]}
                  width={80}
                  height={80}
                />
                <a href={ItemInfo.link} className={styles["item_name"]}>
                  Air Jordan 1 Mid
                </a>
              </a>
            </div>
            <div className={styles["item_content_display"]}>
              <div className={styles["item_price"]}>{ItemInfo.price}</div>
              <div className={styles["item_quantity"]}>{ItemInfo.quantity}</div>
              <div className={styles["item_manipulation"]}>Xoá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
