import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const fairSlice = createSlice({
	name: 'fair',
	initialState: [{ id: nanoid(), category: '', unit: '' }],
	reducers: {
		addFair: (state) => [...state, { id: nanoid(), category: '', unit: '' }],
		deleteFair: (state, action: PayloadAction<number>) => state.filter((_, i) => i !== action.payload),
		setCategory: (state, action: PayloadAction<{ index: number; category: string }>) => {
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: action.payload.category ?? '',
					unit: item.unit,
				};
				return i === action.payload.index ? newContent : item;
			});
		},
		setUnit: (state, action: PayloadAction<{ index: number; unit: string }>) => {
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: item.category,
					unit: action.payload.unit ?? '',
				};
				return i === action.payload.index ? newContent : item;
			});
		},
	},
});

export const { addFair, deleteFair, setCategory, setUnit } = fairSlice.actions;

export default fairSlice.reducer;
