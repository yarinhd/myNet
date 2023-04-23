import { InputBase, styled } from '@mui/material';

export const SearchArea = styled('div')(({ theme }) => ({
    borderRadius: 5,
    backgroundColor: '#F8F8F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
}));

export const SearchInputArea = styled(InputBase)(({ theme }) => ({
    marginRight: 10,
    fullWidth: true,
}));

export default SearchArea;
