import Image from "next/image";
import userImage from "/public/logo-64.png";
import styles from "../styles/UserChangeInfor.module.css";

const UserInformation = {
  userLoginName: "hanphu",
  userPassword: "123123123",
  userName: "Han Phu",
  userEmail: "hanphu@testemail.com",
  userPhoneNumber: "0123456789",
  userGender: "Nam",
  userBirthday: "01/01/2002",
  userAddress: "Ho Chi Minh",
};

export default function UserChangeInfor() {
  return (
    <div className={styles["container"]}>
      <div
        className={`${styles["user_change_acount_information"]} ${styles["unactive"]}`}
      >
        <div className={styles["user_change_title"]}>
          <h2>Hồ sơ của tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className={styles["user_change_information_form_layout"]}>
          <div className={styles["user_change_information_form"]}>
            <form action="" method="GET" style={{ width: "100%", height: "100%" }}>
              <div>
                <label htmlFor="username">Tên đăng nhập
                  <input type="text" name="user_login_name" id="user_login_name" defaultValue={UserInformation.userLoginName}/>
                </label>
                <div className={`${styles["user_name_display"]} ${styles["inline_block"]} ${styles["mgl5"]}`}></div>
              </div>
              <div>
                <label htmlFor="user_name_display">Tên
                  <input type="text" name="user_name_display" id="user_name_display" defaultValue={UserInformation.userName}/>
                </label>
                <div className={`${styles["user_name_display"]} ${styles["inline_block"]} ${styles["mgl5"]}`}></div>
              </div>
              <div>
                <label htmlFor="user_password">
                  Mật khẩu
                  <input
                    type="password"
                    name="user_passowrd"
                    id="user_password"
                    defaultValue={UserInformation.userPassword}
                  />
                </label>
                <div
                  className={`${styles["user_password"]} ${styles["inline_block"]}`}
                ></div>
              </div>
              <div className={styles.test}>
                <label htmlFor="email">
                  Email
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={UserInformation.userEmail}
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    title="Invalid email address"
                  />
                </label>
                <div
                  className={`${styles["email"]} ${styles["inline_block"]}`}
                ></div>
              </div>
              <div>
                <label htmlFor="phone_number">
                  Số điện thoại
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    defaultValue={UserInformation.userPhoneNumber}
                  />
                </label>
                <div className={styles["inline_block"]}></div>
              </div>
              {/* <div>
                  <label htmlFor="gender">
                    Giới tính
                    <select name="gender" id="gender" required>
                      <option value="" disabled selected hidden>
                        {UserInformation.userGender}
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </label>
                  <div className={styles["inline_block"]}></div>
                </div> */}
              {/* <div>
                <label htmlFor="birthday">
                  <div className={styles["birthday_lable"]}>Ngày sinh</div>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    // value={UserInformation.userBirthday}
                  />
                </label>
                <div className={styles["inline_block"]}></div>
              </div> */}
              <div>
                <button className={styles["save_button"]}>Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
