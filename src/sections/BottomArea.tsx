import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import * as Button from '../components/Button';

const style = {
	wrapper: css`
		display: flex;
		align-items: center;
		justify-content: end;
		padding: 40px;
	`,
	buttonWrapper: css`
		display: flex;
		gap: 8px;
	`,
};

type Props = {
	setIsBottomViewed: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomArea: React.FC<Props> = ({ setIsBottomViewed }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current === null) return;

		const callback = (entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (target.isIntersecting) {
				setIsBottomViewed(true);
			} else {
				setIsBottomViewed(false);
			}
		};

		const observer = new IntersectionObserver(callback, { threshold: 0 });
		observer.observe(ref.current);
	}, []);

	return (
		<div ref={ref} css={style.wrapper}>
			<div css={style.buttonWrapper}>
				<Button.Secondary size="large">戻る</Button.Secondary>
				<Button.Primary size="large">確認画面へ</Button.Primary>
			</div>
		</div>
	);
};

export default BottomArea;
