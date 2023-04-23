import { IconButton, styled } from '@mui/material';

export const MainLayout = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isFullScreen',
})<{ isFullScreen?: boolean }>(({ theme, isFullScreen }) => ({
    ...(isFullScreen
        ? {
              width: '100vw',
              height: '100vh',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'black',
          }
        : { width: '100%', marginTop: '1.5rem' }),
}));

export const VideoTag = styled('video', {
    shouldForwardProp: (prop) => prop !== 'isFullScreen',
})<{ isFullScreen?: boolean }>(({ theme, isFullScreen }) => ({
    ...(isFullScreen
        ? { width: '100vw', height: '100vh', objectFit: 'contain' }
        : { width: '100%', borderRadius: '8px 8px 0 0' }),
}));

export const PlayButton = styled(IconButton)({
    width: '70%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    color: 'white !important',
    position: 'absolute',
    top: '10%',
    right: '15%',
});

export const ControlsWrap = styled('div')({
    position: 'absolute',
    bottom: 10,
    width: '100%',
    padding: '0 5%',
});

export const TimeArea = styled('div')({ color: 'white', textAlign: 'left', fontSize: '0.8rem' });

export const VideoWrap = styled('div', {
    shouldForwardProp: (prop) => prop !== 'isPlaying' && prop !== 'isFullScreen',
})<{ isPlaying?: boolean; isFullScreen?: boolean }>(({ theme, isPlaying, isFullScreen }) => ({
    borderRadius: '8px 8px 0 0',
    ...(isFullScreen
        ? { width: '100vw', height: '100vh' }
        : { width: '100%', height: '97%', borderRadius: '8px 8px 0 0' }),
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isPlaying ? 'transparent' : '#00000080',
}));

export const Track = styled('input', {
    shouldForwardProp: (prop) => prop !== 'progress',
})<{ progress?: number }>(({ theme, progress }) => ({
    width: '88%',
    height: '2px',
    WebkitAppearance: 'none',
    background: '#E0E0E0',
    backgroundImage: 'linear-gradient(#56CCF2, #56CCF2)',
    backgroundSize: `${progress ?? 0}% 100%`,
    backgroundRepeat: 'no-repeat',

    '::-webkit-slider-thumb': {
        WebkitAppearance: 'none',
        height: '4px',
        width: '4px',
        borderRadius: '50%',
        background: 'white',
        cursor: 'ew-resize',
        transition: 'background .3s ease-in-out',
    },
}));

export const PauseIconWrap = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    animation: 'hideAnimation 1.3s linear',
    animationFillMode: 'forwards',

    '@keyframes hideAnimation': {
        to: {
            visibility: 'hidden',
            opacity: 0,
        },
    },
});
