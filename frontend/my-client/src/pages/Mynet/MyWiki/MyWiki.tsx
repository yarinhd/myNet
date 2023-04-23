import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Collapse, IconButton } from '@mui/material';
import { IMyWiki } from 'common-atom/interfaces/myWiki.interface';
import bannerImage from '../../../assets/images/mywiki/MyWikiBanner.png';
import { ReactComponent as BookIcon } from '../../../assets/images/mywiki/books.svg';
import SearchInput from '../../../components/Inputs/SearchInput/SearchInput';
import MainLayout, {
    SearchBox,
    AlphaBetFilter,
    AlphaBetButton,
    Banner,
    MainTitle,
    TitleIcon,
    SearchContainer,
} from './MyWiki.style';
import alphaBetHebrew from '../../../models/AlphaBetHebrew';
import MyWikiService from '../../../services/myWiki';
import config from '../../../config';
import InfiniteScroll, { Catagory } from '../../../components/Tools/InfiniteScroll/InfiniteScroll';
import WikiItem from '../../../components/WikiItem/WikiItem';
import MyWikiCategory from '../../../models/MyWikiCategory';
import Navbar from '../../../components/SideNavbar/Navbar/Navbar';

const MyWiki: React.FC = () => {
    const { t } = useTranslation();
    const [letterSelected, setLetterSelected] = useState<string | undefined>(undefined);
    const [searchValue, setSearchValue] = useState<string>('');
    const [myWikis, setMyWikis] = useState<IMyWiki[]>([]);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const [categories, setCategories] = useState<MyWikiCategory[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const infiScrollRef = useRef<HTMLDivElement>(null);
    const searchDivRef = useRef<HTMLDivElement>(null);
    const [searchWidth, setSearchWidth] = useState<string>('100%');

    const resetMyWikiList = () => {
        setSkip(0);
        setTotalDocs(0);
        setMyWikis([]);
        setCategories([]);
    };

    const handleLetterSelect = (letter: string | undefined) => {
        setLetterSelected(letter);
        resetMyWikiList();
    };

    const createAlphaButtons = () => {
        return alphaBetHebrew.map((letter) => {
            return (
                <AlphaBetButton value={letter} key={letter}>
                    {letter}
                </AlphaBetButton>
            );
        });
    };

    const handleSearch = (search: string) => {
        if (search) {
            setLetterSelected(undefined);
            resetMyWikiList();
        } else {
            handleLetterSelect(undefined);
        }
    };

    const fetchData = async (search = letterSelected || searchValue) => {
        setIsFetching(true);
        const res = await MyWikiService.getMyWiki(skip, config.myWiki.wordsPerPage, search);
        if (res.data.length) {
            setSkip(skip + config.myWiki.wordsPerPage);
            setTotalDocs(res.metadata.totalDocs);
            setMyWikis([...myWikis, ...res.data]);
            if (!letterSelected) handleNoLetterSearch(res.data);
            setIsFetching(false);
        }
    };

    const handleNoLetterSearch = (fetchedWikis: IMyWiki[]) => {
        const updatedCategories: MyWikiCategory[] = [...categories];
        fetchedWikis.forEach((wiki: IMyWiki) => {
            const firstChar: string = wiki.word.charAt(0);
            if (updatedCategories.length && updatedCategories.at(-1)?.category === firstChar) {
                updatedCategories.at(-1)?.docs.push(wiki);
            } else {
                const newCategory: MyWikiCategory = { category: firstChar, docs: [wiki] };
                updatedCategories.push(newCategory);
            }
        });
        setCategories(updatedCategories);
    };

    const createWikis = (wikisArray: IMyWiki[]) => {
        return wikisArray.map((myWiki, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <WikiItem key={index} wikiWord={myWiki} wordToMark={searchValue} />;
        });
    };

    const handleSearchMove = () => {
        if (searchDivRef.current && infiScrollRef.current) {
            const scrollPos = infiScrollRef.current.getBoundingClientRect();
            const searchPos = searchDivRef.current.getBoundingClientRect();
            if (searchPos.top - scrollPos.top <= 30) {
                setSearchWidth('92%');
            } else {
                setSearchWidth('100%');
            }
        }
    };

    useEffect(() => {
        if (!myWikis.length) fetchData();
    }, [myWikis]);

    return (
        <MainLayout>
            <InfiniteScroll
                loadNext={fetchData}
                loading={<p>lol loser</p>}
                precentToLoad={85}
                hasMore={totalDocs !== myWikis.length}
                isLoading={isFetching}
                onScrollListeners={[handleSearchMove]}
                useRef={infiScrollRef}
            >
                <Banner src={bannerImage} alt="My Wiki Banner" />
                <Navbar iconColor="black" />
                <MainTitle>
                    <TitleIcon>
                        <BookIcon />
                    </TitleIcon>
                    <Typography variant="h5">MyWiki</Typography>
                </MainTitle>
                <SearchContainer ref={searchDivRef}>
                    <SearchBox style={{ width: searchWidth }}>
                        <SearchInput
                            searchValue={searchValue}
                            placeHolder={t('AMAN_WIKI.SEARCH') || ''}
                            handleSearch={handleSearch}
                            setSearchValue={setSearchValue}
                            leftContent={
                                <Collapse in={!!searchValue} orientation="horizontal">
                                    <IconButton
                                        onClick={() => {
                                            setSearchValue('');
                                            resetMyWikiList();
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Collapse>
                            }
                        />
                    </SearchBox>
                </SearchContainer>
                <AlphaBetFilter
                    value={letterSelected}
                    exclusive
                    onChange={(_event, letter) => {
                        handleLetterSelect(letter);
                    }}
                >
                    {createAlphaButtons()}
                </AlphaBetFilter>
                {!letterSelected && !searchValue
                    ? categories.map((category) => {
                          return (
                              <Catagory key={category.category} title={category.category}>
                                  {createWikis(category.docs)}
                              </Catagory>
                          );
                      })
                    : createWikis(myWikis)}
            </InfiniteScroll>
        </MainLayout>
    );
};

export default MyWiki;
