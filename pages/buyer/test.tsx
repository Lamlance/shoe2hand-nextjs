import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useStore } from '@nanostores/react';
import { USER } from '@prisma/client';
import { CSSProperties, useState } from 'react';
import CartItems from '../../components/CartItems';
import ShopCart from '../../components/ShopCart';
import { CartItem, cartItems, deleteProduct, deleteCartItemByShopId } from '../../helper/CartStore';
import { userInfo_inDB } from '../../helper/userInfo_inDB';
import { OrderDetailResult } from '../api/buyer/order';


import styles from "/styles/buyer/Buyer.module.css"

function CartList() {
  // const $cartItems = ;
  const $cartItems = useStore(cartItems);
  const $userInfo_inDB = useStore(userInfo_inDB);
  const [orders, setOrders] = useState<OrderDetailResult[]>();

  const { user, error, isLoading } = useUser();

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

  const makeOrderHandler = async (orderDetail: CartItem) => {
    if (!orderDetail) {
      return;
    }

    const data: CartItem = JSON.parse(JSON.stringify(orderDetail));
    deleteCartItemByShopId(orderDetail.shopId);

    $userInfo_inDB?.user
    const orderFetch = await fetch("/api/buyer/order", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        userId: $userInfo_inDB?.user.userId,
        shopId: data.shopId,
        product: data.products
      })
    })
    try {
      const orderData: OrderDetailResult = await orderFetch.json();
      setOrders([
        ...(orders ? orders : []),
        orderData
      ])
    } catch (error) {
      console.log(error);
    }
  }

  const getOrders = async () => {
    if (!$userInfo_inDB || !$userInfo_inDB.user){
      return;
    }

    const fetchData = await fetch(`/api/buyer/order?userId=${$userInfo_inDB.user.userId}`);
    try {
      const orders:OrderDetailResult[] = await fetchData.json();
      setOrders(orders);
    } catch (error) {
      
    }
  }

  return (<div className={styles["buyer_wrapper"]}>
    <div>
      <h1>{$userInfo_inDB?.user.userId}</h1>
      <ul>
        {
          Object.values($cartItems).map((shop, index) => {
            return (<li>
              <p>{`Shop ID: ${shop.shopId}`}</p>
              <span><button onClick={() => { makeOrderHandler(shop) }}>ORDER</button></span>
              <ul>
                {
                  shop.products.map((pInfo) => {
                    return (<li>
                      {`ID:${pInfo.id} - ${pInfo.title}: ${pInfo.quantity}`}
                      <span><button onClick={() => { deleteProduct(shop.shopId, pInfo.id) }} >DELETE</button></span>
                    </li>)
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
      <button onClick={()=>{getOrders()}}> REFRESH </button>
      <ul>
        {
          orders?.map((o) => {
            return (<li key={`Order:${o.orderId}`}>
              <p>{`Order ID: ${o.orderId}`}</p>
              <ul>
                {
                  o.ORDERDETAIL.map((detail,index) => {
                    return (<li key={`Detail:${o.orderId}-${index}`}>
                      {`${detail.PRODUCT.title} - ${detail.quantity}`}
                    </li>)
                  })
                }
              </ul>
            </li>)
          })
        }
      </ul>
    </div>
  </div>)
}
export default withPageAuthRequired(CartList);