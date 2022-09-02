import { useReducer } from 'react';
import ReceptionUnitContext from './context';
import { receptionUnitReducer } from './reducer';

const ReceptionUnitProvider = ({ children }: { children: React.ReactNode }) => {
	const [receptionUnit, dispatch_unit] = useReducer(receptionUnitReducer, { unit: '', number: 0 });

	return <ReceptionUnitContext.Provider value={{ receptionUnit, dispatch_unit }}>{children}</ReceptionUnitContext.Provider>;
};

export default ReceptionUnitProvider;
