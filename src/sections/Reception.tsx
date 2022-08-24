import React, { useContext, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ContextWrapper } from '../ContextWrapper';
import { Checkbox } from '@mui/material';

const Reception = () => {
	const { realTime, summarize, noReception, multipleEvent } =
		useContext(ContextWrapper);
	const [reception, setReception] = useState('');
	const [receptionLimitByNet, setReceptionLimitByNet] = useState('');
	const [receptionLimitByTel, setReceptionLimitByTel] = useState('');

	const [localRealTime, setLocalRealTime] = useState(false);
	const [localSummarize, setLocalSummarize] = useState(false);

	const handleChangeCategory = (e: { target: { value: string } }) => {
		const value = e.target.value;
		setReception(value);
		noReception.setIsNoReception(value === '03' ? true : false);

		if (value !== '01') {
			realTime.setIsRealTime(false);
			summarize.setIsSummarize(false);
		} else {
			realTime.setIsRealTime(localRealTime);
			summarize.setIsSummarize(localSummarize);
		}
	};

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">予約情報</h2>
			</header>
			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">予約受付方法</dt>
					<dd className="section__item__content">
						<div>
							<RadioGroup
								aria-labelledby="demo-radio-buttons-group-label"
								name="reception"
								value={
									noReception.isNoReception ? '03' : reception
								}
								onChange={(e) => handleChangeCategory(e)}
							>
								<FormControlLabel
									control={<Radio value="01" />}
									label="ネット・電話予約受付"
								/>
								{reception === '01' ? (
									<div>
										<div>
											ネット予約: フェア開催
											<input
												type="text"
												value={receptionLimitByNet}
												onChange={(e) =>
													setReceptionLimitByNet(
														e.target.value
													)
												}
											/>
											まで可能
										</div>
										<div>
											<div>
												<FormControlLabel
													control={
														<Checkbox
															checked={
																localRealTime
															}
															onChange={(e) => {
																realTime.setIsRealTime(
																	e.target
																		.checked
																);
																setLocalRealTime(
																	e.target
																		.checked
																);
															}}
														/>
													}
													label="リアルタイム予約"
												/>
												{localRealTime ? (
													<div>test</div>
												) : (
													false
												)}
											</div>
											<div>
												<FormControlLabel
													control={
														<Checkbox
															checked={
																localSummarize
															}
															disabled={
																multipleEvent.isMultiple
															}
															onChange={(e) => {
																summarize.setIsSummarize(
																	e.target
																		.checked
																);
																setLocalSummarize(
																	e.target
																		.checked
																);
															}}
														/>
													}
													label="まとめて予約"
												/>
												{multipleEvent.isMultiple ? (
													<strong className="c-alert">
														複数部制設定時は、まとめて予約を選択できません。
													</strong>
												) : (
													false
												)}
											</div>
										</div>
									</div>
								) : (
									false
								)}
								<FormControlLabel
									control={<Radio value="02" />}
									label="電話のみ"
								/>
								{reception === '02' ? (
									<div>
										電話受付: フェア開催
										<input
											type="text"
											value={receptionLimitByTel}
											onChange={(e) =>
												setReceptionLimitByTel(
													e.target.value
												)
											}
										/>
										まで可能
									</div>
								) : (
									false
								)}
								<FormControlLabel
									control={<Radio value="03" />}
									label="予約不要"
								/>
							</RadioGroup>
						</div>
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default Reception;
