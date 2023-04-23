import { Button, styled } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const EndIcon = styled(ArrowBackIosNewIcon)({
    position: 'absolute',
    left: '2%',
    color: 'black',
    height: '0.8rem',
});

export const ChaptersDiv = styled('div')({
    gap: '1.5rem',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '1.5rem',
});

export const ChapterButton = styled(Button)({
    height: 'auto',
    minHeight: '3rem',
    width: '95%',
    backgroundColor: '#F4F4F4',
});

export const Chapter = styled('div')({
    alignItems: 'center',
    display: 'flex',
    height: 'auto',
    width: '100%',
    padding: '0 2% 0 2%',
    gap: '2%',
});

export const Icon = styled('img')({
    height: '1.8rem',
    width: '1.8rem',
});

export const TitleChapter = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
});

export const Title = styled('h1')({
    fontSize: '1rem',
    textAlign: 'right',
    color: 'black',
    margin: 0,
});

export const SubTitle = styled('p')({
    fontSize: '0.7rem',
    color: 'black',
    margin: 0,
});
