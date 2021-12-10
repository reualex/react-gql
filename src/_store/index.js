import { configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-named-as-default
import modalSlice from './modalContext';

export default configureStore({
  reducer: {
    modal: modalSlice,
  },
});
