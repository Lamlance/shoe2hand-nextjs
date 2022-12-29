import { BRAND, PRODUCT, SHOP, USER } from "@prisma/client";
import { createRef, FormEvent, useEffect, useRef, useState } from "react";
import styles from "/styles/seller/ShoeOption.module.css"

import {
  SellerProductAPI_POST, SellerProductAPI_GET,
  SellerProductAPI_PUT, SellerProductAPI_DELETE
} from "../../pages/api/seller/product";


export interface ShopData {
  userData: USER | null,
  shopData: SHOP | null
}

function ShoeOption({ userData, shopData }: ShopData) {
  const [products, setProduct] = useState<PRODUCT[]>([]);
  const [brands, setBrands] = useState<BRAND[]>([]);
  const selectId = useRef<number>(-1);
  const isExecuting = useRef<boolean>(false);

  const formRef = createRef<HTMLFormElement>();
  const deleteCheck = createRef<HTMLInputElement>();
  const ulRef = createRef<HTMLUListElement>();

  useEffect(() => {
    fetch("/api/brands").then((data) => (data.json().then((brandsData: BRAND[]) => {
      setBrands(brandsData);
    })))
  }, [])

  if (!userData || !shopData) {
    return (<h1>LOADING ....</h1>)
  }

  const userId = userData.userId;
  const shopId = shopData.shopId;

  const handleRefreshData = async () => {
    if (isExecuting.current) {
      return;
    }

    isExecuting.current = true;
    switchFormInput(true);
    const rawData = await fetch(`/api/seller/product?shopId=${shopId}`);
    try {
      const data = await rawData.json();
      console.log(data)
      setProduct(data.data);
    } catch (error) { console.log(error) }
    switchFormInput(false);

    isExecuting.current = false;
  }

  const hadleFormSubmitPUT = async (title: string, quantity: number, price: number, desc: string) => {
    if (!products || !products[selectId.current]) {
      return
    }
    const fetchResult = await fetch("/api/seller/product", {
      method: "PUT",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        title: title,
        quantity: quantity,
        price: price,
        hide: false,
        desc: desc,
        shopId: shopId,
        productId: products[selectId.current].productId,
        selectId: selectId.current
      })
    });
    try {
      const newData: SellerProductAPI_PUT = await fetchResult.json();
      const oldState = (products) ? [...products] : null

      if (oldState == null || (typeof newData.data === "string")) {
        switchFormInput(false);
        return;
      }
      const productId = newData.data.productId;
      const data = newData.data;
      oldState.forEach((item, index) => {
        if (item.productId === productId) {
          oldState[index] = data;
        }
      })
      setProduct(oldState);
    } catch (error) { console.log(error) }
    return;
  }

  const hadleFormSubmitPOST = async (title: string, quantity: number, price: number, desc: string, brandId: number) => {
    const fetchResult = await fetch("/api/seller/product", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        title: title,
        quantity: quantity,
        price: price,
        hide: false,
        desc: desc,
        shopId: shopId,
        brandId: brandId
      })
    });
    try {
      const newData: SellerProductAPI_POST = await fetchResult.json();
      if (typeof newData.data === "string") {
        switchFormInput(false);
        return;
      }

      setProduct([
        newData.data,
        ...((products) ? products : [])
      ])
    } catch (error) { console.log(error, fetchResult) }
  }

  const handelForSubmitDELETE = async () => {
    if (!products || !products[selectId.current]) {
      return
    }
    const fetchResult = await fetch("/api/seller/product", {
      method: "DELETE",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        shopId: shopId,
        productId: products[selectId.current].productId,
        selectId: selectId
      })
    });
    try {
      const deletedData: SellerProductAPI_DELETE = await fetchResult.json();
      const oldState = (products) ? [...products] : null

      if (oldState == null || (typeof deletedData.data === "string")) {
        switchFormInput(false);
        return;
      }

      const productId = deletedData.data.productId;

      const newData = oldState.filter((item) => {
        return (item.productId !== productId)
      });
      setProduct(newData);

    } catch (error) { console.log(error) }
  }

  const hadleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    isExecuting.current = true;

    event.preventDefault();
    switchFormInput(true);

    const inputs = formRef.current?.elements;
    if (!inputs) {
      return;
    }
    const title = (inputs.namedItem("title") as HTMLInputElement).value;
    const quantity = (inputs.namedItem("quantity") as HTMLInputElement).valueAsNumber;
    const price = (inputs.namedItem("price") as HTMLInputElement).valueAsNumber;
    const hide = (inputs.namedItem("hide") as HTMLInputElement).value;
    const brandId = Number.parseInt((inputs.namedItem("brand") as HTMLSelectElement).value);
    console.log(inputs);

    const desc = (inputs.namedItem("desc") as HTMLInputElement).value;
    const delCheck = deleteCheck.current?.checked;

    //DELETE DATA
    if (delCheck) {
      handelForSubmitDELETE();
      switchFormInput(false);
      isExecuting.current = false;
      return;
    }

    //DATA CHECK
    if (!(title && quantity && price)) {
      switchFormInput(false);
      isExecuting.current = false;
      return;
    }

    //UPDATE DATA
    if (selectId.current != -1) {
      hadleFormSubmitPUT(title, quantity, price, desc);
      switchFormInput(false);
      isExecuting.current = false;
      return
    }

    //CREATE DATA
    console.log(brandId)
    hadleFormSubmitPOST(title, quantity, price, desc, brandId);
    switchFormInput(false);
    isExecuting.current = false;

  }

  const switchFormInput = async (disable: boolean = true) => {
    const inputs = formRef.current?.elements;
    if (!inputs) {
      return;
    }
    (inputs.namedItem("title") as HTMLInputElement).disabled = disable;
    (inputs.namedItem("quantity") as HTMLInputElement).disabled = disable;
    (inputs.namedItem("price") as HTMLInputElement).disabled = disable;
    (inputs.namedItem("hide") as HTMLInputElement).disabled = disable;
    (inputs.namedItem("desc") as HTMLInputElement).disabled = disable;
    (inputs.namedItem("enter") as HTMLInputElement).disabled = disable;

  }

  const handelDeleteCheck = () => {
    const disable = deleteCheck.current?.checked;
    switchFormInput(disable);
  }

  const handelProductSelect = (pIndex: number) => {
    const inputs = formRef.current?.elements;
    if (!inputs || !products || !products[pIndex]) {
      return;
    }

    const productData = products[pIndex];
    selectId.current = pIndex;

    (inputs.namedItem("title") as HTMLInputElement).value = productData.title;
    (inputs.namedItem("quantity") as HTMLInputElement).valueAsNumber = productData.quantity;
    (inputs.namedItem("price") as HTMLInputElement).valueAsNumber = productData.price;
    (inputs.namedItem("desc") as HTMLInputElement).value = productData.description ? productData.description : "";
    (inputs.namedItem("brand") as HTMLSelectElement).options.selectedIndex = 0
  }

  const setColorLi = (id: number) => {
    if (!ulRef || !ulRef.current) {
      return;
    }

    const liSelect = (ulRef.current.querySelectorAll(".js-shoe-select") as NodeListOf<HTMLLIElement>);
    liSelect.forEach((li, index) => {
      li.style.backgroundColor = ((id === index) ? "#56b3ac" : "");
    })
  }

  const clearForm = () => {
    const inputs = formRef.current?.elements;
    if (!inputs || !products) {
      return;
    }
    (inputs.namedItem("title") as HTMLInputElement).value = "";
    (inputs.namedItem("quantity") as HTMLInputElement).valueAsNumber = NaN;
    (inputs.namedItem("price") as HTMLInputElement).valueAsNumber = NaN;
    (inputs.namedItem("desc") as HTMLInputElement).value = "";
    (inputs.namedItem("brand") as HTMLSelectElement).options.selectedIndex = 0
  }

  return (<div className={styles["s2h_seller_shoe_option_wrap"]}>
    <ul ref={ulRef} className={styles["s2h_seller_shoe_option_select"]}>
      <li className={"js-shoe-select"} onClick={(event) => { handleRefreshData(); setColorLi(0) }}>
        REFRESH
      </li>
      <li className={"js-shoe-select"} onClick={() => { selectId.current = -1; setColorLi(1); clearForm() }}>
        ADD NEW SHOES
      </li>
      {products?.map((item, index) => {
        return (
          <li className={"js-shoe-select"} key={index}
            onClick={() => { handelProductSelect(index); setColorLi(index + 2) }}>
            {item.title}
          </li>
        )
      })}
    </ul>

    <form ref={formRef} className={styles["s2h_seller_shoe_option_form"]} onSubmit={(e) => { hadleFormSubmit(e) }}>
      <label htmlFor="title">Product Title:</label>
      <input id="title" name="title" type={"text"} placeholder="Product Title" required></input>

      <label htmlFor="quantity">Quantity:</label>
      <input id="quantity" name="quantity" type={"number"} placeholder="Quantity" required></input>

      <label htmlFor="price">Price:</label>
      <input id="price" name="price" type={"number"} placeholder="Price" required></input>

      <label htmlFor="hide">Hide product:</label>
      <input id="hide" type={"checkbox"} name="hide"></input>

      <label htmlFor="delete">Delete product:</label>
      <input ref={deleteCheck} id="delete" type={"checkbox"} name="delete" onInput={() => { handelDeleteCheck() }}></input>

      <label htmlFor="brandSelect">Brand</label>
      <select name="brand" id="brandSelect">
        {
          brands.map((brand, index) => {
            return (<option key={`brand:${index}`} value={brand.brandId}>
              {brand.brandName}
            </option>)
          })
        }
      </select>

      <textarea name="desc" rows={4} cols={12} placeholder="Product description"></textarea>
      <input name="enter" type="submit"></input>
    </form>

  </div>)
}

export default ShoeOption;