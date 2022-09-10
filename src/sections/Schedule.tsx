import { useAppDispatch, useConditionSelector, useReservationSelector } from '../reducks/hooks';
import { changeMultiEvent } from '../reducks/slice/conditionSlice';
import { ScheduleWrapper } from '../template';
import * as Input from '../components/Input';
import AlertMessage from '../components/utils/AlertMessage';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';

const Schedule = () => {
	const dispatch = useAppDispatch();
	const {
		reservation: { isSummarize },
	} = useReservationSelector();
	const {
		condition: { isMultiEvent },
	} = useConditionSelector();

	return (
		<Section title="スケジュール">
			<SectionItem title="開催パターン">
				<Input.CheckBox
					checked={isMultiEvent}
					disabled={isSummarize}
					onChange={(e) => {
						dispatch(changeMultiEvent(e.target.checked));
					}}
					label="複数部制で開催"
				/>
				{isSummarize ? <AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" /> : false}
			</SectionItem>
			<SectionItem title="開催時間">
				<ScheduleWrapper />
			</SectionItem>
		</Section>
	);
};

export default Schedule;
