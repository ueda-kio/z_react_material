import React from 'react';
import './assets/css/reset.css';
import './assets/css/App.scss';
import GlobalStyle from './style/GlobalStyle';
import {
	BasicInfo,
	Reception,
	FairContentWrapper,
	Schedule,
} from './sections/';
import {
	SummarizeProvider,
	RealTimeProvider,
	NoReceptionProvider,
	MultiEventProvider,
	FairProvider,
} from './context/providers';

const App: React.FC = () => {
	console.log('App');

	return (
		<form className="form">
			<GlobalStyle />
			<RealTimeProvider>
				<SummarizeProvider>
					<NoReceptionProvider>
						<FairProvider>
							<MultiEventProvider>
								<BasicInfo />
								<Reception />
								<FairContentWrapper />
								<Schedule />
							</MultiEventProvider>
						</FairProvider>
					</NoReceptionProvider>
				</SummarizeProvider>
			</RealTimeProvider>
		</form>
	);
};

export default App;
