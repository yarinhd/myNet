import { styled, Select } from '@mui/material';

export const MainLayout = styled('div', {
    shouldForwardProp: (prop) => prop !== 'contentColor',
})<{ contentColor?: string }>(({ theme, contentColor }) => ({
    color: contentColor ?? 'white',
    display: 'flex',
    alignItems: 'center',
}));

export const StyledSelect = styled(Select, {
    shouldForwardProp: (prop) => prop !== 'contentColor',
})<{ contentColor?: string }>(({ theme, contentColor }) => ({
    color: contentColor ?? 'white',
    fontSize: '1.2rem',
    fontWeight: 600,
    width: '7rem',
    height: '3rem',
    border: 'none',
    ' & .MuiSelect-icon': {
        position: 'static',
        color: contentColor ? `${contentColor} !important` : 'white !important',
    },
    ' & .MuiSelect-select': {
        paddingRight: '5px !important',
    },
}));
