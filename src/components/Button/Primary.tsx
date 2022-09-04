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
	borderRadius: '24px',
	backgroundColor: '#ea6077',
	fontWeight: 'bold',
	color: '#fff',
	lineHeight: '40px',
	'&:hover': {
		backgroundColor: '#d3566b',
	},
}));

const Primary: React.FC<Props> = ({ sx, size = 'medium', variant = 'outlined', onClick, children }) => {
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

export default Primary;
