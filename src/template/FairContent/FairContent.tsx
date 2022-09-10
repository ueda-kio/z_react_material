import { useCallback, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, RadioGroup, Select } from '@mui/material';
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import * as Cassette from '../../components/Cassette';
import * as Button from '../../components/Button';
import * as TextBox from '../../components/TextBox';
import * as Input from '../../components/Input';
import AlertMessage from '../../components/utils/AlertMessage';
import utils from '../../style/Utils';
import CaptionText from '../../components/utils/Caption';
import Images from './Images';
import { useAppDispatch, useReservationSelector } from '../../reducks/hooks';
import { deleteFair, setFairCategory, setFairUnit } from '../../reducks/slice/fairSlice';
import { changeNoReservation } from '../../reducks/slice/reservationSlice';

const style = {
	contents: css`
		& + & {
			margin-top: ${utils.border};
		}
	`,
	caption: css`
		margin-top: 8px;
	`,
};

type CategoriesType = { id: string; value: string; text: string; disabled: boolean }[];
type Props = {
	index: number;
	categories: CategoriesType;
	setCategories: React.Dispatch<React.SetStateAction<CategoriesType>>;
};

const FairContent: React.FC<Props> = ({ index, categories, setCategories }) => {
	const dispatch = useAppDispatch();
	const {
		reservation: { isSummarize, isRealTime, isNoReservation },
	} = useReservationSelector();

	const [receptionTypeValue, setReceptionTypeValue] = useState('');
	const [categoryValue, setCategoryValue] = useState('');
	const [paid, setPaid] = useState({ paid: '', charge: '', participants: '' });

	const handleChangeCategory = (e: { target: { value: string } }) => {
		setCategoryValue(e.target.value);
	};

	useEffect(() => {
		// 選択されたカテゴリーをdisabledにする
		setCategories((v) =>
			v.map((category) => {
				if (category.value === categoryValue) {
					return { ...category, disabled: true };
				}
				return category;
			})
		);
		// unmount時にカテゴリーを活性化する
		return () => {
			setCategories((v) =>
				v.map((category) => {
					if (category.value === categoryValue) {
						return { ...category, disabled: false };
					}
					return category;
				})
			);
		};
	}, [categoryValue]);

	/**
	 * 選択された受付単位をfairContentに格納する
	 * @param {Event} e radioボタンのchangeイベント
	 */
	const setUnitToState = useCallback((e: { target: { value: string } }) => {
		dispatch(setFairUnit({ index, unit: e.target.value }));
	}, []);

	/**
	 * 自身のインデックスに該当するfairContentのstateにカテゴリ名を格納する
	 * @param {Event} e selectボックスのchangeイベント
	 */
	const setCategoryNameToState = useCallback((e: { target: { value: string } }) => {
		const value = e.target.value;
		dispatch(setFairCategory({ index, category: value }));
	}, []);

	/**
	 * 「削除」ボタンからコンテンツを削除する
	 * - filterメソッドから自分を除いた配列をsetStateに渡すことで、配列から特定の要素を削除する
	 */
	const deleteSelf = useCallback(() => dispatch(deleteFair(index)), []);

	return (
		<Cassette.Cassette
			title={
				<>
					<Box sx={{ minWidth: 300 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">カテゴリー</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="カテゴリー"
								value={categoryValue}
								onChange={(e) => {
									handleChangeCategory(e);
									setCategoryNameToState(e);
									// selectCategory(e.target.value);
								}}
							>
								{categories.map((category) => (
									<MenuItem key={category.id} value={category.value} disabled={category.disabled}>
										{category.text}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<Button.Secondary onClick={deleteSelf}>削除</Button.Secondary>
				</>
			}
		>
			<Cassette.CassetteList title="予約種別">
				<>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						name="reception_02"
						value={isNoReservation ? '03' : receptionTypeValue}
						onChange={(e) => {
							setReceptionTypeValue(e.target.value);
							dispatch(changeNoReservation(e.target.value === '03'));
						}}
					>
						<Input.Radio value="01" disabled={isSummarize || isNoReservation} label="要予約" />
						<Input.Radio value="02" disabled={isSummarize || isNoReservation} label="予約優先" />
						<Input.Radio value="03" disabled={isSummarize || isNoReservation} label="予約不要" />
					</RadioGroup>
					{isSummarize ? <AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" /> : false}
					{isNoReservation ? <AlertMessage text="予約不要が設定中は予約種別を変更できません" /> : false}
				</>
			</Cassette.CassetteList>
			{isRealTime ? (
				<Cassette.CassetteList title="受付単位">
					<>
						<RadioGroup row onChange={setUnitToState}>
							<Input.Radio value="01" disabled={isSummarize || isNoReservation} label="名" />
							<Input.Radio value="02" disabled={isSummarize || isNoReservation} label="組" />
						</RadioGroup>
						{isSummarize ? <AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" /> : false}
						{isNoReservation ? <AlertMessage text="予約不要が設定中は予約種別を変更できません" /> : false}
					</>
				</Cassette.CassetteList>
			) : (
				false
			)}
			<Cassette.CassetteList title="料金">
				<RadioGroup row name="price" value={paid.paid} onChange={(e) => setPaid((v) => ({ ...v, paid: e.target.value }))}>
					<Input.Radio value="01" label="無料" />
					<Input.Radio value="02" label="有料" />
				</RadioGroup>
				{paid.paid === '02' ? (
					<>
						<Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginTop: 2 }}>
							<TextBox.Normal
								label="料金"
								value={paid.charge}
								onChange={(e) => setPaid((v) => ({ ...v, charge: e.target.value }))}
							/>
							<TextBox.Normal
								label="参加人数"
								value={paid.participants}
								onChange={(e) => setPaid((v) => ({ ...v, participants: e.target.value }))}
							/>
						</Box>
						<CaptionText cssProps={style.caption} text="料金は消費税込みの単位付き総額で記入してください。" />
						<CaptionText text="例)¥5,000" />
					</>
				) : (
					false
				)}
			</Cassette.CassetteList>
			<Cassette.Cassette title="詳細情報">
				<div css={style.contents}>
					<TextBox.Count limit={50} hiddenLabel fullWidth multiline rows={3} placeholder="詳細" name="fair_description" />
				</div>
				<Images />
			</Cassette.Cassette>
		</Cassette.Cassette>
	);
};

export default FairContent;
