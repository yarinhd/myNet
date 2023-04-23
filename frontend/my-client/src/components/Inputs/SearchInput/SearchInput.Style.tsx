import { InputBase, styled } from '@mui/material';

export const SearchArea = styled('div')(({ theme }) => ({
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    height: '100%',
    width: '92%',
}));

export const SearchInputArea = styled(InputBase)(({ theme }) => ({
    marginRight: 10,
    height: '100%',
    fullHeight: true,
    fullWidth: true,
}));
