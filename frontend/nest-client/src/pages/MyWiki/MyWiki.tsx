import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import MainLayout, {
    FilterArea,
    CreateButton,
    SearchBox,
    SearchArea,
    AlphaBetFilter,
    AlphaBetButton,
} from './MyWiki.style';
import DefinitionBox from '../../components/DefinitionBox/DefinitionBox';
import Navbar from '../../components/Navbar/Navbar';
import SearchInput from '../../components/SearchInput/SearchInput';
import alphaBetHebrew from '../../models/AlphaBetHebrew';
import { createMyWiki, getMyWiki, deleteMyWiki, editMyWiki } from '../../services/myWiki';
import { IMyWiki } from '../../common/interfaces/myWiki.interface';
import config from '../../config';
import Dialog from '../../components/Dialog/Dialog';
import MyWikiDialog from '../../components/MyWikiDialog/MyWikiDialog';

const MyWiki: React.FC = () => {
    const { t } = useTranslation();
    const [letterSelected, setLetterSelected] = useState<string | undefined>(alphaBetHebrew[0]);
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
    const [MyWikis, setMyWikis] = useState<IMyWiki[]>([]);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const [skip, setSkip] = useState<number>(0);
    const [createDialog, setCreateDialog] = useState<boolean>(false);

    const resetMyWikiList = () => {
        setSkip(0);
        setTotalDocs(0);
        setMyWikis([]);
    };

    const handleLetterSelect = (letter: string) => {
        if (letter) {
            setSearchValue(undefined);
            setLetterSelected(letter);
            resetMyWikiList();
        }
    };

    const handleSearch = (search: string) => {
        if (search) {
            setLetterSelected(undefined);
            resetMyWikiList();
        } else {
            handleLetterSelect(alphaBetHebrew[0]);
        }
    };

    const createAlphaButtons = () => {
        return alphaBetHebrew.map((letter) => {
            return <AlphaBetButton value={letter}>{letter}</AlphaBetButton>;
        });
    };

    const fetchData = async (search = letterSelected || searchValue || '') => {
        const res = await getMyWiki(skip, config.myWiki.wordsPerPage, search);
        if (res.data.length) {
            setSkip(skip + config.myWiki.wordsPerPage);
            setTotalDocs(res.metadata.totalDocs);
            setMyWikis([...MyWikis, ...res.data]);
        }
    };

    const createNewMyWiki = async (newMyWiki: IMyWiki) => {
        await createMyWiki(newMyWiki);
        resetMyWikiList();
        setCreateDialog(false);
    };

    const removeMyWiki = async (id: string) => {
        await deleteMyWiki(id);
        resetMyWikiList();
    };

    const updateMyWiki = async (newMyWiki: IMyWiki) => {
        const { _id, ...restOfMyWiki } = newMyWiki;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await editMyWiki(restOfMyWiki, _id!);
        resetMyWikiList();
    };

    useEffect(() => {
        if (!MyWikis.length) fetchData();
    }, [MyWikis]);

    return (
        <MainLayout>
            <Navbar />
            <FilterArea>
                <SearchArea>
                    <CreateButton
                        variant="contained"
                        startIcon={<AddIcon sx={{ scale: '1.5' }} />}
                        onClick={() => {
                            setCreateDialog(true);
                        }}
                    >
                        {t('AMAN_WIKI.CREATE_NEW_DEFINITION')}
                    </CreateButton>
                    <SearchBox>
                        <SearchInput
                            searchValue={searchValue}
                            placeHolder={t('AMAN_WIKI.SEARCH') || ''}
                            handleSearch={handleSearch}
                            setSearchValue={setSearchValue}
                        />
                    </SearchBox>
                </SearchArea>
                <AlphaBetFilter
                    value={letterSelected}
                    exclusive
                    onChange={(_event, letter) => {
                        handleLetterSelect(letter);
                    }}
                >
                    {createAlphaButtons()}
                </AlphaBetFilter>
            </FilterArea>
            <DefinitionBox
                fetchData={fetchData}
                myWikiItems={MyWikis}
                totalDocs={totalDocs}
                onEdit={updateMyWiki}
                onDelete={removeMyWiki}
            />
            <Dialog isOpen={createDialog} setIsOpen={setCreateDialog} title={t('AMAN_WIKI.NEW_WIKI')}>
                <MyWikiDialog finalFunction={createNewMyWiki} finalButtonText={t('AMAN_WIKI.SAVE')} />
            </Dialog>
        </MainLayout>
    );
};

export default MyWiki;
