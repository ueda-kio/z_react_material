import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContextWrapper } from '../ContextWrapper';
import { ScheduleContent } from '../template';

const Schedule = () => {
	const { summarize, multipleEvent, fair } = useContext(ContextWrapper);

	const [isMultiple, setIsMultiple] = useState(false);
	console.log('re rendering');

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">スケジュール</h2>
			</header>

			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">開催パターン</dt>
					<dd className="section__item__content">
						<FormControlLabel
							control={
								<Checkbox
									checked={multipleEvent.isMultiple}
									disabled={summarize.isSummarize}
									onChange={(e) => {
										// setIsMultiple(e.target.checked);
										multipleEvent.setIsMultiple(
											e.target.checked
										);
									}}
								/>
							}
							label="複数部制で開催"
						/>
						{summarize.isSummarize ? (
							<strong className="c-alert">
								まとめて予約選択中は、複数部制を設定できません。
							</strong>
						) : (
							false
						)}
					</dd>
				</div>
				<div className="section__item">
					<dt className="section__item__head">開催時間</dt>
					<dd className="section__item__content">
						<div className="scheduleWrap">
							<div className="scheduleWrap__timeInput">
								<TextField
									label="開始時間"
									variant="outlined"
								/>
							</div>
							<ol className="scheduleWrap__contents">
								{fair.fairContents.map((item, i) => {
									const id = nanoid();
									return !item.category ? ( // カテゴリ選択前は非表示
										false
									) : (
										<li
											key={id}
											className="scheduleWrap__contents__item"
										>
											<span>{id}</span>
											<ScheduleContent
												category={item.category}
											/>
										</li>
									);
								})}
							</ol>
						</div>
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default Schedule;
