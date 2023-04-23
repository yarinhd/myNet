import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

export const ChapterFilter = styled(ToggleButtonGroup)({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '25px 0 25px 0px',
});

export const ChapterButton = styled(ToggleButton)({
    backgroundColor: '#F2F2F2',
    color: '#6F6E6E',
    fontSize: '13px',
    minHeight: '25px',
    maxHeight: '25px',
    height: '100%',
    border: '0',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    '&.MuiToggleButtonGroup-grouped': {
        borderRadius: '18px !important',
    },
    '&.Mui-selected': {
        backgroundColor: '#2D2D2D !important',
        color: '#FFFFFF !important',
    },
});
