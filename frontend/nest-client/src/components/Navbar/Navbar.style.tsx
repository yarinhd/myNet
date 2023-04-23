import { styled, AppBar, Grid } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link, LinkProps } from 'react-router-dom';

export const NavigationBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    height: '8%',
    minHeight: '45px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}));

export const NavigationMenu = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    height: '100%',
});

export const MenuItem = styled(Link)<LinkProps>({
    color: 'white',
    width: '14%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: 'max(0.9vw,0.9em)',
    '&:hover': {
        fontSize: 'max(0.95vw,0.9em)',
        borderBottom: '2px solid',
        fontWeight: 'bold',
    },
    '&.selected': {
        fontSize: 'max(0.95vw,0.9em)',
        borderBottom: '2px solid',
        fontWeight: 'bold',
    },
});

export const Logo = styled('img')({
    width: '10%',
    height: '100%',
});

export const Profile = styled(Grid)({
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
});

export const ProfileIcon = styled(AccountCircle)({
    marginLeft: '0.5em',
    fontSize: 'max(2vw,1.6em)',
});
