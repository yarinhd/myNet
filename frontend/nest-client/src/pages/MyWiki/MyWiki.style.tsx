import { styled, Button, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

const MainLayout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
});

export const SearchBox = styled(Box)({
    width: '15%',
    left: 0,
    right: 0,
    display: 'inline-block',
});

export const SearchArea = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
});

export const CreateButton = styled(Button)({
    borderRadius: 10,
    fontWeight: 'bold',
    position: 'absolute',
    gap: 20,
    right: '60%',
    backgroundColor: '#37862A',
    '&:hover': {
        backgroundColor: '#4ebf3c',
    },
});

export const WordsBox = styled(Box)({
    borderRadius: '15px 15px 0 0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
});

export const FilterArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '9rem',
    backgroundColor: '#EDEDED',
    paddingTop: 30,
    marginBottom: 30,
});

export const AlphaBetFilter = styled(ToggleButtonGroup)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '15px 30px 15px 30px',
});

export const AlphaBetButton = styled(ToggleButton)({
    backgroundColor: '#F8F8F8',
    border: '0',
    color: 'grey',
    maxWidth: '50px',
    maxHeight: '40px',
    minWidth: '50px',
    minHeight: '40px',
    '&.MuiToggleButtonGroup-grouped': {
        borderRadius: '18px !important',
    },
    '&:hover': {
        backgroundColor: '#d9d9d9',
    },
});

export default MainLayout;
