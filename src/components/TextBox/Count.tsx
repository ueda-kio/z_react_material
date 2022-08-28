import React, { useState } from 'react';
import Normal from './Normal';
import { css } from '@emotion/react';

const style = {
	limit: css`
		position: relative;
		padding-left: 6px;
		&::before {
			content: '/';
			position: absolute;
			left: 0;
		}
	`,
};

type Props = React.ComponentProps<typeof Normal> & {
	limit: number;
};

const emotionConditional = (isFullWid: boolean) => {
	if (!isFullWid) {
		return css`
			width: fit-content;
		`;
	}
	return [];
};

const Count: React.FC<Props> = ({ limit, ...props }) => {
	const [count, setCount] = useState(0);

	const handleChangeCount: React.ChangeEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (e) => {
		setCount(e.target.value.length);
	};

	const isLimit = count > Number(limit);

	return (
		<div css={[emotionConditional(props.fullWidth ?? false)]}>
			<Normal {...props} onChange={handleChangeCount} />
			<p
				css={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '4px',
					fontSize: '12px',
					color: '#8d8d8d',
				}}
			>
				<span>{limit}文字以内</span>
				<span>
					{isLimit ? (
						<span css={{ color: 'red' }}>{count}</span>
					) : (
						<span>{count}</span>
					)}
					<span css={style.limit}>{limit}</span>
				</span>
			</p>
		</div>
	);
};

export default Count;
