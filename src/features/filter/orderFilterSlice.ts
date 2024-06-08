import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface IOrderFilterState {
  date: {total: boolean; startDate: string; endDate: string};
  orderStatus: {
    total: boolean;
    checking: boolean;
    complete: boolean;
    noStock: boolean;
    refund: boolean;
  };
  request: {total: boolean; refund: boolean; replace: boolean};
  search: string;
}

const initialState: IOrderFilterState = {
  date: {total: true, startDate: '', endDate: ''},
  orderStatus: {
    total: true,
    checking: false,
    complete: false,
    noStock: false,
    refund: false,
  },
  request: {total: true, refund: false, replace: false},
  search: '',
};

const orderFilterSlice = createSlice({
  name: 'orderFilter',
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.date.startDate = action.payload;
      state.date.total && action.payload !== '' && (state.date.total = false);
      state.date.endDate === `` &&
        action.payload === `` &&
        (state.date.total = true);
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.date.endDate = action.payload;
      state.date.total && action.payload !== '' && (state.date.total = false);
      state.date.startDate === `` &&
        action.payload === `` &&
        (state.date.total = true);
    },
    setDateTotal: state => {
      state.date = {total: true, startDate: '', endDate: ''};
    },
    toggleOrderStatusBtn: (
      state,
      action: PayloadAction<keyof IOrderFilterState['orderStatus']>,
    ) => {
      const btn = action.payload;

      if (btn === 'total' && state.orderStatus.total) return;
      if (btn === 'total' && !state.orderStatus.total) {
        state.orderStatus.checking = false;
        state.orderStatus.complete = false;
        state.orderStatus.noStock = false;
        state.orderStatus.refund = false;
      }
      btn !== 'total' && (state.orderStatus.total = false);
      state.orderStatus[btn] = !state.orderStatus[btn];
    },
    toggleRequestBtn: (
      state,
      action: PayloadAction<keyof IOrderFilterState['request']>,
    ) => {
      const btn = action.payload;

      if (btn === 'total' && state.request.total) return;
      if (btn === 'total' && !state.request.total) {
        state.request.refund = false;
        state.request.replace = false;
      }
      btn !== 'total' && (state.request.total = false);
      state.request[btn] = !state.request[btn];
    },
    setOrderSearchText: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const {
  setStartDate,
  setEndDate,
  setDateTotal,
  toggleOrderStatusBtn,
  toggleRequestBtn,
  setOrderSearchText,
} = orderFilterSlice.actions;

export default orderFilterSlice.reducer;
