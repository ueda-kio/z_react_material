import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { ContextWrapper } from '../ContextWrapper';

const style = {
	wrapper: css`
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 30px;
		padding: 20px 40px;
	`,
	logo: css`
		font-size: 30px;
		font-weight: bold;
	`,
	list: css`
		display: flex;
		gap: 16px;
		padding: 12px;
	`,
};

const Header = () => {
	// `useContext`にProviderラッパーを引数として渡す
	const { providerValue } = useContext(ContextWrapper);

	return (
		<header css={style.wrapper}>
			<span css={style.logo}>{providerValue.value}</span>
			<nav>
				<ul css={style.list}>
					<li>
						<button
							onClick={() =>
								providerValue.setValue('changed value')
							}
						>
							change value
						</button>
					</li>
					<li>
						<button>click here</button>
					</li>
					<li>
						<button>click here</button>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
