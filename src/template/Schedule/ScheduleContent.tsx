import { TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { css } from '@emotion/react';
import * as Contexts from '../../context/contexts';
import AlertMessage from '../../components/utils/AlertMessage';

type Props = {
	category: string;
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

const ScheduleContent: React.FC<Props> = ({ category }) => {
	const { isSummarize } = useContext(Contexts.SummarizeContext);
	const [cassette, setCassette] = useState([{ id: nanoid() }]);
	const categories = ['相談会', '模擬挙式', '模擬披露宴', '試食会', '試着会'];

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
		<div className="c-cassette">
			<div className="c-cassette__header">
				{categories[Number(category) - 1]}
			</div>

			<div className="c-cassette__body">
				{!cassette.length ? (
					<AlertMessage text="開催時間を１つ以上選択してください。" />
				) : (
					cassette.map((item) => (
						<div css={style.wrapper} key={item.id}>
							<div css={style.head}>
								<div>
									<TextField
										label="開始時間"
										variant="outlined"
									/>
								</div>
								<button
									type="button"
									onClick={() => deleteSelf(item.id)}
								>
									削除
								</button>
							</div>
							{isSummarize ? (
								<AlertMessage text="まとめて予約設定中のため、種別を変更することはできません。" />
							) : (
								false
							)}
							<div css={style.body}>
								<p css={style.title}>タイトル</p>
								<TextField hiddenLabel fullWidth />
							</div>
						</div>
					))
				)}
				<p>
					<button type="button" onClick={addScheduleContent}>
						開催時間を追加
					</button>
				</p>
			</div>
		</div>
	);
};

export default ScheduleContent;
