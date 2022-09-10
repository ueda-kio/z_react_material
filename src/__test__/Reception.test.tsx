import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useConditionSelector, useReceptionUnitSelector, useReservationSelector } from '../reducks/hooks';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import Reception from '../sections/Reception';
import { store } from '../reducks/store/store';

describe('初期状態のテスト', () => {
	it('ラジオボタンの初期状態', () => {
		render(
			<Provider store={store}>
				<Reception />
			</Provider>
		);
		const radios = screen.getByRole('radio', { name: 'ネット・電話予約受付' });
		screen.debug(radios);
		expect(radios).toBeInTheDocument;
	});
});

describe('ラジオボタン選択時のテスト', () => {
	it('radio1選択', () => {
		render(
			<Provider store={store}>
				<Reception />
			</Provider>
		);
		const radio = screen.getByRole('radio', { name: /ネット・電話予約受付/ });
		fireEvent.click(radio);
		const realTimeRadio = screen.getByText('リアルタイム予約');
		const summarizeRadio = screen.getByText('まとめて予約');
		expect([realTimeRadio, summarizeRadio]).toBeInTheDocument;
	});
});
