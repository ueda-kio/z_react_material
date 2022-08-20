import React, { useMemo, useState } from 'react';
import './assets/css/reset.css';
import './assets/css/App.scss';
// import { Header, Footer } from './template';
import { ContextWrapper } from './ContextWrapper';
import GlobalStyle from './style/GlobalStyle';
import BasicInfo from './sections/BasicInfo';
import Reception from './sections/Reception';

const App: React.FC = () => {
	const [value, setValue] = useState('フェア名');
	const test = 'test';

	const providerValue = useMemo(
		() => ({ value, setValue }),
		[value, setValue]
	);

	return (
		<form className="form">
			<GlobalStyle />
			<ContextWrapper.Provider value={{ providerValue, test }}>
				<BasicInfo />
				<Reception />
			</ContextWrapper.Provider>
		</form>
	);
};

export default App;
