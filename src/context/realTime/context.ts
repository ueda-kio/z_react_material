import { createContext } from 'react';
import { Action } from './reducer';

type RealTimeContextProps = {
	isRealTime: boolean;
	dispatch_realTime: React.Dispatch<Action>;
};
const RealTimeContext = createContext({} as RealTimeContextProps);
export default RealTimeContext;
