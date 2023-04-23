import { styled, Button } from '@mui/material';

export const TextButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'textColor',
})<{ textColor?: string }>(({ theme, textColor }) => ({
    height: '2rem',
    color: textColor ?? 'black',
    backgroundColor: '#F2F2F2 !important',
    borderRadius: '18px',
    fontWeight: 400,
}));

export const FilterTagsArea = styled('div', {
    shouldForwardProp: (prop) => prop !== 'selectedColor',
})<{ selectedColor?: string }>(({ theme, selectedColor }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '4% 0 2% 0',
    '& .selected': {
        color: 'white',
        backgroundColor: selectedColor ? `${selectedColor} !important` : ` ${theme.palette.primary.main} !important`,
    },
}));
