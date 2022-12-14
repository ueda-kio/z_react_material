import React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import { Button } from '@mui/material';

type Props = {
	sx?: SxProps;
	size?: 'large' | 'medium' | 'small';
	variant?: 'text' | 'outlined' | 'contained';
	onClick?: React.MouseEventHandler;
	children: React.ReactNode;
};

const StyledButton = styled(Button)(({ theme }) => ({
	padding: theme.spacing(0, 6),
	border: '1px solid #d8d8d8',
	borderRadius: '24px',
	backgroundColor: '#fff',
	fontWeight: 'bold',
	color: '#595959',
	lineHeight: '40px',
	'&:hover': {
		borderColor: '#bfbfbf',
		backgroundColor: '#e8e8e8',
	},
}));

const Secondary: React.FC<Props> = ({ sx, size = 'medium', variant = 'outlined', onClick, children }) => {
	const styleOfSize = (() => {
		switch (size) {
			case 'large':
				return { height: '48px', padding: '0 47px', fontSize: '1rem' };
			case 'medium':
				return { height: '40px' };
			case 'small':
				return { height: '35px' };
		}
	})();
	return (
		<StyledButton sx={{ ...sx, ...styleOfSize }} variant={variant} onClick={onClick}>
			{children}
		</StyledButton>
	);
};

export default Secondary;
