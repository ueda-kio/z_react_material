import { createContext } from 'react';
import { Action } from './reducer';

type MultiEventContextProps = {
	isMultiEvent: boolean;
	dispatch_multiEvent: React.Dispatch<Action>;
};
const MultiEventContext = createContext({} as MultiEventContextProps);
export default MultiEventContext;
