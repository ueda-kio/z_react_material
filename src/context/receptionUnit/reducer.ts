import { ReceptionUnit } from './context';

export type Action = {
	type: string;
	unit?: string;
	number?: number;
};

export const receptionUnitReducer = (state: ReceptionUnit, action: Action) => {
	switch (action.type) {
		case 'SET_UNIT':
			return {
				unit: action.unit ?? '01',
				number: state.number,
			};
		case 'SET_NUMBER':
			return {
				unit: state.unit,
				number: action.number ?? 0,
			};
		default:
			return state;
	}
};
