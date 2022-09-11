import React, { useState } from 'react';
import { RadioGroup } from '@mui/material';
import { useAppDispatch, useIsOnlineSelector } from '../reducks/hooks';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import * as Input from '../components/Input';
import * as TextBox from '../components/TextBox';
import { isOnline } from '../reducks/slice/onlineSlice';
import { filterOnlineFair } from '../reducks/slice/fairSlice';

const BasicInfo = () => {
	const dispatch = useAppDispatch();
	const { online } = useIsOnlineSelector();
	const [fairType, setFairType] = useState('01');

	const setOnlineState: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.value === '02') {
			if (online.isSelectedNormalFairCategory) {
				const res = window.confirm('オンライン相談会で設定できないフェアコンテンツは削除されます。よろしいですか？');
				if (!res) {
					e.preventDefault();
					return;
				}
			}
			dispatch(isOnline(true));
			dispatch(filterOnlineFair());
		} else {
			dispatch(isOnline(false));
		}
		setFairType(e.target.value);
	};

	return (
		<Section title="基本情報">
			<SectionItem title="フェアタイプ">
				<RadioGroup row name="fairType" onChange={setOnlineState} value={fairType}>
					<Input.Radio value="01" label="通常フェア" />
					<Input.Radio value="02" label="オンライン相談会" />
				</RadioGroup>
			</SectionItem>
			<SectionItem title="フェア名">
				<TextBox.Count limit={30} label="フェア名" sx={{ width: 511 }} />
			</SectionItem>
		</Section>
	);
};

export default BasicInfo;
