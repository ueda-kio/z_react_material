// import { useContext, useState } from 'react';
// import { ContextWrapper } from '../ContextWrapper';
import { Button } from '@mui/material';
import { useState } from 'react';
import FairContent from '../template/FairContent';

const FairContentWrapper = () => {
	// const { realTime, summarize, noReception } = useContext(ContextWrapper);
	// const [value, setValue] = useState('');
	const [contentLen, setContentLen] = useState(1);
	const [content, setContent] = useState([{ category: '' }]);

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">フェア内容</h2>
			</header>

			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">フェアコンテンツ</dt>
					<dd className="section__item__content">
						{content.map((_, i) => (
							<div className="section__contents" key={i}>
								<FairContent />
							</div>
						))}
						<Button
							variant="outlined"
							onClick={() =>
								setContent((prev) => [
									...prev,
									{ category: '' },
								])
							}
						>
							フェアコンテンツの追加
						</Button>
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default FairContentWrapper;
