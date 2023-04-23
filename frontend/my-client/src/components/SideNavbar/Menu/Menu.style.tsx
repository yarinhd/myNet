import { Box, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100vw',
    height: '100vh',
    backgroundColor: '#2D2D2D',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
});

export const MainHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 30px',
    flexDirection: 'row',
    paddingTop: '30px',
});

export const Logo = styled('img')({
    width: '10%',
    marginRight: '45%',
});

export const MenuBarFilter = styled(ToggleButtonGroup)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '25px',
    width: '150px',
});

export const MenuBarButtons = styled(ToggleButton)({
    border: '0',
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    maxWidth: '150px',
    maxHeight: '40px',
    minWidth: '50px',
    minHeight: '40px',
    fontWeight: 400,
    fontSize: '16px',
    '&.MuiToggleButtonGroup-grouped': {
        borderRadius: '20px !important',
    },
    '&:focus': {
        color: '#3EB489',
    },
});

export const ProfileLine = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15px',
    marginRight: '4%',
});

export const Ellipse = styled(Box)({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: '#3EB489',
});

export const Logout = styled('div')({
    color: '#3EB489',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
});
