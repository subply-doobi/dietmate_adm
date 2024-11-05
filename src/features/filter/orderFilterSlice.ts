import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IResultStatusCd =
  | ""
  | "SP013001"
  | "SP013002"
  | "SP013003"
  | "SP013004"; // 001: 확인중 | 002: 재고없음 | 003: 환불요청 | 004: 처리완료
export type IRequestCd = "" | "SP014001" | "SP014002"; // 001: 환불 | 002: 교환
export interface IOrderFilterState {
  date: { total: boolean; startDate: string; endDate: string };
  resultStatusCd: IResultStatusCd;
  requestCd: IRequestCd;
  search: string;
}

const initialState: IOrderFilterState = {
  date: { total: true, startDate: "", endDate: "" },
  resultStatusCd: "",
  requestCd: "",
  search: "",
};

const orderFilterSlice = createSlice({
  name: "orderFilter",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.date.startDate = action.payload;
      state.date.total && action.payload !== "" && (state.date.total = false);
      state.date.endDate === `` &&
        action.payload === `` &&
        (state.date.total = true);
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.date.endDate = action.payload;
      state.date.total && action.payload !== "" && (state.date.total = false);
      state.date.startDate === `` &&
        action.payload === `` &&
        (state.date.total = true);
    },
    setDateTotal: (state) => {
      state.date = { total: true, startDate: "", endDate: "" };
    },
    setResultStatusCd: (state, action: PayloadAction<IResultStatusCd>) => {
      if (state.resultStatusCd === action.payload) return;
      const cd = action.payload;
      state.resultStatusCd = cd;
    },
    setRequestStatusCd: (state, action: PayloadAction<IRequestCd>) => {
      if (state.requestCd === action.payload) return;
      const cd = action.payload;
      state.requestCd = cd;
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
  setResultStatusCd,
  setRequestStatusCd,
  setOrderSearchText,
} = orderFilterSlice.actions;

export default orderFilterSlice.reducer;
