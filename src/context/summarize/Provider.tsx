import { useReducer } from 'react';
import SummarizeContext from './context';
import { summarizeReducer } from './reducer';

const SummarizeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isSummarize, dispatch_summarize] = useReducer(
		summarizeReducer,
		false
	);

	return (
		<SummarizeContext.Provider value={{ isSummarize, dispatch_summarize }}>
			{children}
		</SummarizeContext.Provider>
	);
};

export default SummarizeProvider;
