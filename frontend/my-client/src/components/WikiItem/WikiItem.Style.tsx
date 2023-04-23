/* eslint-disable import/prefer-default-export */
import { Box, styled } from '@mui/material';

export const ItemArea = styled(Box)({
    width: '100vw',
    padding: '0px 5% 1rem 5%',
    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.25)',
    marginBottom: '2px',
});

export const Title = styled('h1')({
    fontSize: '1.1rem',
    marginBottom: '1rem',
});

export const DefinitionText = styled('p')({
    fontSize: '1rem',
    overflowWrap: 'break-word',
});

export const Mark = styled('span')({
    color: '#3EB489',
});
