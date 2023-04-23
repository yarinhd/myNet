import { styled, Tab, Tabs } from '@mui/material';

export const TabsMenu = styled(Tabs)({
    display: 'flex',
    borderBottom: '0px solid #e8e8e8',
    justifyContent: 'space-between',
    '& .MuiTabs-indicator': {
        height: '4px',
    },
    '& .MuiTabs-root': {
        border: '0px',
    },
    width: '100%',
});

export const TabItem = styled(Tab)({
    flex: 1,
});
