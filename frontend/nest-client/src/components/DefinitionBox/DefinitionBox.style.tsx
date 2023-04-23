import { Box, Grid, styled } from '@mui/material';

export const DefinitionArea = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '70%',
    width: '92%',
    borderRadius: '12px 12px 0 0',
    marginBottom: '1.5%',
    boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
}));

export const Header = styled('div')(({ theme }) => ({
    width: '100%',
    minHeight: '50px',
    borderRadius: '12px 12px 0 0',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const HeaderItem = styled(Grid)(({ theme }) => ({
    paddingRight: '1%',
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
}));

export const ScrollableDiv = styled('div')(({ theme }) => ({
    overflow: 'auto',
}));
