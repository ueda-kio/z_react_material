import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { TextField } from '@mui/material';
import { css } from '@emotion/react';
import * as Contexts from '../../context/contexts';
import ScheduleContent from './ScheduleContent';
import utils from '../../style/Utils';

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
};

const ScheduleWrapper = () => {
	const { isMultiEvent } = useContext(Contexts.MultiEventContext);
	const { fairContents } = useContext(Contexts.FairContext);
	const [times, setTimes] = useState([] as { id: string }[]);

	const handleClickAddTime = () => {
		setTimes((v) => [...v, { id: nanoid() }]);
	};
	const handleClickDeleteTime = (id: string) => {
		setTimes((v) => v.filter((time) => id !== time.id));
	};

	return (
		<>
			<div css={style.wrapper}>
				<div className="scheduleWrap__timeInput">
					{isMultiEvent ? <span>第1部</span> : false}
					<TextField label="開始時間" variant="outlined" />
				</div>
				<ol css={style.contents}>
					{fairContents.map((item) => {
						return !item.category ? ( // カテゴリ選択前は非表示
							false
						) : (
							<li key={item.id} css={style.contentsItem}>
								<ScheduleContent category={item.category} />
							</li>
						);
					})}
				</ol>
			</div>
			{isMultiEvent ? (
				<>
					<div css={style.wrapper}>
						<div className="scheduleWrap__timeInput">
							{isMultiEvent ? <span>第2部</span> : false}
							<TextField label="開始時間" variant="outlined" />
						</div>
						<ol css={style.contents}>
							{fairContents.map((item) => {
								return !item.category ? ( // カテゴリ選択前は非表示
									false
								) : (
									<li key={item.id} css={style.contentsItem}>
										<span>{item.id}</span>
										<ScheduleContent
											category={item.category}
										/>
									</li>
								);
							})}
						</ol>
					</div>
					{times.map((time, i) => (
						<div css={style.wrapper} key={time.id}>
							<div className="scheduleWrap__timeInput">
								{isMultiEvent ? (
									<span>第{i + 3}部</span>
								) : (
									false
								)}
								<TextField
									label="開始時間"
									variant="outlined"
								/>
								<button
									type="button"
									onClick={() =>
										handleClickDeleteTime(time.id)
									}
								>
									第{i + 3}部を削除
								</button>
							</div>
							<ol css={style.contents}>
								{fairContents.map((item) => {
									return !item.category ? ( // カテゴリ選択前は非表示
										false
									) : (
										<li
											key={item.id}
											css={style.contentsItem}
										>
											<span>{item.id}</span>
											<ScheduleContent
												category={item.category}
											/>
										</li>
									);
								})}
							</ol>
						</div>
					))}
					{times.length < 3 ? (
						<button type="button" onClick={handleClickAddTime}>
							部を追加
						</button>
					) : (
						false
					)}
				</>
			) : (
				false
			)}
		</>
	);
};

export default ScheduleWrapper;
