import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFairSelector = () => {
	const fair = useAppSelector((state: RootState) => state.fair);
	return { fair };
};

export const useIsOnlineSelector = () => {
	const online = useAppSelector((state: RootState) => state.online);
	return { online };
};

export const useUnitSelector = () => {
	const unit = useAppSelector((state: RootState) => state.receptionUnit);
	return { unit };
};

export const useConditionSelector = () => {
	const condition = useAppSelector((state: RootState) => state.condition);
	return { condition };
};

export const useReceptionUnitSelector = () => {
	const receptionUnit = useAppSelector((state: RootState) => state.receptionUnit);
	return { receptionUnit };
};

export const useReservationSelector = () => {
	const reservation = useAppSelector((state: RootState) => state.reservation);
	return { reservation };
};
