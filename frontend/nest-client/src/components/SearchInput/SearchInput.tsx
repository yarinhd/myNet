import { Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// eslint-disable-next-line import/no-named-as-default
import SearchArea, { SearchInputArea } from './SearchInput.Style';
import config from '../../config';

interface IProps {
    searchValue: string | undefined;
    handleSearch: (search: string) => void;
    setSearchValue: (searchValue: string) => void;
    placeHolder: string;
    withDebounce?: boolean;
}

const SearchInput: React.FC<IProps> = ({ searchValue, handleSearch, setSearchValue, withDebounce, placeHolder }) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<any>();

    const debounce = (value: string) => {
        setSearchValue(value);
        if (withDebounce) {
            clearTimeout(timerId);
            const newTimerId = setTimeout(() => {
                handleSearch(value);
            }, config.debounceTime);
            setTimerId(newTimerId);
        } else handleSearch(value);
    };

    useEffect(() => {
        if (searchValue) setChecked(true);
        else setChecked(false);
    }, [searchValue]);

    return (
        <SearchArea>
            <Collapse in={checked} orientation="horizontal">
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Collapse>
            <SearchInputArea
                onChange={(event) => debounce(event.target.value)}
                placeholder={placeHolder}
                fullWidth
                value={searchValue || ''}
            />
        </SearchArea>
    );
};

SearchInput.defaultProps = {
    withDebounce: true,
};

export default SearchInput;
