import './assets/css/reset.css';
import './assets/css/App.scss';
import GlobalStyle from './style/GlobalStyle';
import {
	BasicInfo,
	Reception,
	FairContentWrapper,
	Schedule,
} from './sections/';
import * as Provider from './context/providers';

const App: React.FC = () => {
	console.log('App');

	return (
		<form className="form">
			<GlobalStyle />
			<Provider.RealTimeProvider>
				<Provider.SummarizeProvider>
					<Provider.NoReceptionProvider>
						<Provider.FairProvider>
							<Provider.MultiEventProvider>
								<BasicInfo />
								<Reception />
								<FairContentWrapper />
								<Schedule />
							</Provider.MultiEventProvider>
						</Provider.FairProvider>
					</Provider.NoReceptionProvider>
				</Provider.SummarizeProvider>
			</Provider.RealTimeProvider>
		</form>
	);
};

export default App;
