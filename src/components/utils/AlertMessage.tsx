import React from 'react';
import { css } from '@emotion/react';

type Props = {
	text: string;
};

const style = css`
	display: block;
	color: red;
	font-size: 0.8rem;

	& + & {
		margin-top: 4px;
	}
`;

const AlertMessage: React.FC<Props> = ({ text }) => {
	return <strong css={style}>{text}</strong>;
};

export default AlertMessage;
