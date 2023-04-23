import { styled, Select } from '@mui/material';

export const ControlsArea = styled('div')({
    width: '90%',
    height: '1.4rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
});

export const SpeedSelect = styled(Select)({
    border: 'none',
    fontWeight: 'bold',
    color: 'black',
    '& .MuiSvgIcon-root': { display: 'none' },
    '& .MuiSelect-select': { paddingRight: '0px !important' },
});
