import React, { createRef } from "react";
import Image from "next/image";
import s2hLogo from "/public/logo2.svg";
import shoppingCart from "/public/cart.svg";
import loupe from "/public/loupe.svg";
import user from "/public/user.svg";

import styles from "../styles/Navbar.module.scss";
import { useStore } from "@nanostores/react";
import { isCartOpen } from "../helper/CartStore";
import Link from "next/link";
import { FormEvent } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export interface NavBarProps {
  submitSearchFunc?: (event: FormEvent<HTMLFormElement>, search?: string) => void
}

export default function Navbar({ submitSearchFunc }: NavBarProps) {
  const router = useRouter();
  const searchInputRef = createRef<HTMLInputElement>();
  const $isCartOpen = useStore(isCartOpen);
  const {user} = useUser();

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
                  width={64}
                  height={64}
                />
                <h3>Shoes2hand</h3>
              </a>
            </Link>
          </div>
          <div className={styles["layout_search_box"]}>
            <form action="/search" method="GET" onSubmit={(e) => {
              // console.log("POI",submitSearchFunc);
              e.preventDefault();
              if (submitSearchFunc) {
                const search = searchInputRef.current?.value;
                if (search) {
                  submitSearchFunc(e, search);
                  return;
                }
                submitSearchFunc(e);
              }else{
                router.push({pathname:"/search",query:{name:searchInputRef.current?.value}})
              }
            }}>
              <input ref={searchInputRef} type="text" name="name" id="q" placeholder="Seach in Shoes2hand..." />
              <button>
                <Image src={loupe} alt="search" width={28} height={28} />
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
              <Image src={shoppingCart} alt="cart" width={28} height={28} />
            </a>
          </div>
          <div className={styles["s2h_header_banner"]}>
            <Link href={"/seller"} >
              <button className={styles["open_shop"]}>
                <p>Mở Shop</p>
              </button>
            </Link>
            <Link href={(user) ? "/buyer" : "/api/auth/login"}>
            <button className={styles["login"]}>
              <div><p>{(user) ? (user.name || user.nickname) : "Đăng nhập"}</p></div>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
