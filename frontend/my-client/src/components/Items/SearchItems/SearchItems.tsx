import React, { useState } from 'react';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { useTranslation } from 'react-i18next';
import { IItem } from 'common-atom/interfaces/item.interface';
import { IconContainer, InfoDiv, ItemContainer, ItemDescription, Title } from './SearchItems.style';
import ImageWithChip from '../ImageWithChip/ImageWithChip';
import { getContent, getDateString, getTimeToReadString } from '../../../utils/itemHelpers';
import ContentDialog from '../../Content/ContentDialog/ContentDialog';

interface Props {
    item: IItem;
}

const SearchItem: React.FC<Props> = ({ item }) => {
    const { t } = useTranslation();
    const stringDate = getDateString(item.updatedAt);
    const stringTimeToRead = getTimeToReadString(item.timeToRead, t);
    const content = getContent(item.contentType);
    const [bookmarked, setBookmarked] = useState<boolean>(false);
    const [iconColor, setIconColor] = useState('initial');
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
        setIconColor(bookmarked ? 'initial' : '#3EB489');
    };

    return (
        <>
            <ItemContainer
                onClick={() => {
                    setOpenDialog(true);
                }}
            >
                <ImageWithChip
                    content={content}
                    image={item.thumbNail}
                    style={{ width: '35%', height: '80px', objectFit: 'fill' }}
                />
                <InfoDiv>
                    <Title>{item.title}</Title>
                    <ItemDescription>
                        {stringDate} | {`${stringTimeToRead} ${t('ITEM.TO_READ')}`}
                    </ItemDescription>
                </InfoDiv>
                <IconContainer onClick={handleBookmarkClick}>
                    <BookmarkAddOutlinedIcon style={{ color: iconColor }} />
                </IconContainer>
            </ItemContainer>
            <ContentDialog isOpen={openDialog} setIsOpen={setOpenDialog} item={item} />
        </>
    );
};

export default SearchItem;
