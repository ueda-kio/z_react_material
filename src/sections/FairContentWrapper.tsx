import { useContext, useState } from 'react';
import { ContextWrapper } from '../ContextWrapper';
import { Button } from '@mui/material';
import { FairContent } from '../template/';

const FairContentWrapper = () => {
	const { fair } = useContext(ContextWrapper);

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">フェア内容</h2>
			</header>

			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">フェアコンテンツ</dt>
					<dd className="section__item__content">
						{fair.fairContents.map((_, i) => (
							<div className="section__contents" key={i}>
								<FairContent index={i} />
							</div>
						))}
						<Button
							variant="outlined"
							onClick={() =>
								fair.setFairContents((prev) => [
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
