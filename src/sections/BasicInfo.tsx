import React from 'react';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';
import * as TextBox from '../components/TextBox';

const BasicInfo = () => {
	return (
		<Section title="基本情報">
			<SectionItem title="フェアタイプ">
				<TextBox.Count
					limit={30}
					label="フェア名"
					sx={{ width: 511 }}
				/>
			</SectionItem>
		</Section>
	);
};

export default BasicInfo;
