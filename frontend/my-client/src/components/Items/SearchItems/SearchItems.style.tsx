import { Grid, IconButton, styled, Typography } from '@mui/material';

export const ItemContainer = styled(Grid)({
    marginTop: '5%',
    height: '80px',
    backgroundColor: ' #FBFBFB',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    flexDirection: 'row',
    padding: 0,
    gap: '4%',
    alignSelf: 'center',
});

export const Title = styled(Typography)({
    fontWeight: 700,
    fontSize: '15px',
});

export const ItemDescription = styled('div')({
    weight: 400,
    fontSize: '13px',
    lineheight: '17px',
    alignItems: 'right',
});

export const IconContainer = styled(IconButton)({
    padding: 0,
    position: 'relative',
    bottom: '39%',
    right: '30px',
    zIndex: 999,
});
export const InfoDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
});
