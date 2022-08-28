import {
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
} from '@mui/material';
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { ContextWrapper } from '../ContextWrapper';
import * as Contexts from '../context/contexts';
import * as Cassette from '../components/Cassette';
import * as Button from '../components/Button';
import * as TextBox from '../components/TextBox';
import AlertMessage from '../components/utils/AlertMessage';
import utils from '../style/Utils';

const style = {
	contents: css`
		& + & {
			margin-top: ${utils.border};
		}
	`,
};

type Props = {
	index: number;
};

const FairContent: React.FC<Props> = ({ index }) => {
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

	const [receptionTypeValue, setReceptionTypeValue] = useState('');
	const [categoryValue, setCategoryValue] = useState('');

	const handleChangeCategory = (e: { target: { value: string } }) => {
		setCategoryValue(e.target.value);
	};

	/**
	 * 選択された受付単位をfairContentに格納する
	 * @param {Event} e radioボタンのchangeイベント
	 */
	const setUnitToState = (e: { target: { value: string } }) => {
		dispatch_fair({
			type: 'SET_UNIT',
			index: index,
			unit: e.target.value,
		});
	};

	/**
	 * 自身のインデックスに該当するfairContentのstateにカテゴリ名を格納する
	 * @param {Event} e selectボックスのchangeイベント
	 */
	const setCategoryNameToState = (e: { target: { value: string } }) => {
		const value = e.target.value;
		dispatch_fair({
			type: 'SET_CATEGORY',
			index: index,
			category: value,
		});
	};

	/**
	 * 「削除」ボタンからコンテンツを削除する
	 * - filterメソッドから自分を除いた配列をsetStateに渡すことで、配列から特定の要素を削除する
	 */
	const deleteSelf = () => {
		dispatch_fair({
			type: 'DELETE',
			index,
		});
	};

	useEffect(() => {
		console.log('fair.fairContents', fairContents);
	}, [fairContents]);

	return (
		<Cassette.Cassette
			title={
				<>
					<Box sx={{ minWidth: 300 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								カテゴリー
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								label="カテゴリー"
								value={categoryValue}
								onChange={(e) => {
									handleChangeCategory(e);
									setCategoryNameToState(e);
								}}
							>
								<MenuItem value="01">相談会</MenuItem>
								<MenuItem value="02">模擬挙式</MenuItem>
								<MenuItem value="03">模擬披露宴</MenuItem>
								<MenuItem value="04">試食会</MenuItem>
								<MenuItem value="05">試着会</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Button.Secondary onClick={deleteSelf}>
						削除
					</Button.Secondary>
				</>
			}
		>
			<Cassette.CassetteList title="予約種別">
				<>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						name="reception_02"
						value={isNoReception ? '03' : receptionTypeValue}
						onChange={(e) => {
							setReceptionTypeValue(e.target.value);
							dispatch_noReception(
								e.target.value === '03' ? 'TRUE' : 'FALSE'
							);
						}}
					>
						<FormControlLabel
							control={<Radio />}
							value="01"
							disabled={isSummarize || isNoReception}
							label="要予約"
						/>
						<FormControlLabel
							control={<Radio />}
							value="02"
							disabled={isSummarize || isNoReception}
							label="予約優先"
						/>
						<FormControlLabel
							control={<Radio />}
							value="03"
							disabled={isSummarize || isNoReception}
							label="予約不要"
						/>
					</RadioGroup>
					{isSummarize ? (
						<AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" />
					) : (
						false
					)}
					{isNoReception ? (
						<AlertMessage text="予約不要が設定中は予約種別を変更できません" />
					) : (
						false
					)}
				</>
			</Cassette.CassetteList>
			<Cassette.CassetteList title="受付単位">
				<>
					<RadioGroup row onChange={setUnitToState}>
						<FormControlLabel
							control={<Radio />}
							value="01"
							disabled={isSummarize || isNoReception}
							label="名"
						/>
						<FormControlLabel
							control={<Radio />}
							value="02"
							disabled={isSummarize || isNoReception}
							label="組"
						/>
					</RadioGroup>
					{isSummarize ? (
						<AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" />
					) : (
						false
					)}
					{isNoReception ? (
						<AlertMessage text="予約不要が設定中は予約種別を変更できません" />
					) : (
						false
					)}
				</>
			</Cassette.CassetteList>
			<Cassette.CassetteList title="料金">
				<RadioGroup row name="price">
					<FormControlLabel
						control={<Radio />}
						value="01"
						label="無料"
					/>
					<FormControlLabel
						control={<Radio />}
						value="02"
						label="有料"
					/>
				</RadioGroup>
			</Cassette.CassetteList>
			<Cassette.Cassette title="詳細情報">
				<div css={style.contents}>
					<TextBox.Count
						limit={50}
						hiddenLabel
						fullWidth
						multiline
						rows={3}
						placeholder="詳細"
						name="fair_description"
					/>
				</div>
				<div css={style.contents}>画像</div>
			</Cassette.Cassette>
		</Cassette.Cassette>
	);
};

export default FairContent;
