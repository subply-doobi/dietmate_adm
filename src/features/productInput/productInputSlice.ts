import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { validate } from "../../shared/util/validation";
import { IProduct, IProductDetail } from "../../shared/api/types/product";

interface Field {
  value: string;
  errMsg: string;
  isValid: boolean;
}

export interface IProductInputState {
  // base info
  status: Field;
  productNm: Field;
  platformNm: Field;
  category: Field;
  subCategory: Field;
  price: Field;
  shippingPrice: Field;
  freeShippingPrice: Field;
  freeShippingYn: Field;
  link1: Field;
  link2: Field;
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
  status: {
    value: "SP012001",
    errMsg: "",
    isValid: true,
  },
  productNm: initialFieldFalse,
  platformNm: initialFieldFalse,
  category: { value: "CG001", errMsg: "", isValid: true },
  subCategory: initialFieldFalse,
  price: initialFieldFalse,
  shippingPrice: initialFieldFalse,
  freeShippingPrice: initialFieldFalse,
  freeShippingYn: initialFieldFalse,
  link1: initialFieldTrue,
  link2: initialFieldTrue,
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

export type ILoadActionObj = {
  [K in keyof IProductInputState]: IProductInputState[K]["value"];
};
interface ILoadAction {
  product: IProduct;
  productDetail: IProductDetail[];
}
const productInputSlice = createSlice({
  name: "productInput",
  initialState,
  reducers: {
    initializeProductInput: () => initialState,
    loadProduct: (state, action: PayloadAction<ILoadAction>) => {
      const p = action.payload.product;
      const d = action.payload.productDetail;
      d.length > 5 && d.splice(5, d.length - 5);
      const detailLinks: {
        [key: string]: string;
      } = {};
      for (let i = 0; i < 5; i++) {
        detailLinks[`detailLink${i + 1}`] = d[i]?.imageLink || "";
      }
      const dataToLoad: Partial<ILoadActionObj> = {
        // baseInfo
        status: p.statusCd,
        productNm: p.productNm,
        platformNm: p.platformNm,
        category: p.categoryCd,
        subCategory: p.subCategoryCd,
        price: p.price,
        shippingPrice: p.shippingPrice,
        freeShippingYn: p.freeShippingYn,
        freeShippingPrice: p.freeShippingPrice,
        link1: p.link1,
        link2: p.link2,
        //nutrInfo
        content: String(parseFloat(p.servingSize)),
        calorie: String(parseFloat(p.calorie)),
        sodium: String(parseFloat(p.sodium)),
        carb: String(parseFloat(p.carb)),
        sugar: String(parseFloat(p.sugar)),
        fiber: String(parseFloat(p.fiber)),
        fat: String(parseFloat(p.fat)),
        transFat: String(parseFloat(p.transFat)),
        saturatedFat: String(parseFloat(p.saturatedFat)),
        protein: String(parseFloat(p.protein)),
        cholesterol: String(parseFloat(p.cholesterol)),
        ...detailLinks,
      };
      const loadList = Object.keys(dataToLoad) as (keyof IProductInputState)[];
      loadList.forEach((key) => {
        // set value
        state[key].value = dataToLoad[key] || "";

        // validation
        const { errMsg, isValid } = validate[key]?.(dataToLoad[key] || "") || {
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

      if (key === "category") {
        state.subCategory.value = "";
        const v = validate["subCategory"]?.("");
        state.subCategory.errMsg = v?.errMsg || "";
        state.subCategory.isValid = v?.isValid || false;
      }
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

export const {
  loadProduct,
  resetProductInput,
  setValue,
  initializeProductInput,
} = productInputSlice.actions;

export default productInputSlice.reducer;
