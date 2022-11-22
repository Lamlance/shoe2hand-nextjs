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
  userPassword: "123123123",
  userName: "Han Phu",
  userEmail: "phuhanld@gmail.com",
  userPhoneNumber: "0123456789",
  userGender: "Male",
  userBirthday: "23/04/2002",
  userAddress: "Binh Thanh, Ho Chi Minh",
};

function changeViewHandler() {}

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
        <div className={styles["user_change_acount_information active"]}>
          <div className={styles["user_change_title"]}>
            <h2>Hồ sơ của tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div className={styles["user_change_information_form_layout"]}>
            <div className={styles["user_change_information_form"]}>
              <form
                action=""
                method="GET"
                style={{ width: "100%", height: "100%" }}
              >
                <div>
                  <label htmlFor="username">Tên đăng nhập</label>
                  <div>UserInformation.userLoginName</div>
                </div>
                <div>
                  <label htmlFor="user_password">Tên</label>
                  <div>
                    <input
                      type="password"
                      name="user_passowrd"
                      id="user_password"
                      value={UserInformation.userPassword}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="user_name_display">Tên</label>
                  <div>
                    <input
                      type="text"
                      name="user_name_display"
                      id="user_name_display"
                      value={UserInformation.userName}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <div>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={UserInformation.userEmail}
                      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                      title="Invalid email address"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone_number">Số điện thoại</label>
                  <div>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      value={UserInformation.userPhoneNumber}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="gender">Giới tính</label>
                  <div>
                    <select name="gender" id="gender" required>
                      <option value="" disabled selected hidden>
                        UserInformation.userGender
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="birthday">Ngày sinh</label>
                  <div>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      // value={UserInformation.userBirthday}
                    />
                  </div>
                </div>
                <div>
                  <button>Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles["user_invoice_information"]}>
          test user_invoice_information
        </div>
        <div className={styles["user_cart_information"]}>
          test cart infomation
        </div>
      </div>
    </div>
  );
}
