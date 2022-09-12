import React, { useCallback, useState } from 'react';
import { RadioGroup } from '@mui/material';
import { useAppDispatch, useFairCategorySelector, useFairSelector, useIsOnlineSelector } from '../reducks/hooks';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import * as Input from '../components/Input';
import * as TextBox from '../components/TextBox';
import { isOnline } from '../reducks/slice/onlineSlice';
import { filterOnlineFair } from '../reducks/slice/fairSlice';
import Confirm, { MyDialogProps } from '../components/Modal/Confirm';
import { disabledNormalFairs, enableNormalFairs, normalFairCategories } from '../reducks/slice/fairCategorySlice';

const BasicInfo = () => {
	const dispatch = useAppDispatch();
	const { online } = useIsOnlineSelector();
	const { fairCategory } = useFairCategorySelector();
	const [fairType, setFairType] = useState('01');
	const [modalConfig, setModalConfig] = React.useState<MyDialogProps | undefined>();

	const getSelectedNormalFairValues = useCallback(() => {
		const normalFairValues = normalFairCategories.map((item) => item.value);
		const selectedNormalFair = fairCategory.filter(
			(category) => normalFairValues.some((value) => value === category.value) && category.selected
		);
		return selectedNormalFair.map((item) => item.text);
	}, [fairCategory]);

	const setOnlineState: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
		if (e.target.value === '02') {
			if (online.isSelectedNormalFairCategory) {
				const selectedNormalFair = getSelectedNormalFairValues();
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
			dispatch(disabledNormalFairs());
		} else {
			dispatch(isOnline(false));
			dispatch(enableNormalFairs());
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
