import React from 'react';
import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CloseButton, DialogPaper, TitleDialog } from './Dialog.style';

interface IProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
}

const GenericDialog: React.FC<IProps> = ({ isOpen, setIsOpen, title, children }) => {
    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onClose={closeDialog} PaperComponent={DialogPaper}>
            <TitleDialog>{title}</TitleDialog>
            <CloseButton onClick={closeDialog}>
                <CloseIcon />
            </CloseButton>
            {children}
        </Dialog>
    );
};

export default GenericDialog;
