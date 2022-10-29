import { atom, map } from "nanostores";
import type { ShopItemData } from "./ShopItem";

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
};
export const isCartOpen = atom(false);
export const cartItems = map<Record<string, CartItem>>({});

export type ItemDisplayInfo = Pick<CartItem, "name" | "id">;

export function addCartItem({ name, id }: ItemDisplayInfo) {
  isCartOpen.set(true);
  const existingEntry = cartItems.get()[name];
  if (existingEntry) {
    cartItems.setKey(name, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, { id, name, quantity: 1 });
  }
}
