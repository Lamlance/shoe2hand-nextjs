import styles from "/styles/Items.module.css";
import Image from "next/image";
import shoesImage from "/public/jordan1.png";
import { deleteProduct, ProductInfo } from "../../helper/CartStore";

const ItemInfo = {
  name: "Giày Mia",
  size: "42",
  price: "2.000.000 VNĐ",
  quantity: "1",
  totalPrice: "2.000.000 VNĐ",
  link: "#HOME",
};

interface ItemProps {
  info: ProductInfo,
  shopId: number,
}

export default function Items({info,shopId}:ItemProps) {
  return (
    <div className={styles["container"]}>
      <div className={styles["main"]}>
        <div className={`${styles["item"]} ${styles["check_box"]}`}>
          <div className={styles["item_content"]}>
            <div className={styles["item_name_and_image"]}>
              <a href={ItemInfo.link} className={styles["item_infor"]}>
                <Image src={shoesImage} alt="shoe-image" className={styles["shoes_image"]} width={80} height={80}/>
                <a href={ItemInfo.link} className={styles["item_name"]}>
                  {info.title}
                </a>
              </a>
            </div>
            <div className={styles["item_content_display"]}>
              <div className={styles["item_price"]}>{info.price}</div>
              <div className={styles["item_quantity"]}>{info.quantity}</div>
              <div className={styles["item_manipulation"]} onClick={()=>{deleteProduct(shopId,info.id)}}>Xoá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
