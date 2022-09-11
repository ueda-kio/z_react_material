import { css } from '@emotion/react';
import React from 'react';
import * as Button from '../components/Button';
import utils from '../style/Utils';

const style = {
	wrapper: css`
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: end;
		width: 990px;
		padding: 20px 40px;
		background-color: #fff;
		box-shadow: ${utils.boxShadow};
		transition: opacity 0.15s, visibility 0.15s;
		z-index: 100;

		&.is-hidden {
			opacity: 0;
			visibility: hidden;
		}
	`,
	buttonWrapper: css`
		display: flex;
		gap: 8px;
	`,
};

type Props = {
	isBottomViewed: boolean;
};

const FixedArea: React.FC<Props> = ({ isBottomViewed }) => {
	return (
		<div css={style.wrapper} className={isBottomViewed ? 'is-hidden' : ''}>
			<div css={style.buttonWrapper}>
				<Button.Secondary size="large">戻る</Button.Secondary>
				<Button.Primary size="large">確認画面へ</Button.Primary>
			</div>
		</div>
	);
};

export default FixedArea;
