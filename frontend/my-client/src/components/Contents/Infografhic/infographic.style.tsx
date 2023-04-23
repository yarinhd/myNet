import { styled, Button, DialogContent, DialogActions, Dialog } from '@mui/material';

export const MainHeader = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    marginTop: '30px',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
}));

export const ZoomButton = styled(Button)(({ theme }) => ({
    width: 'fit-content',
    border: 'hidden',
    color: 'gray',
    fontSize: '12px',
}));

export const ExitButton = styled(Button)(({ theme }) => ({
    border: 0,
    alignSelf: 'flex-start',
    marginTop: '10px',
}));

export const AllDialog = styled(Dialog)(({ theme }) => ({
    margin: '-30px',
}));

export const MainDialog = styled(DialogActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px',
    overflow: 'hidden',
    margin: '0px',
}));

export const ImageDialog = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    overflow: 'hidden',
    height: '75vh',
}));
