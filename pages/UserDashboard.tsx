import { useRef, useState } from "react";
import Image from "next/image";
import userImage from "/public/logo-64.png";

import styles from "../styles/UserDashboard.module.css";

const UserDisplay = {
  userDisplayName: "Happy Guy",
  userImage: "/public/logo-64.png",
};

const UserInformation = {
  userLoginName: "hanphu",
  userName: "Han Phu",
  userEmail: "phuhanld@gmail.com",
  userPhoneNumber: "0123456789",
  userGender: "Male",
  userBirthday: "23/04/2002",
  userAddress: "Binh Thanh, Ho Chi Minh",
};

export default function UserDashboard() {
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user_infor"]}>
          {/* test image */}
          <Image
            src={UserDisplay.userImage}
            alt="user_image"
            className={styles["user_image"]}
          />
          <h3 className={styles["user_login_name"]}>
            `$UserDisplay.userDisplayName`
          </h3>
        </div>
        <div className={styles["sidebav_navigation"]}>
          <ul>
            <li onClick={() => {}}>Thay đổi thông tin tài khoản</li>
            <li onClick={() => {}}>Đơn hàng</li>
            <li onClick={() => {}}>Giỏ hàng</li>
          </ul>
        </div>
      </div>
      <div className={styles["sidebar_display"]}>
        View change depend on userOption
      </div>
    </div>
  );
}
