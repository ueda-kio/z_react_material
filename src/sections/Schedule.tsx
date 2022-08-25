import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ScheduleWrapper } from '../template';
import {
	RealTimeContext,
	SummarizeContext,
	NoReceptionContext,
	MultiEventContext,
	FairContext,
} from '../context/contexts';

const Schedule = () => {
	const { isRealTime, dispatch_realTime } = useContext(RealTimeContext);
	const { isSummarize, dispatch_summarize } = useContext(SummarizeContext);
	const { isNoReception, dispatch_noReception } =
		useContext(NoReceptionContext);
	const { isMultiEvent, dispatch_multiEvent } = useContext(MultiEventContext);
	const { fairContents, dispatch_fair } = useContext(FairContext);

	// const [isMultiple, setIsMultiple] = useState(false);
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
									checked={isMultiEvent}
									disabled={isSummarize}
									onChange={(e) => {
										// setIsMultiple(e.target.checked);
										dispatch_multiEvent(
											e.target.checked ? 'TRUE' : 'FALSE'
										);
									}}
								/>
							}
							label="複数部制で開催"
						/>
						{isSummarize ? (
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
						<ScheduleWrapper />
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default Schedule;
