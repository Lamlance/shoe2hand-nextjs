import { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import userImage from "/public/logo-64.png";

import styles from "../styles/UserDashboard.module.css";

import Invoice from "../components/Buyer/Invoice";
import CartItems from "../components/CartItems";
import UserChangeInfor from "../components/Buyer/UserChangeInfor";

const UserDisplay = {
  userDisplayName: "Happy Guy",
  userImage: "/public/logo-64.png",
};

function changeViewHandler() {}

export default function UserDashboard() {
  const [isActive, setIsActive] = useState(false);
  const changeInfo = createRef<HTMLDivElement>();
  const invoice = createRef<HTMLDivElement>();
  const cart = createRef<HTMLDivElement>();

  const tabPanel = [changeInfo, invoice, cart];

  useEffect(() => {
    handleChangeTab(0);
  }, []);

  const handleChangeTab = (id: number) => {
    console.log("Select", id);
    tabPanel.forEach((tab, index) => {
      if (tab.current) {
        tab.current.style.display = id == index ? "block" : "none";
      }
    });
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const belongs = [
    {
      belongTo: "AAA",
    },
    {
      belongTo: "BBB",
    },
  ];
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
              <li
                onClick={() => {
                  handleChangeTab(0);
                }}
              >
                Thay đổi thông tin tài khoản
              </li>
              <li
                onClick={() => {
                  handleChangeTab(1);
                }}
              >
                Đơn mua
              </li>
              <li
                onClick={() => {
                  handleChangeTab(2);
                }}
              >
                Giỏ hàng
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["sidebar_display"]}>
          <div
            ref={changeInfo}
            className={`${styles["user_change_acount_information"]}`}
          >
            <UserChangeInfor />
          </div>

          <div
            ref={invoice}
            className={`${styles["user_invoice_information"]}`}
          >
            <div className={styles["tab_navigation"]}>
              <div className={styles["tab_button"]}>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Chờ xác nhận
                </button>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Đang giao
                </button>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Đã giao
                </button>
                <button
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Đã huỷ
                </button>

                <ul
                  className={`${styles["user_invoice_information"]} ${styles["active"]}`}
                >
                  {belongs.map((item, index) => {
                    const belong = item.belongTo;
                    return (
                      <li key={index}>
                        <Invoice
                          belongTo={belong}
                          item={[
                            { name: "So1", price: 1000 },
                            { name: "Item2", price: 20000 },
                          ]}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div ref={cart} className={`${styles["user_cart_information"]}`}>
            <CartItems />
          </div>
        </div>
      </div>
    </div>
  );
}

