import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrderedProduct} from '../../shared/api/types/order';
import {IProduct} from '../../shared/api/types/product';

// Define a type for the slice state
interface IModalState {
  isRMVisible: boolean;
  modalOption: '' | 'Order' | 'Product';
  data: IOrderedProduct | IProduct | undefined;
}

// Define the initial state
const initialState: IModalState = {
  isRMVisible: false,
  modalOption: '',
  data: undefined,
};

// Define the slice
const modalSlice = createSlice({
  name: 'rightModal',
  initialState,
  reducers: {
    openRightModal: (
      state,
      action: PayloadAction<{
        modalOption: 'Order' | 'Product';
        data: IModalState['data'];
      }>,
    ) => {
      state.isRMVisible = true;
      state.modalOption = action.payload.modalOption;
      state.data = action.payload.data;
    },
    closeRightModal: state => {
      state.isRMVisible = false;
      state.modalOption = '';
      state.data = undefined;
    },
  },
});

// Export the action creators
export const {openRightModal, closeRightModal} = modalSlice.actions;

// Export the reducer
export default modalSlice.reducer;
