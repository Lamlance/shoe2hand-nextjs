import { useStore } from "@nanostores/react";
import { atom, map } from "nanostores";

export type ProductInfo = {
  id: number;
  title: string;
  quantity: number;
  price: number 
}

export type CartItem = {
  shopId: number;
  shopName:string;
  products: ProductInfo[]
};
export const isCartOpen = atom(false);
export const cartItems = map<Record<number, CartItem>>({});

export type ItemDisplayInfo = Pick<CartItem, "shopId" | "products">;

export function addCartItem(shopId: number,shopName:string, productData: ProductInfo, replaceFlag: boolean = false) {
  isCartOpen.set(true);
  const existingEntry = cartItems.get()[shopId];
  if (existingEntry) {
    const product = existingEntry.products;
    let editFlag = false;

    for (let index = 0; index < product.length; index++) {
      if (product[index].id == productData.id) {
        product[index].quantity = (replaceFlag) ? productData.quantity : (product[index].quantity + productData.quantity)
        editFlag = true;
        break;
      }
    }

    if (!editFlag) {
      product.push(productData);
    }

    cartItems.setKey(shopId, {
      shopId: shopId,
      shopName:shopName,
      products: product
    })

    return;
  }
  cartItems.setKey(shopId, {
    shopId: shopId,
    shopName:shopName,
    products: [productData]
  });
}

export function deleteCartItemByShopId(shopId: number) {
  if(cartItems.get()[shopId]){
    const newCart = cartItems.get();
    delete newCart[shopId];
    cartItems.set( JSON.parse(JSON.stringify(newCart)) );
  }
}

export function deleteProduct(shopId:number,productId:number){
  if(!cartItems.get()[shopId]){
    return;
  }

  const newProducts:ProductInfo[] = [];
  cartItems.get()[shopId].products.forEach((item)=>{
    if(item.id !== productId){
      newProducts.push(item);
    }
  })
  console.log(newProducts);
  if(newProducts.length === 0){
    deleteCartItemByShopId(shopId);
    return;
  }
  cartItems.setKey(shopId,{
    shopId: shopId,
    shopName:cartItems.get()[shopId].shopName,
    products: newProducts
  })
}