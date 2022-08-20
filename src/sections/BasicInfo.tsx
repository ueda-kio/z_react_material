import React, { useContext } from 'react';
import { ContextWrapper } from '../ContextWrapper';

const BasicInfo = () => {
	const { providerValue } = useContext(ContextWrapper);

	return (
		<section className="section">
			<header className="section__header">
				<h2 className="section__title">基本情報</h2>
			</header>
			<dl className="section__body">
				<div className="section__item">
					<dt className="section__item__head">フェアタイプ</dt>
					<dd className="section__item__content">
						<input
							type="text"
							name="fair_name"
							onChange={(e) =>
								providerValue.setValue(e.target.value)
							}
						/>
					</dd>
				</div>
			</dl>
		</section>
	);
};

export default BasicInfo;
