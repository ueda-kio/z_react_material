import React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import { Radio as DefaultRadio, FormControlLabel } from '@mui/material';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';

const StyledForm = styled(FormControlLabel)(({ theme }) => ({
	'& .MuiRadio-root': {
		padding: '6px',
	},
}));

type Props = {
	label: string;
	isSmall?: boolean;
} & React.ComponentProps<'input'>;

const Radio: React.FC<Props> = ({
	label,
	value,
	checked,
	onChange,
	disabled,
	isSmall = false,
}) => {
	return (
		<StyledForm
			control={
				<DefaultRadio
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					size={isSmall ? 'small' : 'medium'}
					value={value}
					checkedIcon={<TripOriginOutlinedIcon />}
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

export default Radio;
