import { styled, Tab, Tabs } from '@mui/material';

export const NavigationMenu = styled(Tabs, {
    shouldForwardProp: (prop) => prop !== 'itemColor',
})<{ itemColor?: string }>(({ theme, itemColor }) => ({
    width: '100%',
    backgroundColor: '#2B2B2B',
    '& .Mui-selected': {
        color: itemColor ?? theme.palette.primary.main,
        fontSize: 'max(0.95vw,0.9em)',
        fontWeight: 600,
    },
    '& .MuiTabs-indicator': {
        height: '3.5px',
    },
}));

export const MenuItem = styled(Tab, {
    shouldForwardProp: (prop) => prop !== 'itemColor',
})<{ itemColor?: string }>(({ theme, itemColor }) => ({
    color: itemColor ?? '#FFFFFF',
    fontWeight: 200,
}));
