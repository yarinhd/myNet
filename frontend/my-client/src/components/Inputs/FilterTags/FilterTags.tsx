import React from 'react';
import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFilterTag } from '../../../models/FilterTagsHomePage';
import { TextButton, FilterTagsArea } from './FilterTags.style';

interface IProps<T> {
    tags: IFilterTag[];
    color?: {
        selected?: string;
        selectedText?: string;
        text?: string;
    };
    selected: { value: T | ''; set: (value: T | '') => void };
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const FilterTags = <T extends any>({ tags, color, selected }: IProps<T>) => {
    const { t } = useTranslation();

    const handleSelectTag = (event: any) => {
        if (event.target.value !== selected.value) {
            selected.set(event.target.value);
        } else {
            selected.set('');
        }
    };

    const getFilterTags = () => {
        return tags.map((tag) => {
            return typeof tag.content === 'string' ? (
                <TextButton
                    key={tag.value}
                    className={selected.value === tag.value ? 'selected' : ''}
                    onClick={handleSelectTag}
                    value={tag.value}
                    disableRipple
                    disableFocusRipple
                    textColor={color?.text}
                >
                    {t(tag.content)}
                </TextButton>
            ) : (
                <IconButton key={tag.value} sx={{ backgroundColor: '#F2F2F2' }}>
                    {tag.content}
                </IconButton>
            );
        });
    };

    return <FilterTagsArea selectedColor={color?.selected}>{getFilterTags()}</FilterTagsArea>;
};

FilterTags.defaultProps = {
    color: undefined,
};

export default FilterTags;
