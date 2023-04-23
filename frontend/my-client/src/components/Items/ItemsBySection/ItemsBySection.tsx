import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IItem } from 'common-atom/interfaces/item.interface';
import { Category } from 'common-atom/enums/Category';
import {
    MainLayout,
    CategoryItems,
    TitleDiver,
    CategoryTitle,
    TitleWrap,
    ItemsArea,
    ItemWrap,
} from './ItemsBySection.style';
import Item from '../Item/Item';
import { ItemCategory, IItemGroup } from '../../../models/ItemCategories';

interface IProps {
    itemsGroup: IItemGroup;
}

const ItemsBySection: React.FC<IProps> = ({ itemsGroup }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const scrollDivElements = Array.from(document.getElementsByClassName('category-items-scroll'));
        // eslint-disable-next-line no-restricted-syntax
        for (const element of scrollDivElements) {
            element.scrollLeft = 0;
        }
    }, [itemsGroup]);

    const getItemsByCategory = () => {
        if (itemsGroup) {
            return Object.keys(itemsGroup).map((category) => {
                const categoryObj = ItemCategory.find((itemCategory) => itemCategory.value === category);
                return (
                    <CategoryItems key={category}>
                        <TitleWrap>
                            <TitleDiver contentColor={categoryObj?.color} />
                            <CategoryTitle>{t(`${categoryObj?.content}`)}</CategoryTitle>
                        </TitleWrap>
                        <ItemsArea className="category-items-scroll">
                            {itemsGroup[category as Category].map((item: IItem) => (
                                <ItemWrap key={item._id}>
                                    <Item item={item} />
                                </ItemWrap>
                            ))}
                        </ItemsArea>
                    </CategoryItems>
                );
            });
        }
        return null;
    };

    return <MainLayout>{getItemsByCategory()}</MainLayout>;
};

export default ItemsBySection;
