import React, { useContext, useState } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import { css } from '@emotion/react';

import * as Contexts from '../context/contexts';
import * as TextBox from '../components/TextBox';
import * as Input from '../components/Input';
import AlertMessage from '../components/utils/AlertMessage';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';

const style = {
	checkedContent: css`
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 0 0 0 32px;
	`,
	dateColumn: css`
		display: flex;
		align-items: center;
		gap: 4px;
	`,
	summarizeContent: css`
		display: grid;
		grid-template-columns: 70px 1fr;
		gap: 8px;
		align-items: center;
		font-size: 0.8rem;
	`,
	unitColum: css`
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 0 0 0 104px;
		font-size: 0.8rem;
	`,
};

const Reception = () => {
	const { dispatch_realTime } = useContext(Contexts.RealTimeContext);
	const { dispatch_summarize } = useContext(Contexts.SummarizeContext);
	const { isNoReception, dispatch_noReception } = useContext(
		Contexts.NoReceptionContext
	);
	const { isMultiEvent } = useContext(Contexts.MultiEventContext);

	const [reception, setReception] = useState('');
	const [receptionLimitByNet, setReceptionLimitByNet] = useState('');
	const [receptionLimitByTel, setReceptionLimitByTel] = useState('');
	const [localRealTime, setLocalRealTime] = useState(false);
	const [localSummarize, setLocalSummarize] = useState(false);

	const handleChangeCategory = (e: { target: { value: string } }) => {
		const value = e.target.value;
		setReception(value);
		dispatch_noReception(value === '03' ? 'TRUE' : 'FALSE');

		if (value !== '01') {
			dispatch_realTime('FALSE');
			dispatch_summarize('FALSE');
		} else {
			dispatch_realTime(localRealTime ? 'TRUE' : 'FALSE');
			dispatch_summarize(localSummarize ? 'TRUE' : 'FALSE');
		}
	};

	return (
		<Section title="予約情報">
			<SectionItem title="予約受付方法">
				<div>
					<RadioGroup
						name="reception"
						value={isNoReception ? '03' : reception}
						onChange={(e) => handleChangeCategory(e)}
					>
						<Input.Radio label="ネット・電話予約受付" value="01" />
						{!isNoReception && reception === '01' ? (
							<div css={style.checkedContent}>
								<div css={style.dateColumn}>
									<span>
										<span css={{ fontWeight: 'bold' }}>
											ネット予約:
										</span>
										フェア開催
									</span>
									<TextBox.Normal
										hiddenLabel={true}
										sx={{ width: 59 }}
										value={receptionLimitByNet}
										onChange={(e) =>
											setReceptionLimitByNet(
												e.target.value
											)
										}
									/>
									日前まで可能
								</div>
								<div>
									<div>
										<Input.CheckBox
											label="リアルタイム予約"
											checked={localRealTime}
											onChange={(e) => {
												dispatch_realTime(
													e.target.checked
														? 'TRUE'
														: 'FALSE'
												);
												setLocalRealTime(
													e.target.checked
												);
											}}
										/>
										{localRealTime ? (
											<div css={style.checkedContent}>
												<Input.CheckBox
													label="イベント残枠によってリクエスト予約に切替"
													isSmall={true}
												/>
											</div>
										) : (
											false
										)}
									</div>
									<div>
										<Input.CheckBox
											label="まとめて予約"
											checked={localSummarize}
											disabled={isMultiEvent}
											onChange={(e) => {
												dispatch_summarize(
													e.target.checked
														? 'TRUE'
														: 'FALSE'
												);
												setLocalSummarize(
													e.target.checked
												);
											}}
										/>
										{isMultiEvent ? (
											<AlertMessage text="複数部制設定時は、まとめて予約を選択できません。" />
										) : (
											false
										)}
										{localSummarize ? (
											<>
												<dl css={style.checkedContent}>
													<div
														css={
															style.summarizeContent
														}
													>
														<dt>予約種別</dt>
														<dd>
															<RadioGroup row>
																<Input.Radio
																	label="要予約"
																	value="01"
																	isSmall={
																		true
																	}
																/>
																<Input.Radio
																	label="予約優先"
																	value="02"
																	isSmall={
																		true
																	}
																/>
															</RadioGroup>
														</dd>
													</div>
													<div
														css={
															style.summarizeContent
														}
													>
														<dt>受付単位</dt>
														<dd>
															<RadioGroup row>
																<Input.Radio
																	label="人"
																	value="01"
																	isSmall={
																		true
																	}
																/>
																<Input.Radio
																	label="組"
																	value="02"
																	isSmall={
																		true
																	}
																/>
															</RadioGroup>
														</dd>
													</div>
												</dl>
												<div css={style.unitColum}>
													<TextBox.Normal
														hiddenLabel={true}
														sx={{
															'& .MuiInputBase-input':
																{
																	padding:
																		'9px 14px',
																	width: 40,
																},
														}}
													/>
													人まで受付
												</div>
											</>
										) : (
											false
										)}
									</div>
								</div>
							</div>
						) : (
							false
						)}
						<Input.Radio value="02" label="電話のみ" />
						{!isNoReception && reception === '02' ? (
							<div css={style.checkedContent}>
								<div css={style.dateColumn}>
									<span>
										<span css={{ fontWeight: 'bold' }}>
											電話受付:
										</span>
										フェア開催
									</span>
									<TextBox.Normal
										hiddenLabel={true}
										sx={{ width: 59 }}
										value={receptionLimitByTel}
										onChange={(e) =>
											setReceptionLimitByTel(
												e.target.value
											)
										}
									/>
									日前まで可能
								</div>
							</div>
						) : (
							false
						)}
						<Input.Radio value="03" label="予約不要" />
					</RadioGroup>
				</div>
			</SectionItem>
		</Section>
	);
};

export default Reception;
