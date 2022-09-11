import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { FairContent } from '../template/';
import * as Button from '../components/Button';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import utils from '../style/Utils';
import { useAppDispatch, useFairSelector, useIsOnlineSelector } from '../reducks/hooks';
import { addFair } from '../reducks/slice/fairSlice';
import { isSelectedNormalFairCategory, normalCategoryValues, onlineCategoryValues } from '../reducks/slice/onlineSlice';
import AlertMessage from '../components/utils/AlertMessage';

const style = css`
	& + & {
		margin-top: 32px;
		padding-top: 32px;
		border-top: ${utils.border};
	}
`;

const FairContentWrapper = () => {
	const dispatch = useAppDispatch();
	const { fair } = useFairSelector();
	const { online } = useIsOnlineSelector();

	const categoriesList = [
		{ id: nanoid(), value: '01', text: '相談会', disabled: false },
		{ id: nanoid(), value: '02', text: '模擬挙式', disabled: false },
		{ id: nanoid(), value: '03', text: '模擬披露宴', disabled: false },
		{ id: nanoid(), value: '04', text: '試食会', disabled: false },
		{ id: nanoid(), value: '05', text: '試着会', disabled: false },
		{ id: nanoid(), value: '06', text: 'その他１', disabled: false },
		{ id: nanoid(), value: '07', text: 'その他２', disabled: false },
	];
	const [categories, setCategories] = useState(categoriesList);

	/**
	 * オンライン相談会に該当するカテゴリ以外をdisabled
	 * @return {void}
	 */
	const setOnlyOnlineCategories = useCallback(() => {
		setCategories((v) => {
			return v.map((item) => {
				if (onlineCategoryValues.some((value) => value === item.value)) {
					return item;
				}
				return { ...item, disabled: true };
			});
		});
	}, []);

	// オンライン相談会フラグが変更された場合
	useEffect(() => {
		if (online.isOnline) {
			setOnlyOnlineCategories();
		} else {
			setCategories(categoriesList);
		}
	}, [online.isOnline]);

	/**
	 * ２つの配列に重複した値があるかどうか調査する
	 * @param {string[]} arr1 比較対象配列1
	 * @param {string[]} arr2 比較対象配列2
	 * @returns {boolean} ２つの配列に重複した値があるかどうか
	 */
	const isDuplicate = (arr1: string[], arr2: string[]) => {
		return [...arr1, ...arr2].filter((item) => arr1.includes(item) && arr2.includes(item)).length > 0;
	};

	// フェアカテゴリ選択時「通常フェア」に該当するカテゴリが選択されたかどうか
	useEffect(() => {
		const selectedCategories = fair.map((item) => item.category);
		const isSelectNormalCategory = isDuplicate(selectedCategories, normalCategoryValues);
		dispatch(isSelectedNormalFairCategory(isSelectNormalCategory));
	}, [fair]);

	// フェアコンテンツのカテゴリ選択時
	useEffect(() => {
		if (!fair.length) return;

		const selectedCategories = fair.map((item) => item.category);
		setCategories((v) => {
			return v.map((item) => {
				// オンラインフラグONではnormalフェアは常にdisabled
				if (online.isOnline && normalCategoryValues.some((value) => value === item.value)) {
					return { ...item, disabled: true };
				}

				// 選択済みのカテゴリをdisabled
				if (selectedCategories.some((value) => value === item.value)) {
					return { ...item, disabled: true };
				}

				return { ...item, disabled: false };
			});
		});
	}, [online.isOnline, fair]);

	const handleClickAddFair = useCallback(() => dispatch(addFair()), []);

	return (
		<Section title="フェア内容">
			<SectionItem title="フェアコンテンツ">
				{fair.length ? (
					<AnimatePresence>
						{fair.map((content, i) => (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								css={style}
								key={content.id}
							>
								<FairContent index={i} categories={categories} setCategories={setCategories} />
							</motion.div>
						))}
					</AnimatePresence>
				) : (
					<AlertMessage text="フェアコンテンツを1つ以上設定してください" />
				)}
				<Button.Secondary sx={{ marginTop: 4 }} onClick={handleClickAddFair}>
					フェアコンテンツの追加
				</Button.Secondary>
			</SectionItem>
		</Section>
	);
};

export default FairContentWrapper;
