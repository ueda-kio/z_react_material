export type Action = 'TRUE' | 'FALSE';
export const noReceptionReducer = (state: boolean, action: Action) => {
	switch (action) {
		case 'TRUE':
			return (state = true);
		case 'FALSE':
			return (state = false);
		default:
			return state;
	}
};
