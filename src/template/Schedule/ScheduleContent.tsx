import { TextField } from '@mui/material';
import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { ContextWrapper } from '../../ContextWrapper';
import * as Contexts from '../../context/contexts';

type Props = {
	category: string;
};

const ScheduleContent: React.FC<Props> = ({ category }) => {
	const categories = ['カテゴリ01', 'カテゴリ02', 'カテゴリ03'];

	const { isRealTime, dispatch_realTime } = useContext(
		Contexts.RealTimeContext
	);
	const { isSummarize, dispatch_summarize } = useContext(
		Contexts.SummarizeContext
	);
	const { isNoReception, dispatch_noReception } = useContext(
		Contexts.NoReceptionContext
	);
	const { isMultiEvent, dispatch_multiEvent } = useContext(
		Contexts.MultiEventContext
	);
	const { fairContents, dispatch_fair } = useContext(Contexts.FairContext);

	const [cassette, setCassette] = useState([{ id: nanoid() }]);

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
					<strong className="c-alert">
						開催時間を１つは選択しろ。
					</strong>
				) : (
					cassette.map((item) => (
						<div className="scheduleContent" key={item.id}>
							<div className="scheduleContent__head">
								<div className="scheduleContent__head__inputWrapper">
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
								<strong className="c-alert">
									まとめて予約設定中のため、種別を変更することはできません。
								</strong>
							) : (
								false
							)}
							<div className="scheduleContent__body">
								<p className="scheduleContent__title">
									タイトル
								</p>
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
