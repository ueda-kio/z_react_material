import { useContext } from 'react';
import { css } from '@emotion/react';
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
				{fairContents.map((content, i) => (
					<div css={style} key={content.id}>
						<FairContent index={i} />
					</div>
				))}
				<Button.Secondary onClick={handle}>
					フェアコンテンツの追加
				</Button.Secondary>
			</SectionItem>
		</Section>
	);
};

export default FairContentWrapper;
