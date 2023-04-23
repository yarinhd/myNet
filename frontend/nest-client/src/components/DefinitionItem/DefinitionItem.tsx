import React, { useState } from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { IMyWiki } from '../../common/interfaces/myWiki.interface';
import Dialog from '../Dialog/Dialog';
import { MainLayout, WordDivider, TextWord, ActionDiv, GridItem, TextDefinition } from './DefinitionItem.style';
import MyWikiDialog from '../MyWikiDialog/MyWikiDialog';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

interface IProps {
    onDelete: (id: string) => Promise<void>;
    onEdit: (newMyWiki: IMyWiki) => Promise<void>;
    wordGridNum: number;
    definitionGridNum: number;
    myWikiItem: IMyWiki;
}

const DefinitionItem: React.FC<IProps> = ({ onDelete, onEdit, wordGridNum, definitionGridNum, myWikiItem }) => {
    const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
    const [editDialog, setEditDialog] = useState<boolean>(false);
    const { t } = useTranslation();

    const deleteConfirmation = async () => {
        if (myWikiItem._id) await onDelete(myWikiItem._id);
        setDeleteDialog(false);
    };
    const editConfirmation = async (newMyWiki: IMyWiki) => {
        if (newMyWiki._id) await onEdit(newMyWiki);
        setEditDialog(false);
    };

    return (
        <MainLayout>
            <Grid container>
                <Grid item xs={wordGridNum}>
                    <GridItem>
                        <TextWord variant="h6" color="black" title={myWikiItem.word}>
                            {myWikiItem.word}
                        </TextWord>
                        <WordDivider />
                    </GridItem>
                </Grid>
                <Grid item xs={definitionGridNum}>
                    <GridItem>
                        <TextDefinition variant="h6" color="black" title={myWikiItem.defenition}>
                            {myWikiItem.defenition}
                        </TextDefinition>
                        <ActionDiv>
                            <IconButton onClick={() => setDeleteDialog(true)}>
                                <DeleteIcon htmlColor="red" />
                            </IconButton>
                            <IconButton onClick={() => setEditDialog(true)}>
                                <EditIcon />
                            </IconButton>
                        </ActionDiv>
                    </GridItem>
                </Grid>
            </Grid>
            <Dialog isOpen={deleteDialog} setIsOpen={setDeleteDialog} title={t('AMAN_WIKI.DELETE_ITEM')}>
                <DeleteDialog finalFunction={deleteConfirmation} />
            </Dialog>
            <Dialog isOpen={editDialog} setIsOpen={setEditDialog} title={t('AMAN_WIKI.EDIT_WIKI')}>
                <MyWikiDialog
                    finalFunction={editConfirmation}
                    finalButtonText={t('AMAN_WIKI.EDIT')}
                    initialMyWiki={myWikiItem}
                />
            </Dialog>
        </MainLayout>
    );
};

export default DefinitionItem;
