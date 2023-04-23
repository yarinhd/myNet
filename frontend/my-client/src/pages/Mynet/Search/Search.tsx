import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import { FmdGood } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IItem, IItemQuery } from 'common-atom/interfaces/item.interface';
import { IArea } from 'common-atom/interfaces/area.interface';
import { Category } from 'common-atom/enums/Category';
import { Section } from 'common-atom/enums/Section';
import { IPaginator } from 'common-atom/interfaces/helpers/paginator.interface';
import { MainLayout, MainHeader, BoundryLine, SearchBox, FilterLine, SelectAreaWrap } from './Search.style';
import SearchInput from '../../../components/Inputs/SearchInput/SearchInput';
import ToolTip from '../../../components/Items/ToolTipItems/ToolTipItems';
import ItemService from '../../../services/item';
import config from '../../../config';
import AllItem from '../../../components/Items/AllItems/AllItems';
import { Context } from '../../../Store';
import AreaService from '../../../services/area';
import Navbar from '../../../components/SideNavbar/Navbar/Navbar';
import SelectInput from '../../../components/Inputs/SelectInput/SelectInput';
import InfinityScroll from '../../../components/Tools/InfiniteScroll/InfiniteScroll';

const SearchPage: React.FC = () => {
    const { t } = useTranslation();
    const [state] = useContext(Context);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);
    const [queryFilter, setQueryFilter] = useState<IItemQuery>({
        areaId: state?.user?.area ? (state.user.area as IArea)._id : undefined,
    });
    const [areas, setAreas] = useState<IArea[]>([]);
    const navigate = useNavigate();
    const [items, setItems] = useState<IItem[] | IPaginator<IItem>>([]);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [areaName, setAreaName] = useState<string>('');

    useEffect(() => {
        const selectedArea = areas.find((area) => area._id === queryFilter.areaId);
        if (selectedArea) {
            setAreaName(selectedArea.name);
        } else {
            setAreaName('');
        }
    }, [queryFilter.areaId, areas]);

    useEffect(() => {
        fetchAreas();
    }, []);

    useEffect(() => {
        fetchData();
    }, [queryFilter]);

    const resetToolTip = () => {
        setQueryFilter({ areaId: queryFilter.areaId, search: queryFilter.search });
        setSkip(0);
        setTotalDocs(0);
    };

    const handleSelectedCategory = (categories: Category[]) => {
        if (categories) {
            setQueryFilter({ ...queryFilter, search: '' });
            setSkip(0);
            setTotalDocs(0);
            setItems([]);
            setQueryFilter({ ...queryFilter, categories, search: '' });
        }
    };

    const handleSelectedSection = (sections: Section[]) => {
        if (sections.length > 0) {
            setQueryFilter({ ...queryFilter, search: '' });
            setSkip(0);
            setTotalDocs(0);
            setQueryFilter({ ...queryFilter, sections, search: '' });
        } else {
            setQueryFilter({ ...queryFilter, search: '' });
            setSkip(0);
            setTotalDocs(0);
            setQueryFilter({ ...queryFilter, sections: undefined, search: '' });
        }
    };

    const handleSearch = (search: string) => {
        resetToolTip();
        setSkip(0);
        setTotalDocs(0);
        if (search === '') {
            setQueryFilter({ ...queryFilter, search: undefined });
        } else {
            setQueryFilter({ ...queryFilter, search });
        }
    };

    const fetchAreas = async () => {
        const res = await AreaService.getAreas();
        setAreas(res);
        setQueryFilter({ ...queryFilter, areaId: res[0]._id });
    };

    const fetchData = async () => {
        setIsLoading(true);
        const res = await ItemService.getItems({
            ...queryFilter,
            ...(queryFilter.categories?.length && { skip, limit: config.items.itemsPerPage }),
        });
        if (
            (res as IPaginator<IItem>).metadata &&
            queryFilter.categories &&
            queryFilter.categories.length > 0 &&
            (items as IPaginator<IItem>).data
        ) {
            setItems({
                metadata: (res as IPaginator<IItem>).metadata,
                data: [...(items as IPaginator<IItem>).data, ...(res as IPaginator<IItem>).data],
            });
        } else {
            setItems(res);
        }
        setIsLoading(false);
        setSkip(skip + config.items.itemsPerPage);
    };

    return (
        <MainLayout>
            <div style={{ boxShadow: '0px 1px 3px 1px #DCDCDC' }}>
                <MainHeader>
                    <Navbar iconColor="black" />
                    {t('SEARCH_PAGE.SEARCH')}
                </MainHeader>
                <BoundryLine />
                <IconButton onClick={() => navigate({ pathname: '/home' })}>
                    <KeyboardArrowRightIcon style={{ color: 'black', marginTop: '10px', marginRight: '5px' }} />
                </IconButton>

                <SearchBox>
                    <SearchInput
                        searchValue={queryFilter.search ?? ''}
                        handleSearch={handleSearch}
                        setSearchValue={(searchValue) => setQueryFilter({ ...queryFilter, search: searchValue })}
                        placeHolder=""
                        leftContent={
                            <Collapse in={!!queryFilter.search} orientation="horizontal">
                                <IconButton
                                    onClick={() => {
                                        setQueryFilter({ ...queryFilter, search: '' });
                                        handleSearch('');
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Collapse>
                        }
                    />
                </SearchBox>
                <FilterLine>
                    <SelectAreaWrap>
                        <SelectInput
                            color="gray"
                            selected={{
                                value: queryFilter.areaId ?? '',
                                set: (selectedValue) => {
                                    if (queryFilter && queryFilter.categories && queryFilter.categories.length > 0) {
                                        setItems([]);
                                        setSkip(0);
                                    }
                                    setQueryFilter({ ...queryFilter, areaId: selectedValue });
                                },
                            }}
                            options={areas.map((area) => ({
                                value: area._id,
                                label: `AREA_ITEMS.${area.name.toUpperCase()}`,
                            }))}
                            icon={<FmdGood />}
                        />
                    </SelectAreaWrap>
                    <ToolTip
                        tooltipOpen={{ value: tooltipOpen, set: setTooltipOpen }}
                        category={{ value: queryFilter.categories || [], set: handleSelectedCategory }}
                        section={{ value: queryFilter.sections || [], set: handleSelectedSection }}
                    />
                </FilterLine>
            </div>
            {(items as IPaginator<IItem>).metadata ? (
                <InfinityScroll
                    loadNext={fetchData}
                    loading={<div>{t('HOME_PAGE.INFINITY_SCROLL_LOADING')}</div>}
                    precentToLoad={90}
                    hasMore={
                        (items as IPaginator<IItem>).metadata.page * 7 < (items as IPaginator<IItem>).metadata.totalDocs
                    }
                    isLoading={isLoading}
                >
                    <AllItem items={(items as IPaginator<IItem>).data} selectedArea={areaName} />
                </InfinityScroll>
            ) : (
                <AllItem items={items} selectedArea={areaName} />
            )}
        </MainLayout>
    );
};
export default SearchPage;
