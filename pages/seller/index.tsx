import { useRef, useState } from "react";
import styles from "/styles/SellerDBoard.module.css";

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';



const SellerDBoard = () => {
  const [selectedOption,setSelectedOption] = useState(1);

  

  return (<div className={styles["s2h_seller_dboard_wrapper"]}>
    <ul className={styles["s2h_seller_dboard_option_select"]}>
      <li onClick={()=>{setSelectedOption(1)}}>Giày bạn bán</li>
      <li onClick={()=>{setSelectedOption(2)}}>Các đơn hàng</li>
      <li onClick={()=>{setSelectedOption(3)}}>Các thông báo</li>
    </ul>
  </div>)
}

export default withPageAuthRequired(SellerDBoard);