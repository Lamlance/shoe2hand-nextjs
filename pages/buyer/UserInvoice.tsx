import Image from "next/image";
import Navbar from "../../components/Navbar";
import styles from "../../styles/UserInvoiceDisplay.module.css";
const invoiceStatus = {
  All: "All",
  ToConfirm: "To Confirm",
  ToShip: "To Ship",
  Delivered: "Delivered",
  Canceled: "Canceled",
};
let ProductInInvoice = {
  a: ["Nike Air Force 1", "size 36", 1, 100],
  b: ["Addidas", "size 40", 2, 105],
  c: ["Converse", "size 38", 3, 202],
  d: ["Jordan", "size 42", 1, 500],
  e: ["Bitis Hunter", "size 39", 5, 96],
  f: ["Gucci", "size 37", 1, 708],
};

let Shop = {
  id1: "2Hand Corner",
  id2: "Shoes Addicted",
};

let InvoiceBox = {
  ShopName: "",
  InvoiceStatus: "",
  ProductInInvoice: "",
};
export default function UserInvoice() {
  return (
    <div className={styles["container"]}>
      <div className={styles["invoice_status_filter"]}>
        <span className={styles["invoice_status_filter_lable"]}>
          Invoice Status
        </span>
        <button className={styles["btn"]}>{invoiceStatus.All}</button>
        <button className={styles["btn"]}>{invoiceStatus.ToConfirm}</button>
        <button className={styles["btn"]}>{invoiceStatus.ToShip}</button>
        <button className={styles["btn"]}>{invoiceStatus.Delivered}</button>
        <button className={styles["btn"]}>{invoiceStatus.Canceled}</button>
      </div>
      <div className={styles["list_boxes"]}>
        <div className={styles["invoice_status_box"]}>
          <div className={styles["invoice_status_header"]}>
            <div className={styles["invoice_status_header_left"]}>
              <span>{Shop.id1}</span>
              <button className={styles["btn"]}>Chat</button>
              <button className={styles["btn"]}>View Shop</button>
            </div>
            <div className={styles["invoice_status_header_right"]}>
              <button className={styles["btn"]}>Delivered</button>
            </div>
          </div>
          <div className={styles["invoice_status_body"]}>
            <div className={styles["product"]}>
              <img
                src="https://th.bing.com/th/id/OIP._FUnx4WiHjkmF3zkbBqKrgHaHa?pid=ImgDet&rs=1"
                alt="GiayNike"
              />
              <div className={styles["product_detail"]}>
                <span>{ProductInInvoice.a[0]}</span>
                <span>Phân loại: {ProductInInvoice.a[1]}</span>
                <span>Số lượng: {ProductInInvoice.a[2]}</span>
              </div>
              <div>
                <div className={styles["product_price"]}>
                  Giá: {ProductInInvoice.a[3]}$
                </div>
              </div>
            </div>
            <div className={styles["product"]}>
              <img
                src="https://sapeur-osb.de/wp-content/uploads/2014/06/adidas-originals-july-2014-preview-04.jpg"
                alt="Addidas"
              />
              <div className={styles["product_detail"]}>
                <span>{ProductInInvoice.b[0]}</span>
                <span>Phân loại: {ProductInInvoice.b[1]}</span>
                <span>Số lượng: {ProductInInvoice.b[2]}</span>
              </div>
              <div>
                <div className={styles["product_price"]}>
                  Giá: {ProductInInvoice.b[3]}$
                </div>
              </div>
            </div>
          </div>
          <div className={styles["invoice_status_header_right"]}>
            <button className={styles["btn"]}>Đặt lại</button>
          </div>
        </div>

        <div className={styles["invoice_status_box"]}>
          <div className={styles["invoice_status_header"]}>
            <div className={styles["invoice_status_header_left"]}>
              <span>{Shop.id2}</span>
              <button className={styles["btn"]}>Chat</button>
              <button className={styles["btn"]}>View Shop</button>
            </div>
            <div className={styles["invoice_status_header_right"]}>
              <button className={styles["btn"]}>Delivered</button>
            </div>
          </div>
          <div className={styles["invoice_status_body"]}>
            <div className={styles["product"]}>
              <img
                src="https://th.bing.com/th/id/OIP.ugplbUlLEno3WN3eO5De3QHaFU?w=263&h=190&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                alt="Converse"
              />
              <div className={styles["product_detail"]}>
                <span>{ProductInInvoice.c[0]}</span>
                <span>Phân loại: {ProductInInvoice.c[1]}</span>
                <span>Số lượng: {ProductInInvoice.c[2]}</span>
              </div>
              <div>
                <div className={styles["product_price"]}>
                  Giá: {ProductInInvoice.c[3]}$
                </div>
              </div>
            </div>
            <div className={styles["product"]}>
              <img
                src="https://th.bing.com/th/id/OIP.f5j81mftwU3nLbsAHe0HNwHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                alt="Jordan"
              />
              <div className={styles["product_detail"]}>
                <span>{ProductInInvoice.d[0]}</span>
                <span>Phân loại: {ProductInInvoice.d[1]}</span>
                <span>Số lượng: {ProductInInvoice.d[2]}</span>
              </div>
              <div>
                <div className={styles["product_price"]}>
                  Giá: {ProductInInvoice.d[3]}$
                </div>
              </div>
            </div>
            <div className={styles["product"]}>
              <img
                src="https://th.bing.com/th?q=Bitis+Hunter+1Tr&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.1&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=en&adlt=strict&t=1&mw=247"
                alt="Bitis Hunter"
              />
              <div className={styles["product_detail"]}>
                <span>{ProductInInvoice.e[0]}</span>
                <span>Phân loại: {ProductInInvoice.e[1]}</span>
                <span>Số lượng: {ProductInInvoice.e[2]}</span>
              </div>
              <div>
                <div className={styles["product_price"]}>
                  Giá: {ProductInInvoice.e[3]}$
                </div>
              </div>
            </div>
          </div>
          <div className={styles["invoice_status_header_right"]}>
            <button className={styles["btn"]}>Đặt lại</button>
          </div>
        </div>
      </div>
    </div>
  );
}
