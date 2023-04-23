import { styled, Box } from '@mui/material';

export const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2D2D2D',
    marginBottom: '20px',
});

export const BoundryLine = styled('div')({
    height: '0px',
    opacity: '0.2',
    border: '1px solid #FFFFFF',
    transform: 'rotate(180deg)',
    marginLeft: '6%',
    marginRight: '6%',
    marginTop: '20px',
});

export const AboutUsDiv = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    marginRight: '8%',
});

export const MainTitle = styled('div')({
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: 600,
});

export const SecondryTitle = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    gap: '5px',
    paddingTop: '20px',
    fontSize: '16px',
    fontWeight: 400,
});

export const Content = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    fontSize: '16px',
    fontWeight: 400,
    marginRight: '66px',
    gap: '5px',
});

export const UnitsLogo = styled('img')({
    width: '18px',
    Height: '16px',
});
