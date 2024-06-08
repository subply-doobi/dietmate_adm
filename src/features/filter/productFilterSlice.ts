import {PayloadAction, createSlice} from '@reduxjs/toolkit';

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
  platformNm: {
    total: boolean;
    포켓샐러드: boolean;
    바르닭: boolean;
    샐러드판다: boolean;
    다이어트메이트: boolean;
  };
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
  platformNm: {
    total: true,
    포켓샐러드: false,
    바르닭: false,
    샐러드판다: false,
    다이어트메이트: false,
  },
  search: '',
};

const productFilterSlice = createSlice({
  name: 'productFilter',
  initialState,
  reducers: {
    toggleProductStatusBtn: (
      state,
      action: PayloadAction<keyof IProductFilterState['productStatus']>,
    ) => {
      const btn = action.payload;

      if (btn === 'total' && state.productStatus.total) return;
      if (btn === 'total' && !state.productStatus.total) {
        const productStatusArr = Object.keys(
          initialState.productStatus,
        ) as Array<keyof IProductFilterState['productStatus']>;
        productStatusArr.forEach(productStatus => {
          productStatus !== 'total' &&
            (state.productStatus[productStatus] = false);
        });
      }
      btn !== 'total' && (state.productStatus.total = false);
      state.productStatus[btn] = !state.productStatus[btn];
    },
    toggleCategoryBtn: (
      state,
      action: PayloadAction<keyof IProductFilterState['category']>,
    ) => {
      const btn = action.payload;

      if (btn === 'total' && state.category.total) return;
      if (btn === 'total' && !state.category.total) {
        const categoryArr = Object.keys(initialState.category) as Array<
          keyof IProductFilterState['category']
        >;
        categoryArr.forEach(category => {
          category !== 'total' && (state.category[category] = false);
        });
      }
      btn !== 'total' && (state.category.total = false);
      state.category[btn] = !state.category[btn];
    },
    togglePlatformNmBtn: (
      state,
      action: PayloadAction<keyof IProductFilterState['platformNm']>,
    ) => {
      const btn = action.payload;

      if (btn === 'total' && state.platformNm.total) return;
      if (btn === 'total' && !state.platformNm.total) {
        const platformNmArr = Object.keys(initialState.platformNm) as Array<
          keyof IProductFilterState['platformNm']
        >;
        platformNmArr.forEach(platformNm => {
          platformNm !== 'total' && (state.platformNm[platformNm] = false);
        });
      }
      btn !== 'total' && (state.platformNm.total = false);
      state.platformNm[btn] = !state.platformNm[btn];
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
