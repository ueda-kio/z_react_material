import { configureStore } from '@reduxjs/toolkit';
import * as Slices from '../slice';

export const store = configureStore({
	reducer: {
		reservation: Slices.reservationReducer,
		fair: Slices.fairReducer,
		receptionUnit: Slices.receptionUnitReducer,
		condition: Slices.conditionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
