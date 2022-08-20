import React, { useMemo, useState } from 'react';
import './assets/css/reset.css';
import './assets/css/App.scss';
// import { Header, Footer } from './template';
import { ContextWrapper } from './ContextWrapper';
import GlobalStyle from './style/GlobalStyle';
import { BasicInfo, Reception, FairContentWrapper } from './sections/';

const App: React.FC = () => {
	const [value, setValue] = useState('フェア名');
	const [isRealTime, setIsRealTime] = useState(false);
	const [isSummarize, setIsSummarize] = useState(false);
	const [isNoReception, setIsNoReception] = useState(false);

	const providerValue = useMemo(
		() => ({ value, setValue }),
		[value, setValue]
	);

	// リアルタイム予約state
	const realTime = useMemo(
		() => ({ isRealTime, setIsRealTime }),
		[isRealTime, setIsRealTime]
	);
	// まとめて予約state
	const summarize = useMemo(
		() => ({ isSummarize, setIsSummarize }),
		[isSummarize, setIsSummarize]
	);
	// 予約不要state
	const noReception = useMemo(
		() => ({ isNoReception, setIsNoReception }),
		[isNoReception, setIsNoReception]
	);

	return (
		<form className="form">
			<GlobalStyle />
			<ContextWrapper.Provider
				value={{ providerValue, realTime, summarize, noReception }}
			>
				<BasicInfo />
				<Reception />
				<FairContentWrapper />
			</ContextWrapper.Provider>
		</form>
	);
};

export default App;
