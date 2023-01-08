import { USER } from "@prisma/client";
import Image from "next/image";
import { createRef, FormEvent } from "react";
import { toast } from "react-toastify";
import { userInfo_inDB } from "../../helper/userInfo_inDB";
import userImage from "/public/logo-64.png";
import styles from "/styles/UserChangeInfor.module.css";

export default function UserChangeInfor({ user }: { user: USER }) {
  const nameRef = createRef<HTMLInputElement>();
  const phoneRef = createRef<HTMLInputElement>();
  const addressRef = createRef<HTMLInputElement>();

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(nameRef.current && phoneRef.current && addressRef.current)) {
      return;
    }
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    console.log(name, phone, address);
    toast.info("Updating profile");
    const fetchData = await fetch("/api/buyer/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        phone: phone,
        address: address
      })
    });
    try {
      const updateUser = await fetchData.json();
      if(fetchData){
        userInfo_inDB.set(updateUser);
        toast.success("Updated success");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    toast.error("Update failed")
  }

  return (
    <div className={styles["container"]}>
      <div className={`${styles["user_change_acount_information"]} ${styles["unactive"]}`}>
        <div className={styles["user_change_title"]}>
          <h2>Hồ sơ của tôi</h2>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <p>{user.email}</p>
        </div>
        <div className={styles["user_change_information_form_layout"]}>
          <div className={styles["user_change_information_form"]}>
            <form style={{ width: "100%", height: "100%" }} onSubmit={updateUser} >
              <div>
                <label htmlFor="user_name_display">Tên
                  <input ref={nameRef} type="text" name="name" id="user_name_display" defaultValue={user.userName} required />
                </label>
                <div className={`${styles["user_name_display"]} ${styles["inline_block"]} ${styles["mgl5"]}`}></div>
              </div>
              <div>
                <label htmlFor="phone_number">
                  Số điện thoại
                  <input type="number" name="phone" id="phone_number" ref={phoneRef}
                  defaultValue={user.phone ? user.phone : ""} maxLength={11} minLength={10} required />
                </label>
                <div className={styles["inline_block"]}></div>
              </div>
              <div>
                <label htmlFor="address">
                  Địa chỉ
                  <input type="text" name="address" id="address" ref={addressRef}
                  defaultValue={user.address ? user.address : ""} required />
                </label>
                <div className={styles["inline_block"]}></div>
              </div>
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
