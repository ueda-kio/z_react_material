import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const conditionSlice = createSlice({
	name: 'condition',
	initialState: {
		isMultiEvent: false,
		isOnline: false,
	},
	reducers: {
		changeMultiEvent: (state, action: PayloadAction<boolean>) => {
			state.isMultiEvent = action.payload;
		},
		changeOnline: (state, action: PayloadAction<boolean>) => {
			state.isOnline = action.payload;
		},
	},
});

export const { changeMultiEvent, changeOnline } = conditionSlice.actions;

export default conditionSlice.reducer;
