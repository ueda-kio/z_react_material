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
import React, { useContext, useEffect, useState } from 'react';
import { ContextWrapper } from '../ContextWrapper';
import {
	RealTimeContext,
	SummarizeContext,
	NoReceptionContext,
	MultiEventContext,
	FairContext,
} from '../context/contexts';

type Props = {
	index: number;
};

const FairContent: React.FC<Props> = ({ index }) => {
	const { isRealTime, dispatch_realTime } = useContext(RealTimeContext);
	const { isSummarize, dispatch_summarize } = useContext(SummarizeContext);
	const { isNoReception, dispatch_noReception } =
		useContext(NoReceptionContext);
	const { isMultiEvent, dispatch_multiEvent } = useContext(MultiEventContext);
	const { fairContents, dispatch_fair } = useContext(FairContext);

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
									isNoReception ? '03' : receptionTypeValue
								}
								onChange={(e) => {
									setReceptionTypeValue(e.target.value);
									dispatch_noReception(
										e.target.value === '03'
											? 'TRUE'
											: 'FALSE'
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
								<strong className="c-alert">
									まとめて予約設定中のため、種別を変更することはできません。
								</strong>
							) : (
								false
							)}
							{isNoReception ? (
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
								<strong className="c-alert">
									まとめて予約設定中のため、種別を変更することはできません。
								</strong>
							) : (
								false
							)}
							{isNoReception ? (
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
