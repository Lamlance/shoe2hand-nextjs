import { SHOP, USER } from "@prisma/client";

interface ShopInfoProps{
  userData: USER | null,
  shopData: SHOP | null,
}

function ShopInfo({userData,shopData}:ShopInfoProps){

  if(!userData || !shopData){
    return (<h1>Loading...</h1>)
  }

  return(<div>
    <form>
      <label>Shop Name
        <input type="text" name="name" value={shopData.shopName} />
      </label>
    </form>
  </div>)
}

export default ShopInfo;