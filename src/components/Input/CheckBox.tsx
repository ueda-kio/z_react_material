import React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import { Checkbox, FormControlLabel } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledForm = styled(FormControlLabel)(({ theme }) => ({
	'& .MuiCheckbox-root': {
		padding: '6px',
	},
}));

type Props = {
	label: string;
	isSmall?: boolean;
} & React.ComponentProps<'input'>;

const CheckBox: React.FC<Props> = ({
	label,
	checked,
	onChange,
	disabled,
	isSmall = false,
}) => {
	return (
		<StyledForm
			control={
				<Checkbox
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					size={isSmall ? 'small' : 'medium'}
					icon={<RadioButtonUncheckedIcon />}
					checkedIcon={<CheckCircleIcon />}
				/>
			}
			sx={
				isSmall
					? {
							'& .MuiFormControlLabel-label': {
								fontSize: '0.8rem',
							},
					  }
					: undefined
			}
			label={label}
		></StyledForm>
	);
};

export default CheckBox;
