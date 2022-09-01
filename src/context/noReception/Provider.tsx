import { useReducer } from 'react';
import NoReceptionContext from './context';
import { noReceptionReducer } from './reducer';

const NoReceptionProvider = ({ children }: { children: React.ReactNode }) => {
	const [isNoReception, dispatch_noReception] = useReducer(noReceptionReducer, false);

	return <NoReceptionContext.Provider value={{ isNoReception, dispatch_noReception }}>{children}</NoReceptionContext.Provider>;
};

export default NoReceptionProvider;
