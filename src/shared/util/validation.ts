import { IProductInputState } from "../../features/productInput/productInputSlice";

export const validate: {
  [K in keyof IProductInputState]?: (value: string) => {
    isValid: boolean;
    errMsg: string;
  };
} = {
  statusNm: (value) => {
    if (value === "판매중" || value === "재고없음") {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "판매상태를 선택해주세요" };
  },
  productNm: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "상품명을 입력해주세요" };
  },
  platformNm: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "플랫폼을 입력해주세요" };
  },
  category: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "카테고리를 선택해주세요" };
  },
  subCategory: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "서브카테고리를 입력해주세요" };
  },
  price: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "가격을 입력해주세요" };
  },
  shippingPrice: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "배송비를 입력해주세요" };
  },
  freeShippingPrice: (value) => {
    if (value.length > 0) {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "무료배송기준금액을 입력해주세요" };
  },
  freeShippingYn: (value) => {
    if (value === "Y" || value === "N") {
      return { isValid: true, errMsg: "" };
    }
    return { isValid: false, errMsg: "무료배송여부를 선택해주세요" };
  },
};
