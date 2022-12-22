import styles from "../styles/Items.module.css";
import Image from "next/image";
import shoesImage from "/public/jordan1.png";

const ItemInfo = {
  name: "Giày Mia",
  link: "#HOME",
};

export default function Items() {
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={`${styles["item"]} ${styles["check_box"]}`}>
          <input className={styles["checkbox_input"]} type="checkbox" />
          <div>
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
            <div className={styles["item_size"]}></div>
            <div className={styles["item_price"]}></div>
            <div className={styles["item_quantity"]}></div>
            <div className={styles["item_total_price"]}></div>
            <div className={styles["item_manipulation"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
