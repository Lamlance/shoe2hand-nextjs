import { useRef, useState } from "react";
import styles from "/styles/seller/SellerDBoard.module.css";

import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import { userInfo_inDB } from "../../helper/userInfo_inDB";

import { useStore } from "@nanostores/react";
import { USER, SHOP } from "@prisma/client";

import ShoeOption from "../../components/Seller/ShoeOption";

const SellerDBoard = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const { user, error, isLoading } = useUser();
  const $userInfo_inDB = useStore(userInfo_inDB);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!$userInfo_inDB || !$userInfo_inDB.user) {
    fetch("/api/user",
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: user?.email,
          sub: user?.sub,
          name: user?.name
        })
      }).then((raw) => {
        raw.json().then((userData: { userData: USER }) => {
          userInfo_inDB.set({
            user: userData.userData
          })
        })
      })
  }
  if ($userInfo_inDB && !$userInfo_inDB?.shop) {
    fetch("/api/shop", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        userId: $userInfo_inDB.user.userId
      })
    }).then((raw) => {
      raw.json().then((shop: { shop: SHOP }) => {
        userInfo_inDB.set({
          user: $userInfo_inDB.user,
          shop: shop.shop
        })
      })
    })
  }

  // console.log(user)
  const shoeOption = ShoeOption({
    userId: ($userInfo_inDB && $userInfo_inDB.user) ?  $userInfo_inDB.user.userId : null,
    shopId: ($userInfo_inDB && $userInfo_inDB.shop) ? $userInfo_inDB.shop.shopId : null
  });

  return (<div >
    <h1>
      {`Hello ${user?.name} - ${user?.name} - 
      UserID: ${$userInfo_inDB?.user.userId} - 
      Shop:${$userInfo_inDB?.shop?.shopId}`
      }
    </h1>
    <div className={styles["s2h_seller_dboard_wrapper"]}>
      <div className={styles["s2h_seller_dboard_option_select"]}>
        <ul className={styles["s2h_seller_shoes_option_ul"]}>
          <li onClick={() => { setSelectedOption(0) }}>Giày bạn bán</li>
          <li onClick={() => { setSelectedOption(1) }}>Các đơn hàng</li>
          <li onClick={() => { setSelectedOption(2) }}>Các thông báo</li>
        </ul>
      </div>

      <div>
        {shoeOption}
      </div>
    </div>
  </div>)
}

export default withPageAuthRequired(SellerDBoard);