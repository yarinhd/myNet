import { Box, styled, Typography } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const MainLayout = styled(Box)(({ theme }) => ({
    background: '#EDEDED',
    display: 'flex',
    margin: '1%',
    // width: '80%',
    height: 100,
    borderRadius: '15px',
}));

export const WordDivider = styled('div')(({ theme }) => ({
    borderLeft: '2px solid black',
    height: '85%',
}));

export const TextWord = styled(Typography)(({ theme }) => ({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 'auto',
    whiteSpace: 'nowrap',
    marginLeft: '5%',
}));

export const TextDefinition = styled(Typography)(({ theme }) => ({
    textOverflow: 'ellipsis',
    height: 'auto',
    maxHeight: '100%',
    position: 'relative',
    overflow: 'hidden',
    width: 'auto',
    marginLeft: '2%',
}));

export const GridItem = styled('div')(({ theme }) => ({
    height: '100px',
    width: '100%',
    paddingRight: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const ActionDiv = styled('div')(({ theme }) => ({
    display: 'flex',
}));
