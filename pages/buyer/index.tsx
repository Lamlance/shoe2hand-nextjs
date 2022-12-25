import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useStore } from '@nanostores/react';
import { CSSProperties } from 'react';
import CartItems from '../../components/CartItems';
import ShopCart from '../../components/ShopCart';
import { cartItems,deleteCartItemByShopId } from '../../helper/CartStore';

import styles from "/styles/buyer/Buyer.module.css"

function CartList() {
  const $cartItems = useStore(cartItems);


  return (<div className={styles["buyer_wrapper"]}>
    <div>
      <ul>
        {
          Object.values($cartItems).map((shop, index) => {
            return (<li>
              <p onClick={()=>{deleteCartItemByShopId(shop.shopId)}}>{`Shop ID: ${shop.shopId}`}</p>
              <ul>
                {
                  shop.products.map((pInfo) => {
                    return (<li>{`ID:${pInfo.id} - ${pInfo.title}: ${pInfo.quantity}`}</li>)
                  })
                }
              </ul>
            </li>)
          })
        }
      </ul>
    </div>

    <div>
      Order

    </div>
  </div>)
}
export default withPageAuthRequired(CartList);