import { styled, Divider } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    msOverflowStyle: 'none',
    scrollWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
});

export const CategoryItems = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1.5rem',
});

export const TitleWrap = styled('div')({
    height: '20%',
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
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    msOverflowStyle: 'none',
    scrollWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
});

export const ItemWrap = styled('div')({
    marginLeft: '1rem',
});
