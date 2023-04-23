import { styled, Divider } from '@mui/material';

export const CategoryItems = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
});

export const TitleWrap = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

export const TitleDiver = styled(Divider, {
    shouldForwardProp: (prop) => prop !== 'contentColor',
})<{ contentColor?: string }>(({ theme, contentColor }) => ({
    backgroundColor: contentColor ?? theme.palette.text.primary,
    height: '2.2rem',
    width: '0.3rem',
    marginLeft: '0.6rem',
}));

export const CategoryTitle = styled('p')({
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#191919',
});

export const ItemsArea = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const ItemWrap = styled('div')({
    width: '100%',
    height: '100%',
});
