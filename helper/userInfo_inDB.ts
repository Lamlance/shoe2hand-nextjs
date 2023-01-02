import { SHOP, USER } from "@prisma/client";
import { atom } from "nanostores";

interface userData {
  user: USER,
  shop?: SHOP
}
export const userInfo_inDB = atom<userData | null>(null);