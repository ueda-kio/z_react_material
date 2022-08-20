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
import { useContext, useState } from 'react';
import { ContextWrapper } from '../ContextWrapper';

const FairContent = () => {
	const { realTime, summarize, noReception } = useContext(ContextWrapper);
	const [value, setValue] = useState('');

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
							label="Age"
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Box>
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
								value={noReception.isNoReception ? '03' : value}
								onChange={(e) => {
									setValue(e.target.value);
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
							<RadioGroup row>
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
						<div className="c-cassette__contents">
							<TextField
								hiddenLabel
								fullWidth
								multiline
								rows={3}
								placeholder="詳細"
								name="fair_description"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FairContent;
