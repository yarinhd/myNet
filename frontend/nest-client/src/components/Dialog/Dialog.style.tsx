import { styled, Paper, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line import/prefer-default-export
export const DialogPaper = styled(Paper)({
    width: '70%',
    height: 'auto',
    padding: '2rem',
});

export const TitleDialog = styled(DialogTitle)({
    padding: '0',
    marginBottom: '1.5rem',
});

export const CloseButton = styled(IconButton)({
    width: '2rem',
    height: '2rem',
    position: 'absolute',
    left: '1rem',
    top: '1rem',
});
