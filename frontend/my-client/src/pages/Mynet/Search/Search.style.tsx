import { Box, styled } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100%',
    height: '100%',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
});

export const MainHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 170px',
    flexDirection: 'row',
    paddingTop: '38px',
    fontSize: '15px',
    fontWeight: 700,
    textAlign: 'center',
});

export const BoundryLine = styled('div')({
    height: '0px',
    opacity: '0.2',
    border: '1px solid #DCDCDC',
    transform: 'rotate(180deg)',
    marginTop: '10px',
});

export const SearchBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: 2,
});

export const FilterLine = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    margin: '0 5% 0 6%',
    flexShrink: 2,
    marginTop: '2%',
    alignItems: 'center',
    marginBottom: '25px',
});

export const SelectAreaWrap = styled('div')({
    position: 'absolute',
    right: '5%',
    top: '20%',
});
