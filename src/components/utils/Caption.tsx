import { css, SerializedStyles } from '@emotion/react';
import React from 'react';

type Props = {
	text: string;
	cssProps?: SerializedStyles;
};

const style = css`
	font-size: 12px;
	line-height: 1.6;
	color: #8d8d8d;
`;

const CaptionText: React.FC<Props> = ({ text, cssProps }) => {
	return <p css={[style, cssProps]}>{text}</p>;
};

export default CaptionText;
