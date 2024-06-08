import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { validate } from "../../shared/util/validation";
import { IProduct } from "../../shared/api/types/product";

interface Field {
  value: string;
  errMsg: string;
  isValid: boolean;
}

export interface IProductInputState {
  // base info
  statusNm: {
    value: "판매중" | "재고없음" | "영구삭제";
    errMsg: string;
    isValid: boolean;
  };
  productNm: Field;
  platformNm: Field;
  category: {
    value: "도시락" | "샐러드" | "닭가슴살" | "영양간식" | "과자" | "음료";
    errMsg: string;
    isValid: boolean;
  };
  subCategory: Field;
  price: Field;
  shippingPrice: Field;
  freeShippingPrice: Field;
  freeShippingYn: Field;
  detailLink1: Field;
  detailLink2: Field;
  detailLink3: Field;
  detailLink4: Field;
  detailLink5: Field;

  // nutrition info
  content: Field;
  calorie: Field;
  sodium: Field;
  carb: Field;
  sugar: Field;
  fiber: Field;
  fat: Field;
  transFat: Field;
  saturatedFat: Field;
  protein: Field;
  cholesterol: Field;
}

const initialFieldFalse: Field = {
  value: "",
  errMsg: "",
  isValid: false,
};

const initialFieldTrue: Field = {
  value: "",
  errMsg: "",
  isValid: true,
};

const initialState: IProductInputState = {
  statusNm: {
    value: "판매중",
    errMsg: "",
    isValid: true,
  },
  productNm: initialFieldFalse,
  platformNm: initialFieldFalse,
  category: { value: "도시락", errMsg: "", isValid: true },
  subCategory: initialFieldFalse,
  price: initialFieldFalse,
  shippingPrice: initialFieldFalse,
  freeShippingPrice: initialFieldFalse,
  freeShippingYn: initialFieldFalse,
  detailLink1: initialFieldTrue,
  detailLink2: initialFieldTrue,
  detailLink3: initialFieldTrue,
  detailLink4: initialFieldTrue,
  detailLink5: initialFieldTrue,
  content: initialFieldFalse,
  calorie: initialFieldFalse,
  sodium: initialFieldFalse,
  carb: initialFieldFalse,
  sugar: initialFieldFalse,
  fiber: initialFieldFalse,
  fat: initialFieldFalse,
  transFat: initialFieldFalse,
  saturatedFat: initialFieldFalse,
  protein: initialFieldFalse,
  cholesterol: initialFieldFalse,
};

const productInputSlice = createSlice({
  name: "productInput",
  initialState,
  reducers: {
    loadProduct: (state, action: PayloadAction<IProduct>) => {
      const loadList = Object.keys(action.payload) as Array<
        keyof IProductInputState
      >;
      loadList.forEach((key) => {
        // set value
        state[key].value = action.payload[key];

        // validation
        const { errMsg, isValid } = validate[key]?.(action.payload[key]) || {
          errMsg: "",
          isValid: true,
        };
        state[key].errMsg = errMsg;
        state[key].isValid = isValid;
      });
    },
    setValue: (
      state,
      action: PayloadAction<{ key: keyof IProductInputState; value: string }>
    ) => {
      const { key, value } = action.payload;
      if (!validate[key]) {
        console.log("no validation function for this key");
        state[key].value = value;
        state[key].errMsg = "";
        state[key].isValid = true;
        return;
      }
      const { errMsg, isValid } = validate[key]?.(value) || {
        errMsg: "",
        isValid: true,
      };

      state[key].value = value;
      state[key].errMsg = errMsg;
      state[key].isValid = isValid;
    },
    resetProductInput: () => {
      return initialState;
    },
  },
});

export const { resetProductInput, setValue } = productInputSlice.actions;

export default productInputSlice.reducer;
