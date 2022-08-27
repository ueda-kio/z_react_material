import React from 'react';
import { css } from '@emotion/react';
import utils from '../style/Utils';

const style = {
	item: css`
		display: grid;
		align-items: start;
		grid-template-columns: 160px 1fr;
		gap: 26px;
		padding: 32px 0;

		& + & {
			border-top: ${utils.border};
		}
	`,
	head: css`
		font-size: 16px;
		font-weight: bold;
	`,
	content: css`
		& + & {
			margin-top: 32px;
			padding-top: 32px;
			border-top: ${utils.border};
		}
	`,
};

type Props = {
	title: string;
	children: React.ReactNode;
};

const SectionItem: React.FC<Props> = ({ title, children }) => {
	return (
		<div css={style.item}>
			<dt css={style.head}>{title}</dt>
			<dd css={style.content}>{children}</dd>
		</div>
	);
};

export default SectionItem;
