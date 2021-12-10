import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpenModal: false,
    firstModalRender: true,
    checkBoxes: [],
    isRefetch: false,
  },
  reducers: {
    toggleOpen: state => {
      // eslint-disable-next-line no-param-reassign
      state.isOpenModal = !state.isOpenModal;
    },
    changeStatuses: (state, action) => {
      state.checkBoxes = action.payload;
    },
    cahngeFirstModalRender: state => {
      state.firstModalRender = false;
    },
    isRefetch: (state, action) => {
      state.isRefetch = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleOpen, changeStatuses, cahngeFirstModalRender, isRefetch } = modalSlice.actions;

export default modalSlice.reducer;
