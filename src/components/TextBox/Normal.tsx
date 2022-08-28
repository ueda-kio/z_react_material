import React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
	borderRadius: theme.spacing(2),
	'& .MuiInputBase-root': {
		borderRadius: theme.spacing(2),
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: '#d8d8d8',
	},
}));

type Props = {
	sx?: SxProps;
	hiddenLabel?: boolean;
	label?: string;
	fullWidth?: boolean;
	multiline?: boolean;
	rows?: number;
	variant?: 'standard' | 'filled' | 'outlined';
} & React.ComponentProps<'input'> &
	React.ComponentProps<'textarea'>;

const Normal: React.FC<Props> = ({
	sx,
	hiddenLabel,
	label,
	fullWidth,
	multiline,
	rows,
	placeholder,
	name,
	value,
	variant = 'outlined',
	onChange,
}) => {
	return (
		<StyledTextField
			sx={sx}
			hiddenLabel={hiddenLabel}
			fullWidth={fullWidth}
			multiline={multiline}
			rows={rows}
			placeholder={placeholder}
			name={name}
			value={value}
			label={label}
			variant={variant}
			onChange={onChange}
		/>
	);
};

export default Normal;
