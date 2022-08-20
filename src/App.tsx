import React, { useMemo, useState } from 'react';
import './assets/css/reset.css';
import './assets/css/App.scss';
import { Header, Footer } from './template';
import { ContextWrapper } from './ContextWrapper';
import GlobalStyle from './style/GlobalStyle';

const App: React.FC = () => {
	const [value, setValue] = useState('item_1');
	const test = 'test';

	const providerValue = useMemo(
		() => ({ value, setValue }),
		[value, setValue]
	);

	return (
		<>
			<GlobalStyle />
			<ContextWrapper.Provider value={{ providerValue, test }}>
				<Header />
				<Footer />
			</ContextWrapper.Provider>
		</>
	);
};

export default App;
