import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';
import * as Contexts from '../../context/contexts';
import AlertMessage from '../../components/utils/AlertMessage';
import * as Cassette from '../../components/Cassette';
import * as Button from '../../components/Button';
import * as TextBox from '../../components/TextBox';
import { Box } from '@mui/system';

type Props = {
	category: string;
	unit: string;
};

const style = {
	wrapper: css`
		padding: 32px;
		background-color: #fff;
		box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 4px;
		border-radius: 16px;

		& + & {
			margin-top: 16px;
		}
	`,
	head: css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	`,
	body: css`
		margin-top: 12px;
	`,
	title: css`
		font-weight: bold;
	`,
};

const ScheduleContent: React.FC<Props> = ({ category, unit }) => {
	const { isRealTime } = useContext(Contexts.RealTimeContext);
	const { isSummarize } = useContext(Contexts.SummarizeContext);
	const { receptionUnit, dispatch_unit } = useContext(Contexts.ReceptionUnitContext);

	const [cassette, setCassette] = useState([{ id: nanoid() }]);
	const categories = ['相談会', '模擬挙式', '模擬披露宴', '試食会', '試着会'];

	console.log(cassette);

	/**
	 * 「削除」ボタンからコンテンツを削除する
	 * - filterメソッドから自分を除いた配列をsetStateに渡すことで、配列から特定の要素を削除する
	 */
	const deleteSelf = (id: string) => {
		setCassette(cassette.filter((item) => item.id !== id));
	};

	const addScheduleContent = () => {
		setCassette((prev) => [...prev, { id: nanoid() }]);
	};

	return (
		<Cassette.Cassette title={categories[Number(category) - 1]}>
			<>
				{!cassette.length ? (
					<AlertMessage text="開催時間を１つ以上選択してください。" />
				) : (
					cassette.map((item, i) =>
						isSummarize && i > 0 ? (
							false
						) : (
							<div css={style.wrapper} key={item.id}>
								<div css={style.head}>
									<div css={{ display: 'flex', gap: 20, alignItems: 'center' }}>
										<TextBox.Normal label="開始時間" />
										{isRealTime ? (
											<div css={{ display: 'flex', gap: 8, alignItems: 'center' }}>
												<TextBox.Normal
													label="予約枠"
													sx={{ width: 100 }}
													value={receptionUnit.number}
													disabled={isSummarize ? true : false}
												/>
												<Box css={isSummarize ? { opacity: 0.3 } : undefined}>
													{isSummarize ? (
														receptionUnit.unit === '01' ? (
															<>人</>
														) : (
															<>組</>
														)
													) : unit === '02' ? (
														<>組</>
													) : (
														<>人</>
													)}
												</Box>
											</div>
										) : (
											false
										)}
									</div>
									<Button.Secondary onClick={() => deleteSelf(item.id)}>削除</Button.Secondary>
								</div>
								{isSummarize ? <AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" /> : false}
								<div css={style.body}>
									<p css={style.title}>タイトル</p>
									<TextBox.Count limit={100} hiddenLabel fullWidth />
								</div>
							</div>
						)
					)
				)}
				<p>
					{!isSummarize ? (
						<Button.Secondary sx={{ marginTop: 4 }} size="small" onClick={addScheduleContent}>
							開催時間を追加
						</Button.Secondary>
					) : !cassette.length ? (
						<Button.Secondary sx={{ marginTop: 4 }} size="small" onClick={addScheduleContent}>
							開催時間を追加
						</Button.Secondary>
					) : (
						false
					)}
				</p>
			</>
		</Cassette.Cassette>
	);
};

export default ScheduleContent;
