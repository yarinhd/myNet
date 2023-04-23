import React, { useState, useEffect } from 'react';
import { FmdGood } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Section } from 'common-atom/enums/Section';
import { Category } from 'common-atom/enums/Category';
import { IArea } from 'common-atom/interfaces/area.interface';
import { IItem } from 'common-atom/interfaces/item.interface';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import SelectInput from '../../../components/Inputs/SelectInput/SelectInput';
import { MainLayout, HomePageImage, SelectAreaWrap, ImgGradient } from './HomePage.style';
import HomePagePNG from '../../../assets/images/HomePage.png';
import Menu from '../../../components/Inputs/Menu/Menu';
import { HomePageItems } from '../../../models/NavigationItems';
import FilterTags from '../../../components/Inputs/FilterTags/FilterTags';
import { filterTagsHomePage } from '../../../models/FilterTagsHomePage';
import ItemService from '../../../services/item';
import AreaService from '../../../services/area';
import ItemsBySection from '../../../components/Items/ItemsBySection/ItemsBySection';
import ItemsByCategory from '../../../components/Items/ItemsByCategory/ItemsByCategory';
import InfinityScroll from '../../../components/Tools/InfiniteScroll/InfiniteScroll';
import UnitsLogo from '../../../components/Tools/UnitsLogo/UnitsLogo';
import { IItemGroup } from '../../../models/ItemCategories';
import { groupBy, sortObjectKeys } from '../../../utils/itemHelpers';
import Navbar from '../../../components/SideNavbar/Navbar/Navbar';

const LIMIT_ITEMS = 3;
const EMPTY_STR = '';

const HomePage: React.FC = () => {
    const [selectedArea, setSelectedArea] = useState<IArea | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<Category | ''>(EMPTY_STR);
    const [selectedSection, setSelectedSection] = useState<Section>(Section.OPERATIVE);
    const [areas, setAreas] = useState<IArea[]>([]);
    const [sectionItems, setSectionItems] = useState<IItemGroup>(undefined);
    const [categoryItems, setCategoryItems] = useState<IPaginator<IItem>>();
    const [skip, setSkip] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getAreas();
    }, []);

    useEffect(() => {
        getAllItems();
    }, [selectedArea, selectedCategory, selectedSection]);

    function wrapInitCategory(func: (...args: any) => void) {
        return (...args: any) => {
            if (selectedCategory !== EMPTY_STR) {
                setSelectedCategory(EMPTY_STR);
            }
            func(...args);
        };
    }

    const handleSelectCategory = (category: '' | Category) => {
        setSkip(0);
        setCategoryItems(undefined);
        setSelectedCategory(category);
    };

    const getAreas = async () => {
        const res = await AreaService.getAreas();
        setAreas(res);
        setSelectedArea(res[0]);
    };

    const getAllItems = async () => {
        if (selectedCategory === EMPTY_STR) getItemsBySection();
        else getItemsByCategory();
    };

    const getItemsByCategory = async () => {
        if (selectedArea?._id && selectedCategory !== EMPTY_STR) {
            setIsLoading(true);
            const res = (await ItemService.getItems({
                areaId: selectedArea._id,
                categories: [selectedCategory],
                skip,
                limit: LIMIT_ITEMS,
            })) as IPaginator<IItem>;
            setCategoryItems({
                metadata: { ...res.metadata },
                data: categoryItems ? [...categoryItems.data, ...res.data] : [...res.data],
            });
            setIsLoading(false);
            setSkip(skip + LIMIT_ITEMS);
        }
    };

    const getItemsBySection = async () => {
        if (selectedArea?._id && selectedCategory === EMPTY_STR) {
            const res = await ItemService.getItems({ areaId: selectedArea._id, sections: [selectedSection] });
            const itemsByCategory = sortObjectKeys(groupBy(res as IItem[], 'categories'));
            setSectionItems(itemsByCategory);
        }
    };

    return (
        <MainLayout>
            <Navbar iconColor="white" />
            <ImgGradient>
                <HomePageImage src={HomePagePNG} />
            </ImgGradient>
            <UnitsLogo />
            <SelectAreaWrap>
                <SelectInput
                    selected={{ value: selectedArea ?? EMPTY_STR, set: wrapInitCategory(setSelectedArea) }}
                    options={areas.map((area) => ({
                        value: area,
                        label: `AREA_ITEMS.${area.name.toUpperCase()}`,
                    }))}
                    icon={<FmdGood />}
                />
            </SelectAreaWrap>
            <Menu
                menuItems={HomePageItems}
                selected={{ value: selectedSection, set: wrapInitCategory(setSelectedSection) }}
            />
            <FilterTags
                tags={filterTagsHomePage}
                selected={{ value: selectedCategory, set: handleSelectCategory }}
                color={{ selected: 'black' }}
            />
            {selectedCategory === EMPTY_STR ? (
                <ItemsBySection itemsGroup={sectionItems} />
            ) : (
                categoryItems && (
                    <InfinityScroll
                        loadNext={getAllItems}
                        loading={<div>{t('HOME_PAGE.INFINITY_SCROLL_LOADING')}</div>}
                        precentToLoad={90}
                        hasMore={categoryItems.metadata.page * LIMIT_ITEMS < categoryItems.metadata.totalDocs}
                        isLoading={isLoading}
                    >
                        <ItemsByCategory metadataItems={categoryItems} category={selectedCategory} />
                    </InfinityScroll>
                )
            )}
        </MainLayout>
    );
};

export default HomePage;
