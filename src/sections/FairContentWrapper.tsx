import { useContext } from 'react';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FairContent } from '../template/';
import * as Contexts from '../context/contexts';
import * as Button from '../components/Button';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import utils from '../style/Utils';

const style = css`
	& + & {
		margin-top: 32px;
		padding-top: 32px;
		border-top: ${utils.border};
	}
`;

const FairContentWrapper = () => {
	const { fairContents, dispatch_fair } = useContext(Contexts.FairContext);

	const handle = () => {
		dispatch_fair({
			type: 'ADD',
		});
	};

	return (
		<Section title="フェア内容">
			<SectionItem title="フェアコンテンツ">
				<AnimatePresence>
					{fairContents.map((content, i) => (
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} css={style} key={content.id}>
							<FairContent index={i} />
						</motion.div>
					))}
				</AnimatePresence>
				<Button.Secondary sx={{ marginTop: 4 }} onClick={handle}>
					フェアコンテンツの追加
				</Button.Secondary>
			</SectionItem>
		</Section>
	);
};

export default FairContentWrapper;
