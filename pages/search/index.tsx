import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";
import React from "react";
import { isCartOpen } from "../../components/CartStore";
import ShopLayout from "../../components/layouts/ShopLayout";
import ShopCart from "../../components/ShopCart";
import ShopDisplay from "../../components/ShopDisplay";
import styles from "/styles/Search.module.css";

const brand = () => {
  const router = useRouter();
  const { brandName } = router.query;
  const $isCartOpen = useStore(isCartOpen);

  return (
    <ShopLayout>
      <div className={styles["s2h_search_display"]}>
        <div style={{ gridArea: "products" }}>
          <p>{brandName ? `Product of brand ${brandName}` : null}</p>
          <ShopDisplay />
        </div>
      </div>
      {$isCartOpen ? <ShopCart /> : null}
    </ShopLayout>
  );
};
export default brand;
