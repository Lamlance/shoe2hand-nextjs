import Image from "next/image";
import s2hLogo from "/public/logo-64.png";
import facebookLogo from "/public/facebook-16.png";
import instagramLogo from "/public/instagram-16.png";
import search from "/public/search-3-24.png";
import shoppingCart from "/public/shopping-cart-32.png";
import topBanner from "/public/top-banner.jpg";
import loupeSVG from "/public/loupe-search-svg.svg";
// import { ReactElement } from "react";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/Navbar.module.css";
import { useStore } from "@nanostores/react";
import { isCartOpen } from "./CartStore";

export default function Navbar() {
  const $isCartOpen = useStore(isCartOpen);
  return (
    <div className={styles["nav"]}>
      <div className={styles["top_banner"]}>
        {/* <Image src={topBanner} alt="top-banner" /> */}
        TOP BANNER
      </div>
      <div className={styles["nav__bar"]}>
        <div className={styles["top_links_bar"]} id="topActionLinks">
          <div className={styles["links_list"]}>
            <div className={styles["top_link_items"]} id="topActionDownload">
              <a href="#">SAVE MORE ON APP</a>
            </div>
            <div className={styles["top_link_items"]} id="topActionSell">
              <a href="#">SELL ON SHOES2HAND</a>
            </div>
            <div
              className={styles["top_link_items"]}
              id="topActionCustomerCare"
            >
              <a href="#">CUSTOMER CARE</a>
            </div>
            <div className={styles["top_link_items"]} id="topActionTrack">
              <a href="#">TRACK MY ORDER</a>
            </div>
            <div className={styles["top_link_items"]} id="topActionLogin">
              <a href="#">LOGIN</a>
            </div>
            <div className={styles["top_link_items"]} id="topActionSignUp">
              <a href="#">SIGN UP</a>
            </div>
            <div className={styles["top_link_items"]} id="topActionSwitchLang">
              <a href="#">LANGUAGES</a>
            </div>
          </div>
        </div>
        <div className={styles["s2h_logo_bar"]}>
          <div className={styles["s2h_logo_content"]}>
            <a href="#HOME" className={styles["sh2_bar"]}>
              <Image src={s2hLogo} alt="Logo" className={styles["s2h_logo"]} />
              <h3>Shoes2hand</h3>
            </a>
          </div>
          <div className={styles["layout_search_box"]}>
            <form action="" method="GET" style={{ width: "100%",height:"100%"}} onSubmit={(e)=>{e.preventDefault()}}>
              <input type="text" name="q" id="q" placeholder="Seach in Shoes2hand..." />
              <button className={styles["btn_search"]}>
                <Image src={search} alt="search" />
              </button>
            </form>
          </div>
          <div
            className={styles["s2h_nav_cart"]}
            onClick={() => {
              isCartOpen.set(!$isCartOpen);
            }}
          >
            <a href="#CART">
              <Image src={shoppingCart} alt="cart" />
              {/* <FontAwesomeIcon icon={faCartShopping} /> */}
            </a>
          </div>
          <div className={styles["s2h_header_banner"]}>
            <a href="#CART">BANNER</a>
          </div>
        </div>
      </div>
    </div>
  );
}
