import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MainLayout, { DeleteButton } from './DeleteDialog.style';

interface IProps {
    finalFunction: () => Promise<void>;
}

const DeleteDialog: React.FC<IProps> = ({ finalFunction }) => {
    const { t } = useTranslation();

    return (
        <MainLayout>
            <Typography>{t('AMAN_WIKI.DELETE_CONFIRMATION')}</Typography>
            <DeleteButton onClick={() => finalFunction()}>{t('AMAN_WIKI.YES')}</DeleteButton>
        </MainLayout>
    );
};

export default DeleteDialog;
