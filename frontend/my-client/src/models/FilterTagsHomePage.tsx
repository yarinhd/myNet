import React from 'react';
import { Search } from '@mui/icons-material';
import { Category } from 'common-atom/enums/Category';

export type IFilterTag = {
    value: Category | string;
    content: JSX.Element | string;
};

export const filterTagsHomePage: IFilterTag[] = [
    {
        value: Category.ONE,
        content: 'HOME_PAGE.FILTER_TAGS.FIELD',
    },
    {
        value: Category.TWO,
        content: 'HOME_PAGE.FILTER_TAGS.ENEMY',
    },
    {
        value: Category.THREE,
        content: 'HOME_PAGE.FILTER_TAGS.MEANING_FOR_OUR_FORCE',
    },
    {
        value: 'search',
        content: <Search />,
    },
];
