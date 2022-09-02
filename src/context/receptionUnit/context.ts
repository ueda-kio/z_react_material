import { createContext } from 'react';
import { Action } from './reducer';

export type ReceptionUnit = {
	unit: string;
	number: number;
};

type ReceptionUnitProps = {
	receptionUnit: ReceptionUnit;
	dispatch_unit: React.Dispatch<Action>;
};

const ReceptionUnitContext = createContext({} as ReceptionUnitProps);
export default ReceptionUnitContext;
