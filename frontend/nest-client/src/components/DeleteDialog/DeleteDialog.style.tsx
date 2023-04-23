import { Box, styled, Button } from '@mui/material';

export default styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    textAlign: 'center',
    margin: '1%',
    // width: '80%',
    height: 100,
    borderRadius: '15px',
}));

export const DeleteButton = styled(Button)({
    border: '2px solid #ff5c5c',
    minWidth: '6rem',
    maxWidth: '6rem',
    left: '1rem',
    bottom: '1rem',
    color: 'white',
    borderRadius: '20px',
    backgroundColor: '#FF0000',
    '&:hover': {
        backgroundColor: '#ff5c5c',
    },
});
