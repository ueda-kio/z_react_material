import { createContext } from 'react';
import { Action } from './reducer';

type NoReceptionContextProps = {
	isNoReception: boolean;
	dispatch_noReception: React.Dispatch<Action>;
};
const NoReceptionContext = createContext({} as NoReceptionContextProps);
export default NoReceptionContext;
