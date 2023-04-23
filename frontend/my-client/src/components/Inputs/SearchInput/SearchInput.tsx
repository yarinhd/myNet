import React, { useState } from 'react';
import { SearchArea, SearchInputArea } from './SearchInput.Style';
import config from '../../../config';

interface IProps {
    searchValue: string;
    handleSearch: (search: string) => void;
    setSearchValue: (searchValue: string) => void;
    placeHolder: string;
    withDebounce?: boolean;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
}

const SearchInput: React.FC<IProps> = ({
    searchValue,
    handleSearch,
    setSearchValue,
    withDebounce,
    placeHolder,
    leftContent,
    rightContent,
}) => {
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

    return (
        <SearchArea>
            {rightContent}
            <SearchInputArea
                onChange={(event) => debounce(event.target.value)}
                placeholder={placeHolder}
                fullWidth
                value={searchValue || ''}
            />
            {leftContent}
        </SearchArea>
    );
};

SearchInput.defaultProps = {
    withDebounce: true,
};

export default SearchInput;
