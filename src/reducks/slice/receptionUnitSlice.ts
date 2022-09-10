import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const receptionUnitSlice = createSlice({
	name: 'receptionUnit',
	initialState: { unit: '', number: '' },
	reducers: {
		setReceptionUnit: (state, action: PayloadAction<string>) => {
			return {
				unit: action.payload,
				number: state.number,
			};
		},
		setReceptionNumber: (state, action: PayloadAction<string>) => {
			return {
				unit: state.unit,
				number: action.payload,
			};
		},
		resetReception: () => {
			return {
				unit: '',
				number: '',
			};
		},
	},
});

export const { setReceptionUnit, setReceptionNumber, resetReception } = receptionUnitSlice.actions;

export default receptionUnitSlice.reducer;
