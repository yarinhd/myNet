import { styled } from '@mui/material';
import { Document, Page } from 'react-pdf';

export const StyledDocument = styled(Document, {
    shouldForwardProp: (prop) => prop !== 'options',
})<{ options: Record<string, any> }>(({ theme, options }) => options);

export const PageByWidth = styled(Page)({
    backgroundColor: '#F6F6F5',
    width: '100%',
    canvas: {
        width: '100% !important',
        height: 'auto !important',
        margin: 'auto',
    },
});

export const PageByHeight = styled(Page)({
    backgroundColor: '#F6F6F5',
    height: '100%',
    canvas: {
        width: 'auto !important',
        height: '100% !important',
        margin: 'auto',
    },
});
