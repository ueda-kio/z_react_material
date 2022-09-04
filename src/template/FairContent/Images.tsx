import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
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
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
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

const Images = () => {
	const [images, setImages] = useState([
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img1' },
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img2' },
		{ id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=img3' },
	]);

	const handleChange: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
		console.log(e);
	}, []);

	const handleDelete = useCallback((id: string) => {
		setImages((v) => v.filter((image) => image.id !== id));
	}, []);

	const addPhoto = useCallback(() => {
		setImages((v) => {
			return [...v, { id: nanoid(), src: 'https://placehold.jp/3d4070/ffffff/150x150.png?text=add' }];
		});
	}, []);

	return (
		<div css={style.wrapper}>
			<Reorder.Group as="ol" axis="x" onReorder={setImages} values={images} css={style.list}>
				<AnimatePresence initial={false}>
					{images.map((image) => (
						<Reorder.Item
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							value={image}
							id={image.id}
							key={image.id}
							css={style.listItem}
						>
							<Image
								src={image.src}
								changeButton={{ text: '変更', onClick: handleChange }}
								deleteButton={{ text: '削除', onClick: () => handleDelete(image.id) }}
							/>
						</Reorder.Item>
					))}
				</AnimatePresence>
				{images.length < 3 ? (
					<motion.li
						initial={{ opacity: 0, display: 'none' }}
						animate={{ opacity: 1, display: 'initial' }}
						exit={{ opacity: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Image
							src="https://placehold.jp/3d4070/ffffff/150x150.png?text=add"
							changeButton={{ text: '変更', onClick: () => {} }}
							deleteButton={{ text: '削除', onClick: () => {} }}
							noSelect={{ isNoSelect: true, handleClick: addPhoto }}
						/>
					</motion.li>
				) : (
					false
				)}
			</Reorder.Group>
		</div>
	);
};

export default Images;
