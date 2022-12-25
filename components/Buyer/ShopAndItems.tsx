import styles from "/styles/ShopAndItems.module.css";
import Image from "next/image";
import userImage from "/public/logo-64.png";

import Navbar from "../Navbar";
import Items from "./Items";

const shopInfor = {
  name: "MIA.vn Official Store",
  label: "Mall",
  link: "#HOME",
};

// className={styles[""]}

export default function ShopAndItems() {
  return (
    <div className={styles["container"]}>
      {/* <Navbar /> */}
      <div className={styles["main"]}>
        <div className={styles["shop"]}>
          <div className={`${styles["check_box"]} ${styles["content"]}`}>
            <input className={styles["checkbox_input"]} type="checkbox" />
            <a href={shopInfor.link} className={styles["shop_link"]}>
              <div className={styles["shop_label"]}>{shopInfor.label}</div>
              <span className={styles["shop_name"]}>{shopInfor.name}</span>
            </a>
          </div>
        </div>
        <Items />
      </div>
    </div>
  );
}
