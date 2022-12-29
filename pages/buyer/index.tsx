import { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import userImage from "/public/logo-64.png";

import styles from "../../styles/UserDashboard.module.css";

import Order from "../../components/Buyer/Order";
import CartItems from "../../components/CartItems";
import UserChangeInfor from "../../components/Buyer/UserChangeInfor";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useStore } from "@nanostores/react";
import { userInfo_inDB } from "../../helper/userInfo_inDB";
import { DeliverStats, USER } from "@prisma/client";
import { OrderDetailResult } from "../api/buyer/order";
import Cart from "./Cart";
// const UserDisplay = {
//   userDisplayName: "Happy Guy",
//   userImage: "/public/logo-64.png",
// };

function UserDashboard() {
  // const [isActive, setIsActive] = useState(false);
  const [orders,setOrders] = useState<OrderDetailResult[]>([]);
  const orderFilter = useRef<DeliverStats>("WAITING");

  const $userInfo_inDB = useStore(userInfo_inDB);

  const changeInfo = createRef<HTMLDivElement>();
  const invoice = createRef<HTMLDivElement>();
  const cart = createRef<HTMLDivElement>();

  const { user, error, isLoading } = useUser();

  const tabPanel = [changeInfo, invoice, cart];

  const handleChangeTab = (id: number) => {
    tabPanel.forEach((tab, index) => {
      if (tab.current) {
        tab.current.style.display = id == index ? "block" : "none";
      }
    });
  };

  if (isLoading) {
    return <h1>...LOADING</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!$userInfo_inDB || !$userInfo_inDB.user) {
    fetch("/api/user", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: user?.email,
        sub: user?.sub,
        name: user?.name,
      }),
    }).then((raw) => {
      raw.json().then((userData: { userData: USER }) => {
        userInfo_inDB.set({
          user: userData.userData,
        });
      });
    });
  }

  if (!$userInfo_inDB || !$userInfo_inDB.user) {
    return <h1>...LOADING USER DATA</h1>;
  }

  const handleClick = () => {
    // setIsActive(!isActive);
  };

  const getOrders = async (filter: DeliverStats | null) => {
    const fetchData = await fetch(
      `/api/buyer/order?userId=${$userInfo_inDB.user.userId}`
    );
    try {
      const data: OrderDetailResult[] = await fetchData.json();
      setOrders(data);
    } catch (error) {}
  };

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
              {$userInfo_inDB?.user.userName}
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
                  getOrders(null);
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
            style={{ display: "none" }}
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
              </div>
              <ul
                className={`${styles["user_invoice_information"]} ${styles["active"]}`}
              >
                {
                  orders.map((order, index) => {
                    return (
                      <li key={`Order:${index}`}>
                        <Order {...order} />
                      </li>
                    );
                  })
                  // Invoice
                }
              </ul>
            </div>
          </div>

          <div
            style={{ display: "none" }}
            ref={cart}
            className={`${styles["user_cart_information"]}`}
          >
            <Cart />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withPageAuthRequired(UserDashboard);
