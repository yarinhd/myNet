import { styled } from '@mui/material';

export const MainLayout = styled('div')({
    width: '100%',
    backgroundColor: '#F2F2F2',
    marginTop: '1.5rem',
    padding: '0 1rem 0 1rem',
});

export const Title = styled('p')({
    fontSize: '1.3rem',
    fontWeight: 600,
});

export const Text = styled('p')({
    color: 'black',
    fontWeight: 'bold',
});

export const Description = styled('p')({
    paddingLeft: '2rem',
    color: '#6F6E6E',
    fontWeight: 500,
    '&.description-close': {
        wordBreak: 'break-word',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
});
