import { css } from '@emotion/react';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(Button)(({ theme }) => ({
	height: theme.spacing(7),
	border: '1px solid #d8d8d8',
	color: '#fff',
	fontSize: '0.8rem',
	fontWeight: 'bold',
	borderRadius: '30px',
	'&:hover': {
		border: 0,
		backgroundColor: '#e8e8e8',
		color: '#595959',
	},
}));

const style = {
	wrapper: css`
		padding: 4px;
		border: 1px dotted #616161;
		border-radius: 8px;
	`,
	inner: css`
		position: relative;
		overflow: hidden;
		border-radius: 8px;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}

		&:hover > .hover-target {
			opacity: 1;
		}
	`,
	img: css`
		width: 100%;
		height: auto;
		object-fit: cover;
	`,
	buttonWrap: css`
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		width: 100%;
		height: 100%;
		background-color: rgba(32 32 32 / 70%);
		opacity: 0;
		transition: opacity 0.15s;
	`,
};

type ButtonProps = {
	text: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = {
	src: string;
	alt?: string;
	changeButton: ButtonProps;
	deleteButton: ButtonProps;
};

const Image: React.FC<Props> = ({ src, alt = '', changeButton, deleteButton }) => {
	return (
		<div css={style.wrapper}>
			<div css={style.inner}>
				<img css={style.img} src={src} alt={alt} />
				<div css={style.buttonWrap} className="hover-target">
					<StyledButton variant="outlined" startIcon={<AddPhotoAlternateIcon />} onClick={changeButton.onClick}>
						{changeButton.text}
					</StyledButton>
					<StyledButton variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={deleteButton.onClick}>
						{deleteButton.text}
					</StyledButton>
				</div>
			</div>
		</div>
	);
};

export default Image;
