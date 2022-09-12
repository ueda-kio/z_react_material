import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import utils from '../../style/Utils';
import ScheduleContent from './ScheduleContent';
import * as TextBox from '../../components/TextBox';
import * as Button from '../../components/Button';
import { useConditionSelector, useFairSelector } from '../../reducks/hooks';

const style = {
	wrapper: css`
		& + & {
			margin-top: 32px;
			padding-top: 32px;
			border-top: ${utils.border};
		}
	`,
	contents: css`
		margin-top: 32px;
	`,
	contentsItem: css`
		& + & {
			margin-top: 24px;
		}
	`,
	timeInput: css`
		display: flex;
		gap: 12px;
		align-items: center;
		font-weight: bold;
	`,
};

const ScheduleWrapper = () => {
	const { fair } = useFairSelector();
	const {
		condition: { isMultiEvent },
	} = useConditionSelector();
	const [times, setTimes] = useState<{ id: string }[]>([]);

	const handleClickAddTime = useCallback(() => {
		setTimes((v) => [...v, { id: nanoid() }]);
	}, []);
	const handleClickDeleteTime = useCallback((id: string) => {
		setTimes((v) => v.filter((time) => id !== time.id));
	}, []);

	return (
		<>
			<div css={style.wrapper}>
				<div css={style.timeInput}>
					{isMultiEvent ? <span>第1部:</span> : false}
					<TextBox.Normal label="開始時間" />
				</div>
				<ol css={style.contents}>
					{fair.map((item) => {
						return !item.category ? ( // カテゴリ選択前は非表示
							false
						) : (
							<li key={item.id} css={style.contentsItem}>
								<ScheduleContent category={item.category} unit={item.unit} />
							</li>
						);
					})}
				</ol>
			</div>
			{isMultiEvent ? (
				<AnimatePresence>
					<motion.div
						key="second_schedule"
						css={style.wrapper}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div css={style.timeInput}>
							{isMultiEvent ? <span>第2部:</span> : false}
							<TextBox.Normal label="開始時間" />
						</div>
						<ol css={style.contents}>
							{fair.map((item) => {
								return !item.category ? ( // カテゴリ選択前は非表示
									false
								) : (
									<li key={item.id} css={style.contentsItem}>
										<ScheduleContent category={item.category} unit={item.unit} />
									</li>
								);
							})}
						</ol>
					</motion.div>
					{times.map((time, i) => (
						<motion.div
							css={style.wrapper}
							key={time.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<div css={[style.timeInput, { justifyContent: 'space-between' }]}>
								<div css={style.timeInput}>
									{isMultiEvent ? <span>第{i + 3}部:</span> : false}
									<TextBox.Normal label="開始時間" />
								</div>
								<Button.Secondary onClick={() => handleClickDeleteTime(time.id)}>第{i + 3}部を削除</Button.Secondary>
							</div>
							<ol css={style.contents}>
								{fair.map((item) => {
									return !item.category ? ( // カテゴリ選択前は非表示
										false
									) : (
										<li key={item.id} css={style.contentsItem}>
											<ScheduleContent category={item.category} unit={item.unit} />
										</li>
									);
								})}
							</ol>
						</motion.div>
					))}
					{times.length < 3 ? (
						<Button.Secondary sx={{ marginTop: 6 }} onClick={handleClickAddTime}>
							部を追加（第5部まで追加可能）
						</Button.Secondary>
					) : (
						false
					)}
				</AnimatePresence>
			) : (
				false
			)}
		</>
	);
};

export default ScheduleWrapper;
