/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { IItem } from 'common-atom/interfaces/item.interface';
import {
    FavoritesButton,
    FavoritesRibbon,
    ItemDescription,
    ItemSection,
    ItemSectionFullWidth,
    ItemTitle,
    Favorites,
} from './Item.style';
import { Context } from '../../../Store';
import ribbon from '../../../assets/images/item/ribbon.svg';
import ribbonChecked from '../../../assets/images/item/ribbonChecked.svg';
import ImageWithChip from '../ImageWithChip/ImageWithChip';
import ContentDialog from '../../Content/ContentDialog/ContentDialog';
import { getContent, getDateString, getTimeToReadString, toggleFavorite } from '../../../utils/itemHelpers';

interface IProps {
    item: IItem;
    isFullWidth?: boolean;
}

const Item: React.FC<IProps> = ({ item, isFullWidth }) => {
    const { t } = useTranslation();
    const [state, dispatch] = useContext(Context);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const stringDate = getDateString(item.updatedAt);
    const stringTimeToRead = getTimeToReadString(item.timeToRead, t);

    const content = getContent(item.contentType);
    const Wrapper = isFullWidth ? ItemSectionFullWidth : ItemSection;

    return (
        <>
            <Wrapper>
                <ImageWithChip
                    content={content}
                    image={item.thumbNail}
                    style={{
                        height: '75%',
                        width: '100%',
                    }}
                    onClick={() => setOpenDialog(true)}
                >
                    {item.isFavorite ? (
                        <Favorites>
                            <FavoritesRibbon src={ribbonChecked} alt="Item image" />
                            <FavoritesButton
                                disableRipple
                                onClick={() => toggleFavorite(dispatch, state.user, item._id)}
                            >
                                <CheckIcon sx={{ fontSize: '15px', color: 'white' }} />
                            </FavoritesButton>
                        </Favorites>
                    ) : (
                        <Favorites>
                            <FavoritesRibbon src={ribbon} alt="Item image" />
                            <FavoritesButton
                                disableRipple
                                onClick={() => toggleFavorite(dispatch, state.user, item._id)}
                            >
                                <AddIcon sx={{ fontSize: '15px', color: 'white' }} />
                            </FavoritesButton>
                        </Favorites>
                    )}
                </ImageWithChip>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>
                    {stringDate} | {`${stringTimeToRead} ${t('ITEM.TO_READ')}`}
                </ItemDescription>
            </Wrapper>
            <ContentDialog isOpen={openDialog} setIsOpen={setOpenDialog} item={item} />
        </>
    );
};

Item.defaultProps = {
    isFullWidth: false,
};

export default Item;
