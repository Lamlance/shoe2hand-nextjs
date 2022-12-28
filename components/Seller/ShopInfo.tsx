import { SHOP, USER } from "@prisma/client";
import { createRef, FormEvent } from "react";

interface ShopInfoProps{
  userData: USER | null,
  shopData: SHOP | null,
  setShopDataFunc: Function
}

function ShopInfo({userData,setShopDataFunc,shopData}:ShopInfoProps){
  const formRef = createRef<HTMLFormElement>();

  if(!userData || !shopData){
    return (<h1>Loading...</h1>)
  }

  const updateShopName =async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!formRef.current || !formRef.current.elements){
      return;
    }
    const inputs = formRef.current.elements;
    const shopName = (inputs.namedItem("name") as HTMLInputElement).value;

    const fetchData = await fetch("/api/seller/shop",{
      method: "PUT",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({
        shopId: shopData.shopId,
        shopName: shopName
      })
    })

    try {
      const newShopData = await fetchData.json();
      setShopDataFunc(newShopData);
      console.log(newShopData);
    } catch (error) {}
  }

  return(<div>
    <form ref={formRef} onSubmit={(e)=>{updateShopName(e)}}>
      <label>Shop Name
        <input type="text" name="name" defaultValue={shopData.shopName} />
      </label>
      <input type={"submit"} value={"ChangeName"}></input>
    </form>
  </div>)
}

export default ShopInfo;