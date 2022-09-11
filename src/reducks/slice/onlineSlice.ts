import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const onlineCategoryValues = ['01', '06', '07'];
export const normalCategoryValues = ['02', '03', '04', '05'];

export const onlineSlice = createSlice({
	name: 'online',
	initialState: {
		isOnline: false,
		isSelectedNormalFairCategory: false,
	},
	reducers: {
		isOnline: (state, action: PayloadAction<boolean>) => {
			state.isOnline = action.payload;
		},
		isSelectedNormalFairCategory: (state, action: PayloadAction<boolean>) => {
			state.isSelectedNormalFairCategory = action.payload;
		},
	},
});

export const { isOnline, isSelectedNormalFairCategory } = onlineSlice.actions;

export default onlineSlice.reducer;
