import { useReducer } from 'react';
import MultiEventContext from './context';
import { multiEventReducer } from './reducer';

const MultiEventProvider = ({ children }: { children: React.ReactNode }) => {
	const [isMultiEvent, dispatch_multiEvent] = useReducer(multiEventReducer, false);

	return <MultiEventContext.Provider value={{ isMultiEvent, dispatch_multiEvent }}>{children}</MultiEventContext.Provider>;
};

export default MultiEventProvider;
