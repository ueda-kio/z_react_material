import { nanoid } from 'nanoid';
import { FairContents } from './context';

export type Action = {
	type: string;
	index?: number;
	category?: string;
	unit?: string;
};

export const fairReducer = (state: FairContents[], action: Action) => {
	switch (action.type) {
		case 'ADD':
			return [...state, { id: nanoid(), category: '', unit: '' }];
		case 'DELETE':
			return state.filter((_, i) => i !== action.index);
		case 'SET_CATEGORY':
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: action.category ?? '',
					unit: item.unit,
				};
				return i === action.index ? newContent : item;
			});
		case 'SET_UNIT':
			return state.map((item, i) => {
				const newContent = {
					id: item.id,
					category: item.category,
					unit: action.unit ?? '',
				};
				return i === action.index ? newContent : item;
			});
		default:
			return state;
	}
};
