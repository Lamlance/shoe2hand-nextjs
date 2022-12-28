import { useStore } from '@nanostores/react';
import { useRouter } from 'next/router'
import React, { createRef, useRef, useState } from 'react';
import { isCartOpen } from '../../helper/CartStore';
import ShopLayout from '../../components/layouts/ShopLayout';
import ShopCart from '../../components/ShopCart';
import ShopDisplay from '../../components/Buyer/ShopDisplay';
import styles from "/styles/Search.module.css"
import { BRAND, PRODUCT } from '@prisma/client';
import ShopItem from '../../components/Buyer/ShopItem';

interface SearchProps{
  shopId?:number
}

interface SearchData{
  page?: number,
  min?: number,
  max?: number,
  brandId?: number,
  shopId?: number,
  name?:string,
  priceSort?: "asc" | "desc"
}

const brand = ({shopId}:SearchProps) => {
  const router = useRouter();
  const { brandName } = router.query;
  const $isCartOpen = useStore(isCartOpen);
  const [products, setProducts] = useState<PRODUCT[]>([]);
  const [brands, setBrands] = useState<BRAND[]>([]);

  const searchData = useRef<SearchData>({});

  const minRef = createRef<HTMLInputElement>();
  const maxRef = createRef<HTMLInputElement>();
  const brandRef = createRef<HTMLSelectElement>();

  const fetchSearch = async () => {
    const fetchData = await fetch("/api/products",{
      method:"POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        ...searchData.current
      })
    })

    try {
      const data = await fetchData.json();
      console.log(data);
      setProducts(data);
    } catch (error) {}

  }

  const handleBrand = ()=>{
    if(!brandRef || !brandRef.current){
      return;
    }
    const brandId = Number.parseInt(brandRef.current.value);
    if(isNaN(brandId)){
      return;
    }

    searchData.current = {
      ...searchData.current,
      brandId: brandId
    }
  }

  const handleMin = ()=>{
    if(!minRef || !minRef.current || isNaN(minRef.current.valueAsNumber)){
      return;
    }
    searchData.current = {
      ...searchData.current,
      min: minRef.current.valueAsNumber
    }
  }

  const handleMax = ()=>{
    if(!maxRef || !maxRef.current || isNaN(maxRef.current.valueAsNumber)){
      return;
    }
    searchData.current = {
      ...searchData.current,
      max: maxRef.current.valueAsNumber
    }
  }

  return (<ShopLayout>
    <div className={styles["s2h_search_display"]}>
      <div style={{ gridArea: "products" }}>
        <p>{brandName ? `Product of brand ${brandName}` : null}</p>
        <ul className={styles["s2h_search_display_product"]}>
          {
            products.map((item, index) => {
              return (<li key={index}>
                <ShopItem
                  id={item.productId} title={item.title} price={item.price}
                  shopId={item.shopId} quantity={item.quantity}
                />
              </li>)
            })
          }
        </ul>
      </div>
      <div className={styles["s2h_filter_wrape"]}>
        <form onSubmit={(e)=>{e.preventDefault();fetchSearch()}}>
          <input type={"submit"} value="Filter"></input>

          <label htmlFor='min-price'>Giá thấp nhất</label>
          <input onInput={handleMin} ref={minRef} type={"number"} id="min-price" min={0}></input>

          <label htmlFor='max-price'>Giá cao nhất</label>
          <input onInput={handleMax} ref={maxRef} type={"number"} id="max-price" min={0}></input>

          <label htmlFor='brand-filter'>Brand</label>
          <select onInput={handleBrand} ref={brandRef} id='brand-filter'>
            {
              brands.map((brand, item) => {
                return (<option value={brand.brandId} key={`brand${item}`}>{brand.brandName}</option>)
              })
            }
          </select>
        </form>
      </div>
    </div>
  </ShopLayout>)
}
export default brand;
