import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { TextField } from '@mui/material';
import * as Contexts from '../../context/contexts';
import ScheduleContent from './ScheduleContent';

const ScheduleWrapper = () => {
	const { isMultiEvent, dispatch_multiEvent } = useContext(
		Contexts.MultiEventContext
	);
	const { fairContents, dispatch_fair } = useContext(Contexts.FairContext);

	const [times, setTimes] = useState([] as { id: string }[]);

	const handleClickAddTime = () => {
		setTimes((v) => [...v, { id: nanoid() }]);
	};
	const handleClickDeleteTime = (id: string) => {
		setTimes((v) => v.filter((time) => id !== time.id));
	};

	return (
		<>
			<div className="scheduleWrap">
				<div className="scheduleWrap__timeInput">
					{isMultiEvent ? <span>第1部</span> : false}
					<TextField label="開始時間" variant="outlined" />
				</div>
				<ol className="scheduleWrap__contents">
					{fairContents.map((item) => {
						return !item.category ? ( // カテゴリ選択前は非表示
							false
						) : (
							<li
								key={item.id}
								className="scheduleWrap__contents__item"
							>
								<span>{item.id}</span>
								<ScheduleContent category={item.category} />
							</li>
						);
					})}
				</ol>
			</div>
			{isMultiEvent ? (
				<>
					<div className="scheduleWrap">
						<div className="scheduleWrap__timeInput">
							{isMultiEvent ? <span>第2部</span> : false}
							<TextField label="開始時間" variant="outlined" />
						</div>
						<ol className="scheduleWrap__contents">
							{fairContents.map((item) => {
								return !item.category ? ( // カテゴリ選択前は非表示
									false
								) : (
									<li
										key={item.id}
										className="scheduleWrap__contents__item"
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
					{times.map((time, i) => (
						<div className="scheduleWrap" key={time.id}>
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
							<ol className="scheduleWrap__contents">
								{fairContents.map((item) => {
									return !item.category ? ( // カテゴリ選択前は非表示
										false
									) : (
										<li
											key={item.id}
											className="scheduleWrap__contents__item"
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
