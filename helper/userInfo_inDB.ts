import { atom } from "nanostores";

interface userData {
  userId:number,
  shopId?:number
}
export const userInfo_inDB = atom<userData | null>(null);