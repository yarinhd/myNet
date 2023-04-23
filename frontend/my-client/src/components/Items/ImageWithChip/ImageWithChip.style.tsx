import { styled, Typography, ButtonBase } from '@mui/material';

export const ThumbNailImage = styled('img')(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: '3px',
}));

export const ThumbNailButton = styled(ButtonBase)(({ theme }) => ({
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'stretch',
}));

export const ContentType = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontSize: '11px',
    lineHeight: 'initial',
}));

export const Chip = styled('div')(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    bottom: 0,
}));

export const ContentChip = styled('div')(({ theme }) => ({
    backgroundColor: '#2D2D2D',
    width: 'fit-content',
    height: '18px',
    padding: '1px 6px 1px 6px',
    borderRadius: '7px 0px 3px 0px',
    display: 'flex',
    flexDirection: 'row',
}));

export const ExtraChip = styled('div')(({ theme }) => ({
    backgroundColor: '#2D2D2D',
    transform: 'skewY(293deg)',
    width: '15px',
    position: 'relative',
    left: '1px',
    top: '20px',
}));
