import { DeliverStats, ORDER, PRODUCT } from "@prisma/client";
import { createRef, FormEvent, useRef, useState } from "react";
import { SellerOrderGET,SellerOrderPUT } from "../../pages/api/seller/order";
import { ShopData } from "./ShoeOption";
import styles from "/styles/seller/ShoeOption.module.css"

function OrderOption({ userData, shopData }: ShopData) {
  const [orders, setOrders] = useState<SellerOrderGET[]>([]);
  const [selectedOrder, setSelected] = useState<SellerOrderGET>();
  const isExecuting = useRef<boolean>(false);
  const formRef = createRef<HTMLFormElement>();

  if (!userData || !shopData) {
    return (<h1>LOADING ....</h1>)
  }

  const RefreshOrderData = async () => {
    const fetchData = await fetch(`/api/seller/order?shopId=${shopData.shopId}`);
    try {
      const data: SellerOrderGET[] = await fetchData.json();
      console.log(data);
      setOrders(data);
    } catch (error) { console.log(error) }
  }

  const selectOrderData = (data: SellerOrderGET) => {
    setSelected(data);
  }

  const sumPrice = (data: SellerOrderGET | undefined) => {
    if (!data) {
      return 0;
    }
    let sum = 0;
    data.ORDERDETAIL.forEach((detail) => {
      sum += detail.quantity * detail.PRODUCT.price
    })
    return sum;
  }

  const changeStatusList = (data: SellerOrderGET | undefined): DeliverStats[] => {
    if (!data) {
      return []
    }
    const currStatus = data.deliveringStatus;

    if (currStatus === "WAITING") {
      return ["CONFIRMED", "DELIVERING"];
    }

    if (currStatus === "CONFIRMED" || currStatus === "DELIVERING") {
      return ["DELIVERED"]
    }

    return [];
  }

  const updateProductData = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!selectedOrder || !formRef.current){
      return;
    }
    const inputs = formRef.current?.elements;
    if (!inputs) {
      return;
    }
    const status = (inputs.namedItem("status") as HTMLInputElement).value;
    const changedData = selectedOrder;
    const fetchData = await fetch("/api/seller/order",{
      method: "PUT",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        shopId: shopData.shopId,
        status: status,
        orderId: changedData.orderId,
      })
    });
    try {
      const updateData:ORDER = await fetchData.json();
      let currOrders = orders;
      for (let index = 0; index < currOrders.length; index++) {
        if(currOrders[index].orderId === updateData.orderId){
          currOrders[index].deliveringStatus = updateData.deliveringStatus;
          setSelected(currOrders[index]);
          break;
        }
      }
      setOrders(currOrders);
    } catch (error) {}
  }

  return (<div className={styles["s2h_seller_shoe_option_wrap"]}>
    <ul className={styles["s2h_seller_shoe_option_select"]}>
      <li onClick={(event) => { RefreshOrderData() }}>REFRESH</li>
      {
        orders.map((order, index) => {
          return (<li onClick={() => { selectOrderData(order) }}>
            {order.deliveringStatus}-From:{order.USER.userName}
          </li>)
        })
      }
    </ul>

    <form ref={formRef} className={styles["s2h_seller_order_option_form"]} onSubmit={(e) => { updateProductData(e)}}>
      <ul>
        <li>
          <div>
            <p>Tên sản phẩm</p>
            <p>Số lượng</p>
            <p>Đơn giá</p>
          </div>
        </li>
        {
          selectedOrder?.ORDERDETAIL.map((detail, index) => {
            return (<li key={`Detail:${index}`}>
              <div>
                <p>{detail.PRODUCT.title}</p>
                <p>{detail.quantity}</p>
                <p>{detail.PRODUCT.price}</p>
              </div>
            </li>)
          })
        }
        <li>
          <div>
            <p>Tổng</p>
            <p>{selectedOrder?.ORDERDETAIL.length}</p>
            <p>{sumPrice(selectedOrder)}</p>
          </div>
        </li>
        <li>
          <select name="status" id="cars" required>
            <option value="">Select Update Status</option>
            {
              changeStatusList(selectedOrder).map((item)=>{
                return(<option value={item}>{item}</option>)
              })
            }
          </select>
        </li>
      </ul>
      <input type={"submit"} value={"Submit"}></input>
    </form>

  </div>)
}

export default OrderOption