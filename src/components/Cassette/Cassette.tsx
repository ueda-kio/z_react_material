import React from 'react';
import { css } from '@emotion/react';
import utils from '../../style/Utils';

const style = {
	wrapper: css`
		box-shadow: ${utils.boxShadow};
		border-radius: 16px;
	`,
	header: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 96px;
		padding: 0 40px;
		border-bottom: ${utils.border};
	`,
	title: css`
		font-weight: bold;
	`,
	body: css`
		padding: 24px;
	`,
};

type Props = {
	title: React.ReactNode;
	children: React.ReactNode;
};

const Cassette: React.FC<Props> = ({ title, children }) => {
	const titleNode = (() => {
		if (typeof title === 'string') {
			return <span css={style.title}>{title}</span>;
		} else {
			return <>{title}</>;
		}
	})();
	return (
		<div css={style.wrapper}>
			<div css={style.header}>{titleNode}</div>
			<div css={style.body}>
				<dl>{children}</dl>
			</div>
		</div>
	);
};

export default Cassette;
