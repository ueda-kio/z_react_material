import { useReducer } from 'react';
import RealTimeContext from './context';
import { realTimeReducer } from './reducer';

const RealTimeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isRealTime, dispatch_realTime] = useReducer(realTimeReducer, false);

	return <RealTimeContext.Provider value={{ isRealTime, dispatch_realTime }}>{children}</RealTimeContext.Provider>;
};

export default RealTimeProvider;
