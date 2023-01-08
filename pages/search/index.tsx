import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";
import React, {
  createRef,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { isCartOpen } from "../../helper/CartStore";
import ShopLayout from "../../components/layouts/ShopLayout";
import ShopCart from "../../components/ShopCart";
import ShopDisplay from "../../components/Buyer/ShopDisplay";
import styles from "/styles/Search.module.css";
import { BRAND, PRODUCT } from "@prisma/client";
import ShopItem from "../../components/Buyer/ShopItem";
import { ProductRespond } from "../api/products";
import { handleQuery } from "../../helper/queryHelper";
import Image from "next/image";
import leftArrow from "/public/left-arrow.png";
import rightArrow from "/public/right-arrow.png";

interface SearchProps {
  shopId?: number;
}
// v do vscode m xam r :)), ong them cai class cho nay dc ko
interface SearchData {
  page?: number;
  min?: number;
  max?: number;
  brandId?: number;
  shopId?: number;
  name?: string;
  priceSort?: "asc" | "desc";
}

const brand = ({ shopId }: SearchProps) => {
  const router = useRouter();
  const $isCartOpen = useStore(isCartOpen);
  const [products, setProducts] = useState<ProductRespond[]>([]);
  const [brands, setBrands] = useState<BRAND[]>([]);
  const [page, setPage] = useState<number>(0);

  const searchData = useRef<SearchData>({});

  const minRef = createRef<HTMLInputElement>();
  const maxRef = createRef<HTMLInputElement>();
  const brandRef = createRef<HTMLSelectElement>();

  const fetchSearch = async (pageNum: number = 0) => {
    console.log();
    const fetchData = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...searchData.current,
        page: pageNum,
      }),
    });

    try {
      const data = await fetchData.json();
      console.log(data);
      setProducts(data);
    } catch (error) {}
  };
  const fetchBrands = async () => {
    const fetchData = await fetch("/api/brands");
    try {
      const brands = await fetchData.json();
      console.log("Brands", brands);
      if (brands) {
        setBrands(brands);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchBrands();
    console.log(router.query);
    const name = handleQuery(router.query.name);
    const shop = Number.parseInt(handleQuery(router.query.shop));
    if (!name && !shop) {
      return;
    }
    searchData.current = {
      ...(isNaN(shop) ? {} : { shopId: shop }),
      ...(name ? { name: name } : {}),
    };
    fetchSearch();
  }, []);

  const handleBrand = () => {
    if (!brandRef || !brandRef.current) {
      return;
    }
    const brandId = Number.parseInt(brandRef.current.value);
    if (isNaN(brandId)) {
      return;
    }

    searchData.current = {
      ...searchData.current,
      brandId: brandId,
    };
  };

  const handleMin = () => {
    if (!minRef || !minRef.current || isNaN(minRef.current.valueAsNumber)) {
      return;
    }
    searchData.current = {
      ...searchData.current,
      min: minRef.current.valueAsNumber,
    };
  };

  const handleMax = () => {
    if (!maxRef || !maxRef.current || isNaN(maxRef.current.valueAsNumber)) {
      return;
    }
    searchData.current = {
      ...searchData.current,
      max: maxRef.current.valueAsNumber,
    };
  };

  const handleSearchName = (
    event: FormEvent<HTMLFormElement>,
    search?: string
  ) => {
    event.preventDefault();
    console.log(search);
    if (search) {
      console.log(search);
      searchData.current = {
        ...searchData.current,
        name: search,
      };
    }
    fetchSearch();
  };

  const pageChange = (increase: boolean = true) => {
    if (!increase && page <= 0) {
      return;
    }
    setProducts([]);
    setPage(page + (increase ? 1 : -1));
    fetchSearch(page + (increase ? 1 : -1));
  };

  return (
    <ShopLayout navProps={{ submitSearchFunc: handleSearchName }}>
      <div className={styles["s2h_search_display"]}>
        <div style={{ gridArea: "products", padding: "1rem" }}>
          <ul className={styles["s2h_search_display_product"]}>
            {products.map((item, index) => {
              return (
                <li key={index}>
                  <ShopItem
                    id={item.productId}
                    title={item.title}
                    price={item.price}
                    shopId={item.shopId}
                    quantity={item.quantity}
                    shopName={item.SHOP.shopName}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles["s2h_filter_wrape"]}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchSearch();
            }}
          >
            <input type={"submit"} value="Filter"></input>

            <label htmlFor="min-price">Giá thấp nhất</label>
            <input
              onInput={handleMin}
              ref={minRef}
              type={"number"}
              id="min-price"
              min={0}
            ></input>

            <label htmlFor="max-price">Giá cao nhất</label>
            <input
              onInput={handleMax}
              ref={maxRef}
              type={"number"}
              id="max-price"
              min={0}
            ></input>

            <label htmlFor="brand-filter">Brand</label>
            <select onInput={handleBrand} ref={brandRef} id="brand-filter">
              {brands.map((brand, item) => {
                return (
                  <option value={brand.brandId} key={`brand${item}`}>
                    {brand.brandName}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      </div>
      <div
        className={styles["page_increase_decrease"]}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => {
            pageChange(false);
          }}
        >
          <Image src={leftArrow} alt="left arrow" className={styles[""]} />
        </button>
        <span
          style={{
            color: "#7fb6ff",
          }}
        >
          {page}
        </span>
        <button
          onClick={() => {
            pageChange(true);
          }}
        >
          <Image src={rightArrow} alt="right arrow" className={styles[""]} />
        </button>
      </div>
    </ShopLayout>
  );
};
export default brand;
