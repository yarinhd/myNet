import { Checkbox, styled } from '@mui/material';

export const FilterRows = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

export const GreenCheckBox = styled(Checkbox)({
    color: 'success',
});
