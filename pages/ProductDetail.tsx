import ShopLayout from "../components/layouts/ShopLayout";
import styles from "../styles/ProductDetail.module.scss";

const ProductDetail = () =>{
  return(<ShopLayout>
    <div className={styles["s2h_product_detail_wrapper"]}>
      <div className={styles["s2h_product_briefing"]}>
        <div className={styles["s2h_product_image"]}>
          <img alt="Image 1"></img>
          <img alt="Image 1"></img>
          <img alt="Image 1"></img>
          <img alt="Image 1"></img>
        </div>
        <div className={styles["s2h_product_briefing_info"]}>
          <h1>ProductName</h1>
          <h1>Giá 90.000VND</h1>
          <div className={styles["s2h_product_breifing_add"]}>
            <h3>Số lượng</h3>
            <button>+</button>
            <input type="number" min="0"></input>
            <button>-</button>
          </div>
        </div>
      </div>
    </div>
  </ShopLayout>)  
}

export default ProductDetail;