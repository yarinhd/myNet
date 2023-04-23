import { styled } from '@mui/material';

const Header = styled('div')(({ theme }) => ({
    height: '16%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '12px 12px 0 0',
}));

export default Header;
