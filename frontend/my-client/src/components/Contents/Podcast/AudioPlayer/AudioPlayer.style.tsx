import { styled, IconButton } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100%',
    alignItems: 'center',
    justifyContent: ' flex-start',
    marginBottom: '1rem',
});

export const PlayButton = styled(IconButton)({
    backgroundColor: 'black',
    width: '2.2rem',
    height: '2.2rem',
    display: 'flex',
    justifyContent: 'center',
    color: 'white !important',
});

export const TimeArea = styled('div')({
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
});

export const TimeText = styled('p')({
    fontSize: '0.75rem',
    marginTop: 0,
});

export const Track = styled('input', {
    shouldForwardProp: (prop) => prop !== 'progress',
})<{ progress?: number }>(({ theme, progress }) => ({
    width: '90%',
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

export const DisplayAudio = styled('div')({
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'row',
    height: '22px',
});
