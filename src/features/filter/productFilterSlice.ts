import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { store } from "../../app/reduxStore/reduxStore";

export interface IProductFilterState {
  productStatus: {
    total: boolean;
    onSale: boolean;
    noStock: boolean;
    deleted: boolean;
  };
  category: {
    total: boolean;
    dosirak: boolean;
    salad: boolean;
    chicken: boolean;
    snack: boolean;
    chips: boolean;
    beverage: boolean;
  };
  platformNm: string;
  search: string;
}

const initialState = {
  productStatus: {
    total: true,
    onSale: false,
    noStock: false,
    deleted: false,
  },
  category: {
    total: true,
    dosirak: false,
    salad: false,
    chicken: false,
    snack: false,
    chips: false,
    beverage: false,
  },
  platformNm: "",
  search: "",
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    toggleProductStatusBtn: (
      state,
      action: PayloadAction<keyof IProductFilterState["productStatus"] | string>
    ) => {
      const btn = action.payload;

      // if (btn === 'total' && state.productStatus.total) return;
      // if (btn === 'total' && !state.productStatus.total) {
      //   const productStatusArr = Object.keys(
      //     initialState.productStatus,
      //   ) as Array<keyof IProductFilterState['productStatus']>;
      //   productStatusArr.forEach(productStatus => {
      //     productStatus !== 'total' &&
      //       (state.productStatus[productStatus] = false);
      //   });
      // }
      // btn !== 'total' && (state.productStatus.total = false);
      const productStatusArr = Object.keys(initialState.productStatus) as Array<
        keyof IProductFilterState["productStatus"]
      >;
      productStatusArr.forEach((productStatus) => {
        productStatus !== btn
          ? (state.productStatus[productStatus] = false)
          : (state.productStatus[productStatus] =
              !state.productStatus[productStatus]);
      });
      productStatusArr.every((productStatus) => {
        return state.productStatus[productStatus] === false;
      }) && (state.productStatus.total = true);
    },
    toggleCategoryBtn: (
      state,
      action: PayloadAction<keyof IProductFilterState["category"] | string>
    ) => {
      const btn = action.payload;

      // if (btn === "total" && state.category.total) return;
      // if (btn === "total" && !state.category.total) {
      //   const categoryArr = Object.keys(initialState.category) as Array<
      //     keyof IProductFilterState["category"]
      //   >;
      //   categoryArr.forEach((category) => {
      //     category !== "total" && (state.category[category] = false);
      //   });
      // }
      // btn !== "total" && (state.category.total = false);
      // state.category[btn] = !state.category[btn];
      const categoryArr = Object.keys(initialState.category) as Array<
        keyof IProductFilterState["category"]
      >;
      categoryArr.forEach((category) => {
        category !== btn
          ? (state.category[category] = false)
          : (state.category[category] = !state.category[category]);
      });
      categoryArr.every((category) => {
        return state.category[category] === false;
      }) && (state.category.total = true);
    },
    togglePlatformNmBtn: (state, action: PayloadAction<string>) => {
      state.platformNm === action.payload
        ? (state.platformNm = "")
        : (state.platformNm = action.payload);
    },
    setProductSearchText: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  toggleProductStatusBtn,
  toggleCategoryBtn,
  togglePlatformNmBtn,
  setProductSearchText,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;
