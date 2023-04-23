import { styled } from '@mui/material';

export const CategoryContainer = styled('div')({
    width: 'auto',
    zIndex: -1,
});

export const CategoryTitle = styled('div')({
    background: '#F2F2F2',
    display: 'flex',
    alignContent: 'center',
    position: 'sticky',
    width: '100%',
    height: '3rem',
    paddingRight: '5%',
    alignItems: 'center',
    top: '8vh',
});

export default styled('div')({
    overflowX: 'hidden',
    overflowY: 'auto',
    gap: '2px',
    display: 'flex',
    width: '100vw',
    padding: '0 5% 0 5%',
    flexDirection: 'column',
    alignItems: 'center',
});
