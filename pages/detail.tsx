import { useRef, useState } from "react";
import { addCartItem, ItemDisplayInfo } from "../helper/CartStore";
import ShopLayout from "../components/layouts/ShopLayout";
import styles from "../styles/ProductDetail.module.scss";

interface ProductDetails{
  name:string,
  image:string[],
  price:number,
  amount:number,
  desc:string,
}

function getFakeProductData(){
  return(new Promise<ProductDetails>((resolve,reject)=>{
    setTimeout(()=>{
      resolve({
        name:"Giày hoa cúc GD cổ thấp",
        image:["image/img1","image/img2","image/img3"],
        price:75000,
        amount:3000,
        desc:`THÔNG TIN SẢN PHẨM 
        Kích thước Size :  36 - 37 - 38 - 39
        Chất liệu : vải, đế đúc nguyên khối
        Chiều cao đế : 2 cm
        Màu sắc, mẫu mã giống hình 100%
        Ôm chân, thon gọn, siêu đẹp
        Chấp nhận đổi trả nếu có bất cứ vấn đề nào liên quan đến chất lượng
       Bảng size giày: 
       22.5 đến  23 cm    ->  36
        23   đến  23.5 cm  -> 37
        23.5 đến  24 cm   ->   38
        24   đến  24.5 cm  ->   39
       🧨🧨Quý khách lưu ý:
        - Khi đặt hàng vui lòng nhắn tin nếu có ghi chú về màu sắc, số lượng.. hoặc cần tư vấn về sản phẩm
        - Khi nhận hàng vui lòng giữ lại vỏ gói hàng và nhắn tin cho shop nếu có bất kì khiếu nại hoặc thắc mắc liên quan đến sản phẩm.`
      })
    },1500)
  }))
}

const ProductDetail = () =>{
  const productNumerInput = useRef<HTMLInputElement>(null);
  const [productAmount,setProductAmount] = useState(0);
  const [fetchedData,setFetchedData] = useState<ProductDetails | null>(null);

  getFakeProductData().then((data)=>{setFetchedData(data)});
  
  if(fetchedData == null){
    return(<ShopLayout>
      <h1>Data is fetching</h1>
    </ShopLayout>);
  }

  const maxProduct = (fetchedData.amount <= 20) ? fetchedData.amount : 20;
  
  function changeProductAmountHandler(increaseFlag:boolean = true){
    const dataChange = productAmount + (increaseFlag ? 1 : -1);

    if(dataChange < maxProduct && dataChange > 0){
      setProductAmount(dataChange)
    }
  }

  function addToCartHandler(){
    if(!fetchedData){
      return
    }
    const data:ItemDisplayInfo = {
      name:fetchedData.name,
      id:"0",
      quantity:productAmount
    }
    addCartItem(data,true);
  }

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
          <h1>{fetchedData.name}</h1>
          <h1>Giá {fetchedData.price}VND</h1>
          <div className={styles["s2h_product_breifing_add"]}>
            <h3>Số lượng</h3>
            <button onClick={()=>{changeProductAmountHandler(false)}}>-</button>
            <input ref={productNumerInput} type="number" min={0} max={20} value={productAmount}></input>
            <button onClick={()=>{changeProductAmountHandler(true)}}>+</button>
          </div>
          <div>
            <button onClick={()=>{addToCartHandler()}}>Add To Cart</button>
            <button>Buy now</button>
          </div>
        </div>
      </div>
      <div style={{backgroundColor:"red",minHeight:"20vh",width:"100%"}}>
        Shop Detail
      </div>
      <div>
        <p>{fetchedData.desc}</p>
      </div>
    </div>
  </ShopLayout>)  
}

export default ProductDetail;