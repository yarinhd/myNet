import React from 'react';
import { useTranslation } from 'react-i18next';
import { IItem } from 'common-atom/interfaces/item.interface';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import SearchItem from '../SearchItems/SearchItems';
import { MainLayout, SearchLayout } from './AllItems.style';
import searchImg from '../../../assets/images/search/searchImg.png';

interface IProps {
    items: IItem[] | IPaginator<IItem>;
    selectedArea: string | undefined;
}

const AllItem: React.FC<IProps> = ({ items, selectedArea }) => {
    const { t } = useTranslation();
    const data = Array.isArray(items) ? items : items.data || [];

    return (
        <MainLayout>
            {!data.length && (
                <SearchLayout>
                    <img src={searchImg} alt="search-img" />
                    {`${t('SEARCH_ITEMS.DIDNT_FOUND_ITEMS')} ${t(`AREA_NAMES.${selectedArea?.toUpperCase()}`)}`}
                </SearchLayout>
            )}
            {data.map((item) => {
                return <SearchItem item={item} key={`${item._id}_${item.categories[0]}`} />;
            })}
        </MainLayout>
    );
};

export default AllItem;
