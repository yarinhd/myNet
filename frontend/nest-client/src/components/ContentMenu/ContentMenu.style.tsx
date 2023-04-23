import { styled, BottomNavigationAction, BottomNavigation } from '@mui/material';

export const ContentItem = styled(BottomNavigationAction, {
    shouldForwardProp: (prop) => prop !== 'itemColor' && prop !== 'inline',
})<{ itemColor?: string; inline: boolean }>(({ theme, itemColor, inline }) => ({
    width: inline ? '12.5%' : '25%',
    height: '50%',
    '&.Mui-selected': {
        color: itemColor,
        fontWeight: 'bold',
    },
    '&:hover': {
        color: itemColor,
        fontWeight: '700',
    },
    WebkitFlex: 'none',
    flex: 'none',
}));

export const IconsNavigation = styled(BottomNavigation, {
    shouldForwardProp: (prop) => prop !== 'inline',
})<{ inline: boolean }>(({ theme, inline }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: inline ? 'nowrap' : 'wrap',
}));
