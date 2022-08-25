import { useContext } from 'react';
import { nanoid } from 'nanoid';
import { ContextWrapper } from '../ContextWrapper';
import { Button } from '@mui/material';
import { FairContent } from '../template/';
import * as Contexts from '../context/contexts';

const FairContentWrapper = () => {
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

	const handle = () => {
		dispatch_fair({
			type: 'ADD',
		});
	};

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">フェア内容</h2>
			</header>

			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">フェアコンテンツ</dt>
					<dd className="section__item__content">
						{fairContents.map((content, i) => (
							<div className="section__contents" key={content.id}>
								<FairContent index={i} />
							</div>
						))}
						<Button variant="outlined" onClick={handle}>
							フェアコンテンツの追加
						</Button>
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default FairContentWrapper;
