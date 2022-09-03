import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, Reorder, MotionValue, useMotionValue } from 'framer-motion';
import { nanoid } from 'nanoid';
import { css } from '@emotion/react';
import Image from '../../components/Image/Image';
import utils from '../../style/Utils';

const style = {
	wrapper: css`
		margin-top: 28px;
		padding-top: 28px;
		border-top: ${utils.border};
	`,
	list: css`
		display: flex;
		gap: 12px;
	`,
	listItem: css`
		width: 100%;
	`,
	image: css`
		width: 200px;
		height: 200px;
		background-color: black;
	`,
};

const handleChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
	console.log(e);
};
const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
	console.log(e);
};

const Images = () => {
	const [images, setImages] = useState([
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img1' },
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img2' },
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img3' },
	]);
	console.log(images);

	return (
		<div css={style.wrapper}>
			<Reorder.Group as="ul" axis="x" onReorder={setImages} values={images} css={style.list}>
				<AnimatePresence initial={false}>
					{images.map((image) => (
						<Reorder.Item value={image} id={image.id} key={image.id} css={style.listItem}>
							<Image
								src={image.src}
								changeButton={{ text: '変更', onClick: handleChange }}
								deleteButton={{ text: '削除', onClick: handleDelete }}
							/>
						</Reorder.Item>
					))}
				</AnimatePresence>
			</Reorder.Group>
		</div>
	);
};

export default Images;
