import { Grid, Typography } from '@mui/material';
import React from 'react';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import MenuIcon from '@mui/icons-material/Menu';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { Header, DefinitionArea, HeaderItem, ScrollableDiv } from './DefinitionBox.style';
import { IMyWiki } from '../../common/interfaces/myWiki.interface';
import DefinitionItem from '../DefinitionItem/DefinitionItem';

interface IProps {
    myWikiItems: IMyWiki[];
    onDelete: (id: string) => Promise<void>;
    onEdit: (newMyWiki: IMyWiki) => Promise<void>;
    fetchData: () => Promise<void>;
    totalDocs: number;
}

const DefinitionBox: React.FC<IProps> = ({ myWikiItems, fetchData, totalDocs, onEdit, onDelete }: IProps) => {
    const { t } = useTranslation();
    const wordGridNum = 3;
    const defenitionGridNum = 9;

    return (
        <DefinitionArea>
            <Header>
                <Grid container spacing={1}>
                    <HeaderItem item xs={wordGridNum}>
                        <GTranslateIcon sx={{ color: 'white' }} />
                        <Typography variant="h6" color="white">
                            {t('AMAN_WIKI.DEFINITION')}
                        </Typography>
                    </HeaderItem>
                    <HeaderItem item xs={defenitionGridNum}>
                        <MenuIcon sx={{ color: 'white' }} fontSize="large" />
                        <Typography variant="h6" color="white">
                            {t('AMAN_WIKI.EXPLANATION_AND_DETAIL')}
                        </Typography>
                    </HeaderItem>
                </Grid>
            </Header>
            <ScrollableDiv id="scrollable">
                <InfiniteScroll
                    dataLength={myWikiItems.length}
                    next={fetchData}
                    scrollableTarget="scrollable"
                    hasMore={myWikiItems.length !== totalDocs}
                    loader={<>loading...</>}
                >
                    {myWikiItems.map((item, index) => (
                        <DefinitionItem
                            definitionGridNum={defenitionGridNum}
                            wordGridNum={wordGridNum}
                            myWikiItem={item}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </InfiniteScroll>
            </ScrollableDiv>
        </DefinitionArea>
    );
};

export default DefinitionBox;
