import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useContext } from 'react';
import { ScheduleWrapper } from '../template';
import * as Contexts from '../context/contexts';
import AlertMessage from '../components/utils/AlertMessage';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';

const Schedule = () => {
	const { isSummarize } = useContext(Contexts.SummarizeContext);
	const { isMultiEvent, dispatch_multiEvent } = useContext(
		Contexts.MultiEventContext
	);

	return (
		<Section title="スケジュール">
			<SectionItem title="開催パターン">
				<FormControlLabel
					control={
						<Checkbox
							checked={isMultiEvent}
							disabled={isSummarize}
							onChange={(e) => {
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
			</SectionItem>
			<SectionItem title="開催時間">
				<ScheduleWrapper />
			</SectionItem>
		</Section>
	);
};

export default Schedule;
