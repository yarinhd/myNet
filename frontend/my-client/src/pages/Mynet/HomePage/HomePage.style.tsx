import { styled } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'hidden',
});

export const HomePageImage = styled('img')({
    position: 'relative',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1,
});

export const ImgGradient = styled('div')({
    height: '26%',
    background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 35%)',
});

export const SelectAreaWrap = styled('div')({
    position: 'absolute',
    right: '5%',
    top: '18%',
});
