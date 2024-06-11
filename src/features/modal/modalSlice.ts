import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderedProduct } from "../../shared/api/types/order";
import { IProduct } from "../../shared/api/types/product";

// Define a type for the slice state
interface IModalState {
  isRMVisible: boolean;
  modalOption: "" | "Order" | "Product";
  dataId: string;
}

// Define the initial state
const initialState: IModalState = {
  isRMVisible: false,
  modalOption: "",
  dataId: "",
};

// Define the slice
const modalSlice = createSlice({
  name: "rightModal",
  initialState,
  reducers: {
    openRightModal: (
      state,
      action: PayloadAction<{
        modalOption: "Order" | "Product";
        dataId: string;
      }>
    ) => {
      state.isRMVisible = true;
      state.modalOption = action.payload.modalOption;
      state.dataId = action.payload.dataId;
    },
    closeRightModal: (state) => {
      state.isRMVisible = false;
      state.modalOption = "";
      state.dataId = "";
    },
  },
});

// Export the action creators
export const { openRightModal, closeRightModal } = modalSlice.actions;

// Export the reducer
export default modalSlice.reducer;
