import { styled, Grid, Typography } from '@mui/material';

export const GridContainerProperty = styled(Grid)({
    padding: '2% 0% 2% 0%',
});

export const GridItemProperty = styled(Grid)({
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
});

export const ContentProperty = styled(Typography)({
    fontSize: '14px',
    color: 'black',
    padding: '0px 3px 0px 3px',
});

export const UnitImage = styled('img')({
    width: '20px',
    height: '20px',
    margin: '0px 3px 0px 3px',
});
