import { useReducer } from 'react';
import { nanoid } from 'nanoid';
import FairContext from './context';
import { fairReducer } from './reducer';

const FairProvider = ({ children }: { children: React.ReactNode }) => {
	const [fairContents, dispatch_fair] = useReducer(fairReducer, [{ id: nanoid(), category: '', unit: '' }]);

	return <FairContext.Provider value={{ fairContents, dispatch_fair }}>{children}</FairContext.Provider>;
};

export default FairProvider;
