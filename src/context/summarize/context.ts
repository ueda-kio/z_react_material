import { createContext } from 'react';
import { Action } from './reducer';

type SummarizeContextProps = {
	isSummarize: boolean;
	dispatch_summarize: React.Dispatch<Action>;
};
const SummarizeContext = createContext({} as SummarizeContextProps);
export default SummarizeContext;
