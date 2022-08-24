import { createContext } from 'react';
import { Action } from './reducer';

export type FairContents = {
	id: string;
	category: string;
	unit: string;
};

type FairContextProps = {
	fairContents: FairContents[];
	dispatch_fair: React.Dispatch<Action>;
};

const FairContext = createContext({} as FairContextProps);
export default FairContext;
