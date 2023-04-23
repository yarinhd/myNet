import React from 'react';
import { useTranslation } from 'react-i18next';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import { IItem } from 'common-atom/interfaces/item.interface';
import { CategoryItems, TitleDiver, CategoryTitle, TitleWrap, ItemsArea, ItemWrap } from './ItemsByCategory.style';
import Item from '../Item/Item';
import { ItemCategory } from '../../../models/ItemCategories';

interface IProps {
    category: string;
    metadataItems: IPaginator<IItem>;
}

const ItemsByCategory: React.FC<IProps> = ({ metadataItems, category }) => {
    const { t } = useTranslation();

    const getItems = () => {
        const currCategory = ItemCategory.find((itemCategory) => itemCategory.value === category);
        return (
            <CategoryItems>
                <TitleWrap>
                    <TitleDiver contentColor={currCategory?.color} />
                    <CategoryTitle>{t(`${currCategory?.content}`)}</CategoryTitle>
                </TitleWrap>
                <ItemsArea>
                    {metadataItems.data.map((item) => (
                        <ItemWrap key={item._id}>
                            <Item item={item} isFullWidth />
                        </ItemWrap>
                    ))}
                </ItemsArea>
            </CategoryItems>
        );
    };
    return getItems();
};

export default ItemsByCategory;
