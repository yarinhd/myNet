import { styled, Grid, Drawer, Typography } from '@mui/material';

export const GridContainer = styled(Grid)({
    padding: '5%',
    width: '100%',
});

export const GridItem = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '5%',
});

export const BottomDrawer = styled(Drawer)({
    zIndex: '1300',
});

export const Logo = styled('img')({
    width: '40px',
    height: '40px',
});

export const Title = styled(Typography)({
    fontSize: '14px',
    color: 'black',
    wordBreak: 'break-word',
});

export const URL = styled(Typography)({
    fontSize: '12px',
    color: 'grey',
    wordBreak: 'break-all',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    direction: 'ltr',
});

export const AppName = styled(Typography)({
    fontSize: '11px',
    color: 'black',
    textAlign: 'center',
});
