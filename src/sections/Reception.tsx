import React, { useCallback, useEffect, useState } from 'react';

import RadioGroup from '@mui/material/RadioGroup';
import { css } from '@emotion/react';

import * as TextBox from '../components/TextBox';
import * as Input from '../components/Input';
import AlertMessage from '../components/utils/AlertMessage';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import { useAppDispatch, useConditionSelector, useReceptionUnitSelector, useReservationSelector } from '../reducks/hooks';
import { changeNoReservation, changeRealTime, changeSummarize } from '../reducks/slice/reservationSlice';
import { setReceptionNumber, setReceptionUnit } from '../reducks/slice/receptionUnitSlice';

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
	const dispatch = useAppDispatch();
	const {
		reservation: { isNoReservation },
	} = useReservationSelector();
	const {
		condition: { isMultiEvent },
	} = useConditionSelector();
	const { receptionUnit } = useReceptionUnitSelector();

	const [reception, setReception] = useState('');
	const [receptionLimitByNet, setReceptionLimitByNet] = useState('');
	const [receptionLimitByTel, setReceptionLimitByTel] = useState('');
	const [localRealTime, setLocalRealTime] = useState(false);
	const [localSummarize, setLocalSummarize] = useState(false);

	console.log('localSummarize', localSummarize);

	const handleChangeReception = useCallback((e: { target: { value: string } }) => {
		const value = e.target.value;
		setReception(value);
		dispatch(changeNoReservation(value === '03'));

		console.log('handleChange', localSummarize);
		if (value !== '01') {
			dispatch(changeRealTime(false));
			dispatch(changeSummarize(false));
		} else {
			dispatch(changeRealTime(localRealTime));
			dispatch(changeSummarize(localSummarize));
		}
	}, []);

	const handleChangeUnit: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
		dispatch(setReceptionUnit(e.target.value));
	}, []);

	const handleChangeUnitNumber: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
		dispatch(setReceptionNumber(e.target.value));
	}, []);

	return (
		<Section title="予約情報">
			<SectionItem title="予約受付方法">
				<div>
					<RadioGroup name="reception" value={isNoReservation ? '03' : reception} onChange={(e) => handleChangeReception(e)}>
						<Input.Radio label="ネット・電話予約受付" value="01" />
						{!isNoReservation && reception === '01' ? (
							<div css={style.checkedContent}>
								<div css={style.dateColumn}>
									<span>
										<span css={{ fontWeight: 'bold' }}>ネット予約:</span>
										フェア開催
									</span>
									<TextBox.Normal
										hiddenLabel={true}
										sx={{ width: 59 }}
										value={receptionLimitByNet}
										onChange={(e) => setReceptionLimitByNet(e.target.value)}
									/>
									日前まで可能
								</div>
								<div>
									<div>
										<Input.CheckBox
											label="リアルタイム予約"
											checked={localRealTime}
											onChange={(e) => {
												dispatch(changeRealTime(e.target.checked));
												setLocalRealTime(e.target.checked);
											}}
										/>
										{localRealTime ? (
											<div css={style.checkedContent}>
												<Input.CheckBox label="イベント残枠によってリクエスト予約に切替" isSmall={true} />
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
												dispatch(changeSummarize(e.target.checked));
												setLocalSummarize(e.target.checked);
											}}
										/>
										{isMultiEvent ? <AlertMessage text="複数部制設定時は、まとめて予約を選択できません。" /> : false}
										{localSummarize ? (
											<>
												<dl css={style.checkedContent}>
													<div css={style.summarizeContent}>
														<dt>予約種別</dt>
														<dd>
															<RadioGroup row>
																<Input.Radio label="要予約" value="01" isSmall={true} />
																<Input.Radio label="予約優先" value="02" isSmall={true} />
															</RadioGroup>
														</dd>
													</div>
													<div css={style.summarizeContent}>
														<dt>受付単位</dt>
														<dd>
															<RadioGroup row value={receptionUnit.unit} onChange={handleChangeUnit}>
																<Input.Radio label="人" value="01" isSmall={true} />
																<Input.Radio label="組" value="02" isSmall={true} />
															</RadioGroup>
														</dd>
													</div>
												</dl>
												{receptionUnit.unit ? (
													<div css={style.unitColum}>
														<TextBox.Normal
															hiddenLabel={true}
															sx={{
																'& .MuiInputBase-input': {
																	padding: '9px 14px',
																	width: 40,
																},
															}}
															onChange={handleChangeUnitNumber}
														/>
														{receptionUnit.unit === '01' ? <>人</> : <>組</>}まで受付
													</div>
												) : (
													false
												)}
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
						{!isNoReservation && reception === '02' ? (
							<div css={style.checkedContent}>
								<div css={style.dateColumn}>
									<span>
										<span css={{ fontWeight: 'bold' }}>電話受付:</span>
										フェア開催
									</span>
									<TextBox.Normal
										hiddenLabel={true}
										sx={{ width: 59 }}
										value={receptionLimitByTel}
										onChange={(e) => setReceptionLimitByTel(e.target.value)}
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
