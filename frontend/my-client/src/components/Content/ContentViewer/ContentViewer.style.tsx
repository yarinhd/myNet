import { styled, Grid, Typography, IconButton } from '@mui/material';

export const GridContainer = styled(Grid)({
    height: '30%',
    width: '100%',
    position: 'relative',
    top: '-95%',
});

export const GridItem = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const GridButtonsContainer = styled(Grid)({
    padding: '2% 0% 2% 0%',
});

export const TimeDescription = styled(Typography)({
    fontSize: '10px',
    color: 'white',
});

export const ContentTitle = styled(Typography)({
    fontSize: '24px',
    color: 'black',
});

export const ContentDescription = styled(Typography)({
    fontSize: '12px',
    color: 'grey',
    padding: '3% 0% 3% 0%',
});

export const BackButton = styled(IconButton)({
    padding: '0px',
    marginLeft: '35%',
});

export const Logo = styled('img')({
    width: '75%',
    height: '75%',
});
