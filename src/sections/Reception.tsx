import { useContext, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

import {
	RealTimeContext,
	SummarizeContext,
	NoReceptionContext,
	MultiEventContext,
} from '../context/contexts';

const Reception = () => {
	const { dispatch_realTime } = useContext(RealTimeContext);
	const { dispatch_summarize } = useContext(SummarizeContext);
	const { isNoReception, dispatch_noReception } =
		useContext(NoReceptionContext);
	const { isMultiEvent } = useContext(MultiEventContext);

	// const {    } =
	// 	useContext(ContextWrapper);
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
								value={isNoReception ? '03' : reception}
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
																dispatch_realTime(
																	e.target
																		.checked
																		? 'TRUE'
																		: 'FALSE'
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
																isMultiEvent
															}
															onChange={(e) => {
																dispatch_summarize(
																	e.target
																		.checked
																		? 'TRUE'
																		: 'FALSE'
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
												{isMultiEvent ? (
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
