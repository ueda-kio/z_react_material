import React from 'react';
import Section from '../components/Section';
import SectionItem from '../components/SectionItem';

const BasicInfo = () => {
	return (
		<Section title="基本情報">
			<SectionItem title="フェアタイプ">
				<input type="text" name="fair_name" />
			</SectionItem>
		</Section>
	);
};

export default BasicInfo;
