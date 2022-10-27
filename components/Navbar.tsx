import Image from "next/image";
import s2hLogo from "/public/logo-64.png";
import facebookLogo from "/public/facebook-16.png";
import instagramLogo from "/public/instagram-16.png";
import search from "/public/search-32.png";
import shoppingCart from "/public/shopping-cart-32.png";

import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <div>
      <div className="top_links_bar" id="topActionLinks">
        {/* {styles["links_list"]} */}
        <div className={styles["links_list"]}>
          <div className="top_link_items" id="topActionDownload">
            <a href="#">SAVE MORE ON APP</a>
          </div>
          <div className="top_link_items" id="topActionSell">
            <a href="#">SELL ON SHOES2HAND</a>
          </div>
          <div className="top_link_items" id="topActionCustomerCare">
            <a href="#">CUSTOMER CARE</a>
          </div>
          <div className="top_link_items" id="topActionTrack">
            <a href="#">TRACK MY ORDER</a>
          </div>
          <div className="top_link_items" id="topActionLogin">
            <a href="#">LOGIN</a>
          </div>
          <div className="top_link_items" id="topActionSignUp">
            <a href="#">SIGN UP</a>
          </div>
          <div className="top_link_items" id="topActionSwitchLang">
            <a href="#">LANGUAGES</a>
          </div>
        </div>
      </div>
      <div className={styles["s2h_logo_bar"]}>
        <div className={styles["s2h_logo_content"]}>
          <a href="#HOME" className={styles["sh2_bar"]}>
            <Image src={s2hLogo} alt="Logo" className="s2h_logo" />
            <h3>Shoes2Hand</h3>
          </a>
        </div>
        <div className="s2h_nav_search">
          <form action="" method="GET">
            <input
              type="text"
              placeholder="Search in Shoes2Hand"
              name="search"
              id="search"
            />
            <button type="submit">
              <Image src={search} alt="search" />
            </button>
          </form>
        </div>
        <div className="s2h_nav_cart">
          <a href="#CART">
            <Image src={shoppingCart} alt="cart" />
          </a>
        </div>
        <div className="s2h_header_banner">
          <a href="#CART">BANNER</a>
        </div>
      </div>
    </div>
  );
}
