import {
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { ContextWrapper } from '../ContextWrapper';

type Props = {
	index: number;
};

const FairContent: React.FC<Props> = ({ index }) => {
	const { summarize, noReception, fair } = useContext(ContextWrapper);
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
		fair.setFairContents(
			fair.fairContents.map((item, i) => {
				const newContent = {
					id: item.id,
					category: item.category,
					unit: e.target.value,
				};
				return i === index ? newContent : item;
			})
		);
	};

	/**
	 * 自身のインデックスに該当するfairContentのstateにカテゴリ名を格納する
	 * @param {Event} e selectボックスのchangeイベント
	 */
	const setCategoryNameToState = (e: { target: { value: string } }) => {
		const value = e.target.value;
		fair.setFairContents(
			fair.fairContents.map((item, i) => {
				const newContent = {
					id: item.id,
					category: value,
					unit: item.unit,
				};
				return i === index ? newContent : item;
			})
		);
	};

	/**
	 * 「削除」ボタンからコンテンツを削除する
	 * - filterメソッドから自分を除いた配列をsetStateに渡すことで、配列から特定の要素を削除する
	 */
	const deleteSelf = () => {
		fair.setFairContents(fair.fairContents.filter((_, i) => i !== index));
	};

	useEffect(() => {
		console.log('fair.fairContents', fair.fairContents);
	}, [fair.fairContents]);

	return (
		<div className="c-cassette">
			<div className="c-cassette__header">
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
							<MenuItem value="01">カテゴリ01</MenuItem>
							<MenuItem value="02">カテゴリ02</MenuItem>
							<MenuItem value="03">カテゴリ03</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<button type="button" onClick={deleteSelf}>
					削除
				</button>
			</div>
			<div className="c-cassette__body">
				<dl className="c-cassette__dl">
					<div className="c-cassette__dl__item">
						<dt className="c-cassette__dl__head">予約種別</dt>
						<dd className="c-cassette__dl__content">
							<RadioGroup
								row
								aria-labelledby="demo-radio-buttons-group-label"
								name="reception_02"
								value={
									noReception.isNoReception
										? '03'
										: receptionTypeValue
								}
								onChange={(e) => {
									setReceptionTypeValue(e.target.value);
									noReception.setIsNoReception(
										e.target.value === '03' ? true : false
									);
								}}
							>
								<FormControlLabel
									control={<Radio />}
									value="01"
									disabled={
										summarize.isSummarize ||
										noReception.isNoReception
									}
									label="要予約"
								/>
								<FormControlLabel
									control={<Radio />}
									value="02"
									disabled={
										summarize.isSummarize ||
										noReception.isNoReception
									}
									label="予約優先"
								/>
								<FormControlLabel
									control={<Radio />}
									value="03"
									disabled={
										summarize.isSummarize ||
										noReception.isNoReception
									}
									label="予約不要"
								/>
							</RadioGroup>
							{summarize.isSummarize ? (
								<strong className="c-alert">
									まとめて予約設定中のため、種別を変更することはできません。
								</strong>
							) : (
								false
							)}
							{noReception.isNoReception ? (
								<strong className="c-alert">
									予約不要が設定されているよ！
								</strong>
							) : (
								false
							)}
						</dd>
					</div>
					<div className="c-cassette__dl__item">
						<dt className="c-cassette__dl__head">受付単位</dt>
						<dd className="c-cassette__dl__content">
							<RadioGroup row onChange={setUnitToState}>
								<FormControlLabel
									control={<Radio />}
									value="01"
									disabled={
										summarize.isSummarize ||
										noReception.isNoReception
									}
									label="名"
								/>
								<FormControlLabel
									control={<Radio />}
									value="02"
									disabled={
										summarize.isSummarize ||
										noReception.isNoReception
									}
									label="組"
								/>
							</RadioGroup>
							{summarize.isSummarize ? (
								<strong className="c-alert">
									まとめて予約設定中のため、種別を変更することはできません。
								</strong>
							) : (
								false
							)}
							{noReception.isNoReception ? (
								<strong className="c-alert">
									予約不要が設定されているよ！
								</strong>
							) : (
								false
							)}
						</dd>
					</div>
					<div className="c-cassette__dl__item">
						<dt className="c-cassette__dl__head">料金</dt>
						<dd className="c-cassette__dl__content">
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
						</dd>
					</div>
				</dl>
				<div className="c-cassette">
					<div className="c-cassette__header">header</div>
					<div className="c-cassette__body">
						<div className="c-cassette__contents">
							<TextField
								hiddenLabel
								fullWidth
								multiline
								rows={3}
								placeholder="詳細"
								name="fair_description"
							/>
							{/* <div className="textCount">
												<span className="textCount__limit">
													100文字以内
												</span>
												<div className="textCount__counter">
													<span className="textCount__count">
														0
													</span>
													<span className="textCount__mother">
														100
													</span>
												</div>
											</div> */}
						</div>
						<div className="c-cassette__contents">画像</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FairContent;
