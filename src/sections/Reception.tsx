import React, { useContext, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ContextWrapper } from '../ContextWrapper';
import { Checkbox } from '@mui/material';

const Reception = () => {
	const { realTime, summarize } = useContext(ContextWrapper);
	const [reception, setReception] = useState('');
	const [receptionLimitByNet, setReceptionLimitByNet] = useState('');
	const [receptionLimitByTel, setReceptionLimitByTel] = useState('');

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
							>
								<FormControlLabel
									control={
										<Radio
											value="01"
											onChange={(e) =>
												setReception(e.target.value)
											}
										/>
									}
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
																realTime.isRealTime
															}
															onChange={(e) =>
																realTime.setIsRealTime(
																	e.target
																		.checked
																)
															}
														/>
													}
													label="予約方法_A"
												/>
												{realTime.isRealTime ? (
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
																summarize.isSummarize
															}
															onChange={(e) =>
																summarize.setIsSummarize(
																	e.target
																		.checked
																)
															}
														/>
													}
													label="予約方法_B"
												/>
												{realTime.isRealTime ? (
													<div>test</div>
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
									control={
										<Radio
											value="02"
											onChange={(e) =>
												setReception(e.target.value)
											}
										/>
									}
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
									control={
										<Radio
											value="03"
											onChange={(e) =>
												setReception(e.target.value)
											}
										/>
									}
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
