import { useRef, useState } from "react";
import styles from "/styles/SellerDBoard.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { userInfo_inDB } from "../../helper/userInfo_inDB";
import { useStore } from "@nanostores/react";
import { USER,SHOP } from "@prisma/client";

const SellerDBoard = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const { user, error, isLoading } = useUser();
  const $userInfo_inDB = useStore(userInfo_inDB);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if(!$userInfo_inDB || !$userInfo_inDB.userId){
    fetch("/api/user",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body:JSON.stringify({
          email:user?.email,
          sub: user?.sub,
          name: user?.name
        })
    }).then((raw)=>{
      raw.json().then((userData:{userData:USER}) =>{
        userInfo_inDB.set({
          userId: userData.userData.userId
        })
      })
    })
  }
  if($userInfo_inDB && !$userInfo_inDB?.shopId){
    fetch("/api/shop",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body:JSON.stringify({
          userId: $userInfo_inDB.userId
        })
      }).then((raw)=>{
        raw.json().then((shop:{ shop:SHOP })=>{
          userInfo_inDB.set({
            userId: $userInfo_inDB.userId,
            shopId: shop.shop.shopId
          })
        })
      })
  }

  // console.log(user)

  return (<div >
    <h1>{`Hello ${user?.name} - ${user?.name} - UserID: ${$userInfo_inDB?.userId} - Shop:${$userInfo_inDB?.shopId}` }</h1>
    <div className={styles["s2h_seller_dboard_wrapper"]}>
      <ul className={styles["s2h_seller_dboard_option_select"]}>
        <li onClick={() => { setSelectedOption(1) }}>Giày bạn bán</li>
        <li onClick={() => { setSelectedOption(2) }}>Các đơn hàng</li>
        <li onClick={() => { setSelectedOption(3) }}>Các thông báo</li>
      </ul>
    </div>
  </div>)
}

export default withPageAuthRequired(SellerDBoard);