import { Button, styled, TextField } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const MainLayout = styled('div')({
    width: '100%',
    height: '100%',
});

export const FinalizingButton = styled(Button)({
    position: 'absolute',
    border: '2px solid #4E937A',
    minWidth: '6rem',
    maxWidth: '6rem',
    left: '1rem',
    bottom: '1rem',
    color: 'white',
    borderRadius: '20px',
    backgroundColor: '#3A6B59',
    '&:hover': {
        backgroundColor: '#4E937A',
    },
});

export const TextInput = styled(TextField)({
    width: '70%',
});
