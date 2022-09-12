import { useCallback, useEffect } from 'react';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FairContent } from '../template/';
import * as Button from '../components/Button';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import utils from '../style/Utils';
import { useAppDispatch, useFairSelector } from '../reducks/hooks';
import { addFair } from '../reducks/slice/fairSlice';
import { isSelectedNormalFairCategory, normalCategoryValues } from '../reducks/slice/onlineSlice';
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

	/**
	 * ２つの配列に重複した値があるかどうか調査する
	 * @param {string[]} arr1 比較対象配列1
	 * @param {string[]} arr2 比較対象配列2
	 * @returns {boolean} ２つの配列に重複した値があるかどうか
	 */
	const isDuplicate = useCallback((arr1: string[], arr2: string[]) => {
		return [...arr1, ...arr2].filter((item) => arr1.includes(item) && arr2.includes(item)).length > 0;
	}, []);

	// フェアカテゴリ選択時「通常フェア」に該当するカテゴリが選択されたかどうか
	useEffect(() => {
		const selectedCategories = fair.map((item) => item.category);
		const isSelectNormalCategory = isDuplicate(selectedCategories, normalCategoryValues);
		dispatch(isSelectedNormalFairCategory(isSelectNormalCategory));
	}, [fair]);

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
								<FairContent index={i} />
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
