import styles from "../styles/Navbar.module.scss";

export default function TopActionLink() {
  return (
    <div className={styles["top_links_bar"]} id="topActionLinks">
      <div className={styles["links_list"]}>
        <div className={styles["top_link_items"]} id="topActionDownload">
          {/* <a href="/ProductDetail">SAVE MORE ON APP</a> */}
          <Link href={"/ProductDetail"}>SAVE MORE ON APP</Link>
        </div>
        <div className={styles["top_link_items"]} id="topActionSell">
          <a href="#">SELL ON SHOES2HAND</a>
        </div>
        <div className={styles["top_link_items"]} id="topActionCustomerCare">
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
  );
}
