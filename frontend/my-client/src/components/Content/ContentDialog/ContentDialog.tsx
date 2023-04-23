import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { IItem } from 'common-atom/interfaces/item.interface';
import { DialogPaper } from './ContentDialog.style';
import ShareDrawer from '../../Tools/ShareDrawer/ShareDrawer';
import ContentViewer from '../ContentViewer/ContentViewer';

interface IProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    item: IItem;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const ContentDialog: React.FC<IProps> = ({ isOpen, setIsOpen, item }) => {
    const [openShareDrawer, setOpenShareDrawer] = useState<boolean>(false);

    return (
        <>
            <Dialog fullScreen open={isOpen} TransitionComponent={Transition} PaperComponent={DialogPaper}>
                <ContentViewer
                    item={item}
                    onBackClick={() => setIsOpen(false)}
                    setOpenShareDrawer={setOpenShareDrawer}
                />
            </Dialog>
            <ShareDrawer
                isOpen={openShareDrawer}
                setIsOpen={setOpenShareDrawer}
                item={item}
                url={`${window.location.origin}/items/${item._id}`}
            />
        </>
    );
};

export default ContentDialog;
