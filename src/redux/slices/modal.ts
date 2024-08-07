import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { keyIsArrayCategory, EntryT, CATEGORIES, CategoryT } from '../../types/calculator';
import { v4 as uuidv4 } from 'uuid';
import { transliterate as tr } from 'transliteration';
import { initCalculator } from '../../utils/initCalculator';
import calculateRemaining from '../../utils/calculateRemaining';

type ModalT = {
  open: boolean,
  category: CategoryT,
}

const initialState: ModalT = {
  open: false,
  category: 'income',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state, 
      action: PayloadAction<string>
    ) => {
      if(!keyIsArrayCategory(action.payload)) return;
      state.category = action.payload;
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer