import GlobalStyle from './style/GlobalStyle';
import { BasicInfo, Reception, FairContentWrapper, Schedule, BottomArea, FixedArea } from './sections/';
import { css } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';

const customTheme = createTheme({
	palette: {
		primary: {
			main: '#f14361',
		},
	},
	spacing: 4,
});

const style = css`
	display: grid;
	gap: 16px;
	width: 1000px;
`;

const App: React.FC = () => {
	const [isBottomViewed, setIsBottomViewed] = useState(false);

	const BasicInfoMemo = useMemo(() => <BasicInfo />, []);
	const ReceptionMemo = useMemo(() => <Reception />, []);
	const FairContentWrapperMemo = useMemo(() => <FairContentWrapper />, []);
	const ScheduleMemo = useMemo(() => <Schedule />, []);

	return (
		<form css={style}>
			<GlobalStyle />
			<ThemeProvider theme={customTheme}>
				{BasicInfoMemo}
				{ReceptionMemo}
				{FairContentWrapperMemo}
				{ScheduleMemo}
				<BottomArea setIsBottomViewed={setIsBottomViewed} />
				<FixedArea isBottomViewed={isBottomViewed} />
			</ThemeProvider>
		</form>
	);
};

export default App;
