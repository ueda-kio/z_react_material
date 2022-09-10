import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const reservationSlice = createSlice({
	name: 'reservation',
	initialState: {
		isSummarize: false,
		isRealTime: false,
		isNoReservation: false,
	},
	reducers: {
		changeSummarize: (state, action: PayloadAction<boolean>) => {
			state.isSummarize = action.payload;
		},
		changeRealTime: (state, action: PayloadAction<boolean>) => {
			state.isRealTime = action.payload;
		},
		changeNoReservation: (state, action: PayloadAction<boolean>) => {
			state.isNoReservation = action.payload;
		},
	},
});

export const { changeSummarize, changeRealTime, changeNoReservation } = reservationSlice.actions;

export default reservationSlice.reducer;
