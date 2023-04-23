import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IItem } from 'common-atom/interfaces/item.interface';
import { DialogPaper, FullScreen } from './ContentSharePage.style';
import ShareDrawer from '../../../components/Tools/ShareDrawer/ShareDrawer';
import ContentViewer from '../../../components/Content/ContentViewer/ContentViewer';
import ItemService from '../../../services/item';
import useWrapFetch from '../../../utils/hooks/useWrapFetch';

const ContentSharePage: React.FC = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const getItemByIdWrapped = useWrapFetch(ItemService.getItemById);
    const [openShareDrawer, setOpenShareDrawer] = useState<boolean>(false);
    const [item, setItem] = useState<IItem>();

    useEffect(() => {
        getItemByIdWrapped(itemId)((wantedItem: IItem) => setItem(wantedItem));
    }, []);

    return (
        <FullScreen>
            {item && (
                <>
                    <DialogPaper>
                        <ContentViewer
                            item={item}
                            onBackClick={() => navigate({ pathname: '/home' })}
                            setOpenShareDrawer={setOpenShareDrawer}
                        />
                    </DialogPaper>
                    <ShareDrawer isOpen={openShareDrawer} setIsOpen={setOpenShareDrawer} item={item} />
                </>
            )}
        </FullScreen>
    );
};

export default ContentSharePage;
