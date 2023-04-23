import { styled, Box } from '@mui/material';

export const MainLayout = styled(Box)({
    display: 'grid',
    width: '100%',
    height: '93%',
    gridTemplateAreas: `
    'right right left left'
    'bottom bottom bottom bottom'
    `,
    gridTemplateColumns: '1fr 1fr 1.3fr 1.3fr',
    gridTemplateRows: '40% 56%',
    gridGap: '4vh',
    padding: '3% 8% 4% 8%',
});

export const Section = styled(Box)({
    borderRadius: '12px 12px 0 0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
});

export const ContentGrid = styled('div')({
    width: '100%',
    height: '84%',
});
