import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const receptionUnitSlice = createSlice({
	name: 'receptionUnit',
	initialState: { unit: '', number: '' },
	reducers: {
		setUnit: (state, action: PayloadAction<'01' | '02'>) => {
			return {
				unit: action.payload ?? '01',
				number: state.number,
			};
		},
		setNumber: (state, action: PayloadAction<string>) => {
			return {
				unit: state.unit,
				number: action.payload ?? 0,
			};
		},
	},
});

export const { setUnit, setNumber } = receptionUnitSlice.actions;

export default receptionUnitSlice.reducer;
