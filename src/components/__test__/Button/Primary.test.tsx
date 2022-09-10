// import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Primary, Secondary } from '../../Button';

test('「test」が描画されている', () => {
	render(
		<>
			<Primary>これはPrimaryボタンです</Primary>
			<Secondary>これはSecondaryボタンです</Secondary>
		</>
	);
	const buttons = screen.getAllByRole('button');
	screen.debug(buttons); // DOM構造を確認したい場合に実行
	// expect(buttons).toBeInTheDocument();
	expect(buttons).toHaveLength(2);
});
