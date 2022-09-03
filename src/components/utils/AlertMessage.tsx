import React from 'react';
import { css, SerializedStyles } from '@emotion/react';

type Props = {
	text: string;
	cssProps?: SerializedStyles;
};

const style = css`
	display: block;
	color: red;
	font-size: 0.8rem;

	& + & {
		margin-top: 4px;
	}
`;

const AlertMessage: React.FC<Props> = ({ text, cssProps }) => {
	return <strong css={[style, cssProps]}>{text}</strong>;
};

export default AlertMessage;
