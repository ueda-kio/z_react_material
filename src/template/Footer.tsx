import React, { useContext } from 'react';
import { ContextWrapper } from '../ContextWrapper';

const Footer: React.FC = () => {
	const { providerValue } = useContext(ContextWrapper);

	return (
		<footer className="c-footer">
			<span className="c-footer__logo">{providerValue.value}</span>
			<nav>
				<ul className="c-footer__list">
					<li className="c-footer__list__item">item</li>
					<li className="c-footer__list__item">item</li>
					<li className="c-footer__list__item">item</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
