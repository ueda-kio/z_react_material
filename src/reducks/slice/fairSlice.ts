import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { onlineCategoryValues } from './onlineSlice';

const initialState = [{ id: nanoid(), category: '', unit: '' }];
export const fairSlice = createSlice({
	name: 'fair',
	initialState,
	reducers: {
		addFair: (state) => [...state, { id: nanoid(), category: '', unit: '' }],
		deleteFair: (state, action: PayloadAction<number>) => state.filter((_, i) => i !== action.payload),
		setFairCategory: (state, action: PayloadAction<{ index: number; category: string }>) => {
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: action.payload.category ?? '',
					unit: item.unit,
				};
				return i === action.payload.index ? newContent : item;
			});
		},
		setFairUnit: (state, action: PayloadAction<{ index: number; unit: string }>) => {
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: item.category,
					unit: action.payload.unit ?? '',
				};
				return i === action.payload.index ? newContent : item;
			});
		},
		filterOnlineFair: (state) => {
			const filtered = state.filter((item) => onlineCategoryValues.some((category) => category === item.category));
			return filtered.length ? filtered : initialState;
		},
	},
});

export const { addFair, deleteFair, setFairCategory, setFairUnit, filterOnlineFair } = fairSlice.actions;

export default fairSlice.reducer;
