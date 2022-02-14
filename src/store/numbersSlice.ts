import { createSlice } from '@reduxjs/toolkit';

export type Number = {
  number: string;
  additional_informations?: string;
};

export type Numbers = {
  name: string;
  chargeable_numbers: Number[] | null;
  free_numbers: Number[] | null;
};

export type NumbersState = Numbers[];

const initialState: NumbersState = [];

export const numbersSlice = createSlice({
  name: 'numbers',
  initialState,
  reducers: {
    updateNumbers: (state, action) => [...state, ...action.payload],
  },
});

export const { updateNumbers } = numbersSlice.actions;

export default numbersSlice.reducer;
