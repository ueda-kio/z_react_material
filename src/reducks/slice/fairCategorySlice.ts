import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = [
	{ id: nanoid(), value: '01', text: '相談会', selected: false, disabled: false },
	{ id: nanoid(), value: '02', text: '模擬挙式', selected: false, disabled: false },
	{ id: nanoid(), value: '03', text: '模擬披露宴', selected: false, disabled: false },
	{ id: nanoid(), value: '04', text: '試食会', selected: false, disabled: false },
	{ id: nanoid(), value: '05', text: '試着会', selected: false, disabled: false },
	{ id: nanoid(), value: '06', text: 'その他１', selected: false, disabled: false },
	{ id: nanoid(), value: '07', text: 'その他２', selected: false, disabled: false },
];

export const onlineFairCategories = [
	{ value: '01', text: '相談会' },
	{ value: '06', text: 'その他１' },
	{ value: '07', text: 'その他２' },
];

export const normalFairCategories = [
	{ value: '02', text: '模擬挙式' },
	{ value: '03', text: '模擬披露宴' },
	{ value: '04', text: '試食会' },
	{ value: '05', text: '試着会' },
];

const fairCategorySlice = createSlice({
	name: 'fairCategory',
	initialState,
	reducers: {
		disabledNormalFairs: (state) =>
			state.map((item) => {
				if (normalFairCategories.some((value) => value.value === item.value)) {
					return { ...item, selected: false, disabled: true };
				}
				return item;
			}),
		enableNormalFairs: (state) =>
			state.map((item) => {
				if (normalFairCategories.some((value) => value.value === item.value) && !item.selected) return { ...item, disabled: false };
				return item;
			}),
		selectCategory: (state, action: PayloadAction<{ selectedValue: string; prevValue: string }>) =>
			state.map((item) => {
				if (item.selected && action.payload.prevValue === item.value) {
					return { ...item, selected: false, disabled: false };
				}
				if (item.value === action.payload.selectedValue) {
					return { ...item, selected: true, disabled: true };
				}
				return item;
			}),
		enableSelectedCategory: (state, action: PayloadAction<string>) =>
			state.map((item) => {
				if (item.value === action.payload && item.selected) {
					return { ...item, selected: false, disabled: false };
				}
				return item;
			}),
	},
});

export const { disabledNormalFairs, enableNormalFairs, selectCategory, enableSelectedCategory } = fairCategorySlice.actions;

export default fairCategorySlice.reducer;
