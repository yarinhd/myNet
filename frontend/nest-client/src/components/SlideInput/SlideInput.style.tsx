import { Grid, styled } from '@mui/material';

const MainLayout = styled(Grid, {
    shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color }) => ({
    margin: '0 5px 0 5px',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 'max(2vh,0.6em)',
    color: color ?? theme.palette.primary.main,
    fontWeight: 500,
}));

export default MainLayout;
