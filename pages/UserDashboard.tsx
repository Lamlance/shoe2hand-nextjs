import { useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import userImage from "/public/logo-64.png";

import styles from "../styles/UserDashboard.module.css";

import Invoice from "../components/Invoice";
import CartItems from "../components/CartItems";
import UserChangeInfor from "../components/UserChangeInfor";

const UserDisplay = {
  userDisplayName: "Happy Guy",
  userImage: "/public/logo-64.png",
};

function changeViewHandler() {}

export default function UserDashboard() {
  const [isActive, setIsActive] = useState(false);
  // const handleClick = event => {
  //   setIsActive(current => !current);
  // };
  return (
    <div>
      {/* <Navbar /> */}
      <div className={styles["container"]}>
        <div className={styles["sidebar"]}>
          <div className={styles["user_infor"]}>
            {/* test image */}
            <Image
              src={userImage}
              alt="user_image"
              className={styles["user_image"]}
            />

            <h3
              className={`${styles["user_login_name"]} ${styles["inline_block"]}`}
            >
              {UserDisplay.userDisplayName}
            </h3>
          </div>
          <div className={styles["sidebar_navigation"]}>
            <ul>
              <li>Thay đổi thông tin tài khoản</li>
              <li>Đơn mua</li>
              <li>Giỏ hàng</li>
            </ul>
          </div>
        </div>
        <div className={styles["sidebar_display"]}>
          <div
            className={`${styles["user_change_acount_information"]} ${styles["unactive"]}`}
          >
            <UserChangeInfor />
          </div>
          <div
            className={`${styles["user_invoice_information"]} ${styles["active"]}`}
          >
            <div className={styles["tab_navigation"]}>
              <div className={styles["tab_button"]}>
                <button>Chờ xác nhận</button>
                <button>Đang giao</button>
                <button>Đã giao</button>
                <button>Đã huỷ</button>

                <div
                  className={`${styles["user_invoice_information"]} ${styles["active"]}`}
                >
                  <Invoice />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles["user_cart_information"]} ${styles["unactive"]}`}
          >
            <CartItems />
          </div>
        </div>
      </div>
    </div>
  );
}
