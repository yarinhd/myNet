import { styled, Box, ToggleButtonGroup, ToggleButton, SvgIcon } from '@mui/material';

const MainLayout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    paddingTop: '5%',
});

export const MainTitle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    alignItems: 'center',
    margin: '1rem 0 1rem 0',
});

export const TitleIcon = styled(SvgIcon)({
    marginBottom: '-5%',
    display: 'block',
    overflow: 'visible',
    transform: 'scale(1.3)',
});

export const Banner = styled('img')({
    width: '100%',
    marginBottom: '2%',
    borderRadius: '5px 5px 0 0',
});

export const SearchBox = styled(Box)({
    padding: '0 5% 2vh 5%',
    height: '8vh',
    minHeight: '8vh',
    transition: 'width 300ms',
});

export const SearchContainer = styled('div')({
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    width: '100vw',
    position: 'sticky',
    zIndex: 1,
    top: 0,
    display: 'flex',
    justifyContent: 'flex-end',
});

export const ScrollableDiv = styled('div')(({ theme }) => ({
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '90vw',
    height: '100vh',
    alignItems: 'center',
    gap: '20px',
}));

export const FilterArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90vw',
    height: '9rem',
    backgroundColor: '#EDEDED',
    paddingTop: 30,
    marginBottom: 30,
});

export const AlphaBetFilter = styled(ToggleButtonGroup)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4%',
    width: '100%',
    minHeight: '50px',
    overflowX: 'auto',
    overflowY: 'hidden',
});

export const AlphaBetButton = styled(ToggleButton)({
    backgroundColor: '#F8F8F8',
    border: '0',
    color: 'grey',
    maxWidth: '40px',
    margin: '0 5px 0 5px',
    maxHeight: '30px',
    minWidth: '40px',
    minHeight: '30px',
    '&.MuiToggleButtonGroup-grouped': {
        borderRadius: '18px !important',
    },
    '&:hover': {
        backgroundColor: '#F8F8F8',
    },
});

export default MainLayout;
