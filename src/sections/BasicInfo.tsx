import React, { useState } from 'react';
import { Box, css, Modal, RadioGroup, Typography } from '@mui/material';
import { useAppDispatch, useFairSelector, useIsOnlineSelector } from '../reducks/hooks';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import * as Input from '../components/Input';
import * as TextBox from '../components/TextBox';
import * as Button from '../components/Button';
import { isOnline, onlineCategoryValues } from '../reducks/slice/onlineSlice';
import { filterOnlineFair } from '../reducks/slice/fairSlice';
import Confirm, { MyDialogProps } from '../components/Modal/Confirm';

const style = {
	modal: css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		padding: 40px;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
	`,
	title: css`
		font-weight: bold;
		font-size: 22px;
	`,
	buttonWrapper: css`
		display: flex;
		justify-content: end;
		gap: 4px;
		margin-top: 20px;
	`,
};

const fairs = [
	{ value: '01', text: '相談会' },
	{ value: '02', text: '模擬挙式' },
	{ value: '03', text: '模擬披露宴' },
	{ value: '04', text: '試食会' },
	{ value: '05', text: '試着会' },
	{ value: '06', text: 'その他１' },
	{ value: '07', text: 'その他２' },
];

const BasicInfo = () => {
	const dispatch = useAppDispatch();
	const { online } = useIsOnlineSelector();
	const { fair } = useFairSelector();
	const [fairType, setFairType] = useState('01');
	const [modalConfig, setModalConfig] = React.useState<MyDialogProps | undefined>();

	const getSelectedNormalFair = () => {
		const selectedValues = fair
			.filter((item) => !onlineCategoryValues.some((value) => value === item.category))
			.map((item) => item.category);
		const names = fairs
			.map((item) => selectedValues.some((value) => value === item.value) && item.text)
			.filter((name): name is string => name !== false);
		return names;
	};

	const setOnlineState: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		if (e.target.value === '02') {
			if (online.isSelectedNormalFairCategory) {
				const selectedNormalFair = getSelectedNormalFair();
				const ret = await new Promise<string>((resolve) => {
					setModalConfig({
						onClose: resolve,
						selectedNormalFair,
					});
				});
				setModalConfig(undefined);
				if (ret === 'cancel') return;
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
			{modalConfig && <Confirm {...modalConfig} />}
		</Section>
	);
};

export default BasicInfo;
