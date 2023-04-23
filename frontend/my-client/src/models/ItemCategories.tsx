import { Category } from 'common-atom/enums/Category';
import { IItem } from 'common-atom/interfaces/item.interface';

export type IItemCategory = {
    value: Category | string;
    content: string;
    color?: string;
};

export type IItemGroup = { [key in Category]: IItem[] } | undefined;

export const ItemCategory: IItemCategory[] = [
    {
        value: Category.ONE,
        content: 'HOME_PAGE.FILTER_TAGS.FIELD',
        color: '#7A5E47',
    },
    {
        value: Category.TWO,
        content: 'HOME_PAGE.FILTER_TAGS.ENEMY',
        color: '#FE2828',
    },
    {
        value: Category.THREE,
        content: 'HOME_PAGE.FILTER_TAGS.MEANING_FOR_OUR_FORCE',
        color: '#2F80ED',
    },
];
