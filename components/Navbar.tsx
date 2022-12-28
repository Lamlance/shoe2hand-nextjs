import React from "react";
import Image from "next/image";
import s2hLogo from "/public/logo-64.png";
import facebookLogo from "/public/facebook-16.png";
import instagramLogo from "/public/instagram-16.png";
import search from "/public/search-3-24.png";
import shoppingCart from "/public/cart.svg";
import loupe from "/public/loupe.svg";
import user from "/public/user.svg";

import styles from "../styles/Navbar.module.scss";
import { useStore } from "@nanostores/react";
import { isCartOpen } from "../helper/CartStore";
import Link from "next/link";
import { setLazyProp } from "next/dist/server/api-utils";

export default function Navbar() {
  const $isCartOpen = useStore(isCartOpen);
  return (
    <div className={styles["nav"]}>
      <div className={styles["nav__bar"]}>
        <div className={styles["s2h_logo_bar"]}>
          <div className={styles["s2h_logo_content"]}>
            <Link href={"/"}>
              <a className={styles["sh2_bar"]}>
                <Image
                  src={s2hLogo}
                  alt="Logo"
                  className={styles["s2h_logo"]}
                />
                <h3>Shoes2hand</h3>
              </a>
            </Link>
          </div>
          <div className={styles["layout_search_box"]}>
            <form
              action=""
              method="GET"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="text"
                name="q"
                id="q"
                placeholder="Seach in Shoes2hand..."
              />
              <button>
                <Image src={loupe} alt="search" width={32} height={32} />
              </button>
            </form>
          </div>
          <div
            className={styles["s2h_nav_cart"]}
            onClick={() => {
              isCartOpen.set(!$isCartOpen);
            }}
          >
            <a>
              <Image src={shoppingCart} alt="cart" />
            </a>
          </div>
          <div className={styles["s2h_header_banner"]}>
            <button className={styles["open_shop"]}>
              <p>Mở Shop</p>
            </button>
            <button className={styles["login"]}>
              <div>
                <Image src={user} alt="login" />

                <p>Đăng Nhập</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
