import { USER } from "@prisma/client";
import { createRef, FormEvent, useState } from "react";
import { ShopStatsRespond } from "../../pages/api/admin/ShopStats";
import styles from "/styles/admin/admin.module.css";
import { ToastContainer, toast } from "react-toastify";

export default function ShopStats() {
  const shopIdInputRef = createRef<HTMLInputElement>();
  const [status, setShopStat] = useState<ShopStatsRespond>();
  const [shopIdList, setShopList] = useState<{ shopId: number, shopName: string }[]>([]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Fetching shop statistic");

    if (!shopIdInputRef.current) {
      return;
    }
    const fetchData = await fetch("/api/admin/ShopStats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shopId: shopIdInputRef.current.valueAsNumber
      })
    })
    try {
      const shopStats: ShopStatsRespond = await fetchData.json();
      if (!shopStats) {
        throw ("is null");
      }
      setShopStat(shopStats);
      toast.success(`Shop found ${shopStats?.shopName}`);

    } catch (error) {
      console.log(error);
      toast.error("Shop id not found");
    }
  }

  const getShopIdList = async () => {
    toast.info("Refreshing shop list");

    const fetchData = await fetch("/api/admin/ShopStats");
    try {
      const shopList = await fetchData.json();
      if(shopList){
        setShopList(shopList);
        toast.success("Shop list fetch success");
        return;
      }
    } catch (error) {
      console.log(error);
    }
    toast.error("Failed to fetch shop list")

  }

  const selectShop = (shopId: number) => {
    if (shopIdInputRef.current) {
      shopIdInputRef.current.valueAsNumber = shopId;
    }
  }

  return (<div className={styles["s2h_admin_tab_display_wrapper"]}>

    <ul className={styles["s2h_admin_tab_option"]}>
      <li onClick={getShopIdList}>{"REFRESH"}</li>
      {
        shopIdList.map((shop, id) => {
          return (<li key={`shop${id}`} onClick={()=>{selectShop(shop.shopId)}}>
            {`Id:${shop.shopId} - Name:${shop.shopName}`}
          </li>)
        })
      }
    </ul>
    <section className={styles["s2h_admin_tab_display"]}>
      <form onSubmit={handleSearch}>
        <label>{"Shop Id: "}<input ref={shopIdInputRef} type={"number"} required></input></label>
        <input type={"submit"} value={"Search"}></input>
      </form>
      <section>
        <h3>{`Shop id: ${status?.shopId}-Shop Name:${status?.shopName}`}</h3>
        <h3>{`Selling total: ${status?._count.productId} product(s) - With total amount: ${status?._sum.quantity}`}</h3>
        <h3>
          {`Total order: ${status?._count.orderId} - With total revenue: ${(typeof status?._sum.bill === "string") ? "0" : status?._sum.bill?.toLocaleString("ko-KR", { style: "currency", currency: "VND" })}`
          }
        </h3>
      </section>
    </section>
  </div>)
}