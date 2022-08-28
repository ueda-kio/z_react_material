import React from 'react';
import { css } from '@emotion/react';
import utils from '../../style/Utils';

const style = {
	item: css`
		display: grid;
		align-items: start;
		grid-template-columns: 80px 1fr;
		gap: 26px;
		padding: 16px 0;

		&:first-of-type {
			padding-top: 0;
		}

		&:last-of-type {
			padding-bottom: 0;
		}

		& + & {
			border-top: ${utils.border};
		}
	`,
	head: css`
		line-height: 42px;
		font-size: 16px;
		font-weight: bold;
	`,
};

type Props = {
	title: string;
	children: React.ReactNode;
};

const CassetteList: React.FC<Props> = ({ title, children }) => {
	return (
		<div css={style.item}>
			<dt css={style.head}>{title}</dt>
			<dd>{children}</dd>
		</div>
	);
};

export default CassetteList;
