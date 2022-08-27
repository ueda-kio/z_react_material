import React from 'react';
import { css } from '@emotion/react';
import utils from '../style/Utils';

const style = {
	wrapper: css`
		background-color: #fff;
		box-shadow: ${utils.boxShadow};
		border-radius: 16px;
	`,
	header: css`
		display: flex;
		justify-content: start;
		align-items: center;
		height: 107px;
		padding: 0 40px;
		border-bottom: ${utils.border};
	`,
	title: css`
		font-size: 22px;
		font-weight: bold;
	`,
	body: css`
		padding: 0px 40px 8px;
	`,
	list: css`
		padding: 0px 40px 8px;
	`,
};

type Props = {
	title: string;
	children: React.ReactNode;
};

const Section: React.FC<Props> = ({ title, children }) => {
	return (
		<section css={style.wrapper}>
			<header css={style.header}>
				<h2 css={style.title}>{title}</h2>
			</header>
			<dl css={style.list}>{children}</dl>
		</section>
	);
};

export default Section;
