import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ScheduleWrapper } from '../template';
import * as Contexts from '../context/contexts';
import AlertMessage from '../components/utils/AlertMessage';

const Schedule = () => {
	const { isRealTime, dispatch_realTime } = useContext(
		Contexts.RealTimeContext
	);
	const { isSummarize, dispatch_summarize } = useContext(
		Contexts.SummarizeContext
	);
	const { isNoReception, dispatch_noReception } = useContext(
		Contexts.NoReceptionContext
	);
	const { isMultiEvent, dispatch_multiEvent } = useContext(
		Contexts.MultiEventContext
	);
	const { fairContents, dispatch_fair } = useContext(Contexts.FairContext);

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
							<AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" />
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
