import GlobalStyle from './style/GlobalStyle';
import {
	BasicInfo,
	Reception,
	FairContentWrapper,
	Schedule,
} from './sections/';
import { css } from '@emotion/react';
import * as Provider from './context/providers';

const style = css`
	display: grid;
	gap: 16px;
	width: 1000px;
`;

const App: React.FC = () => {
	console.log('App');

	return (
		<form css={style}>
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
