// Common code

import { ICode } from "../api/types/code";

// SP012001 => 판매중 | SP012002 => 재고없음 | SP012003 => 영구삭제
export const statusCdNmByCd: {
  [key: string]: "판매중" | "재고없음" | "영구삭제";
} = {
  SP012001: "판매중",
  SP012002: "재고없음",
  SP012003: "영구삭제",
};

export const statusCdByBtnNm: { [key: string]: string } = {
  total: "",
  onSale: "SP012001",
  noStock: "SP012002",
  deleted: "SP012003",
};

export const categoryCdByBtnNm: { [key: string]: string } = {
  total: "",
  dosirak: "CG001",
  salad: "CG003",
  chicken: "CG002",
  snack: "CG004",
  chips: "CG005",
  beverage: "CG006",
};

export const categoryCdNmByCd: {
  [key: string]:
    | "도시락"
    | "닭가슴살"
    | "샐러드"
    | "영양간식"
    | "과자"
    | "음료";
} = {
  CG001: "도시락",
  CG002: "닭가슴살",
  CG003: "샐러드",
  CG004: "영양간식",
  CG005: "과자",
  CG006: "음료",
};
