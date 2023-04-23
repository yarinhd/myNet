import { Button, Grid, IconButton, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const EndIcon = styled(ArrowBackIosNewIcon)({
    position: 'absolute',
    left: '2%',
    color: 'black',
    height: '0.8rem',
});

export const ChaptersDiv = styled('div')({
    position: 'absolute',
    left: '100vw',
    transformOrigin: 'top left',
    transform: 'rotate(90deg)',
    width: '100vh',
    height: '100vw',
    padding: '0 0 0 0',
});

export const TitleAndLeave = styled('div')({ display: 'flex', width: '40%', alignItems: 'center' });

export const Menu = styled('div')({
    position: 'sticky',
    top: '0',
    display: 'flex',
    justifyContent: 'space-between',
    height: '3rem',
    alignItems: 'center',
    width: '100%',
});

export const ChapterCenter = styled(Grid)({
    display: 'flex',
    height: '2.5rem',
    width: '70%',
});

export const Logo = styled('img')({
    filter: 'invert(1)',
    height: '3.5rem',
    width: '3.5rem',
});

export const ExitDialog = styled(IconButton)({
    position: 'relative',
});

export const ChangeChapter = styled(Button)({
    position: 'relative',
    overflowWrap: 'break-word',
    '&.MuiButton-text': {
        fontSize: '1rem',
        color: 'black',
    },
    '&.Mui-disabled': {
        '&.MuiButton-text': {
            color: 'grey',
        },
    },
});

export const Title = styled('h1')({
    fontSize: '1.2rem',
    color: 'white',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    margin: 0,
});

export const ChapterTitle = styled('div')({
    padding: '0 1rem 0 1rem',
    backgroundColor: '#252D40',
    borderRadius: '50px',
    height: '100%',
    width: '100%',
    textOverflow: 'ellipsis',
    textAlign: 'center',
});
