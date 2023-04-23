import { styled, Typography, IconButton } from '@mui/material';

export const ItemSection = styled('div')(({ theme }) => ({
    height: '220px',
    width: '290px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
}));

export const ItemSectionFullWidth = styled('div')(({ theme }) => ({
    height: '240px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
}));

export const ItemTitle = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontSize: '16px',
    padding: '5px 0px 5px 0px',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    lineHeight: 'initial',
}));

export const ItemDescription = styled(Typography)(({ theme }) => ({
    color: 'grey',
    fontSize: '14px',
}));

export const Favorites = styled('div')(({ theme }) => ({
    position: 'relative',
    top: '-100%',
    right: '88%',
    width: '28px',
    height: '28px',
}));

export const FavoritesButton = styled(IconButton)(({ theme }) => ({
    position: 'relative',
    top: '-35px',
    height: '100%',
    width: '100%',
}));

export const FavoritesRibbon = styled('img')(({ theme }) => ({
    height: '100%',
    width: '100%',
}));
