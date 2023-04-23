import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, IconButton } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import { IItem } from 'common-atom/interfaces/item.interface';
import { ContentType } from 'common-atom/enums/ContentType';
import {
    BackButton,
    ContentDescription,
    ContentTitle,
    GridButtonsContainer,
    GridContainer,
    GridItem,
    Logo,
    TimeDescription,
} from './ContentViewer.style';
import ImageWithChip from '../../Items/ImageWithChip/ImageWithChip';
import { Context } from '../../../Store';
import logo from '../../../assets/images/logos/mynet.svg';
import { getContent, getTimeToReadString, toggleFavorite } from '../../../utils/itemHelpers';
import ItemProperties from '../../Items/ItemProperties/ItemProperties';
import ContentSwitch from '../ContentSwitch/ContentSwitch';

interface IProps {
    item: IItem;
    setOpenShareDrawer: (value: boolean) => void;
    onBackClick: () => void;
}

const ContentViewer: React.FC<IProps> = ({ item, setOpenShareDrawer, onBackClick }) => {
    const { t } = useTranslation();
    const [state, dispatch] = useContext(Context);
    const content = getContent(item.contentType);

    return (
        <>
            <ImageWithChip
                content={content}
                image={item.thumbNail}
                style={{ width: '100%', height: '17%' }}
                imageStyle={{ objectFit: 'cover' }}
            >
                <GridContainer container justifyContent="space-between" alignItems="flex-start">
                    <GridItem item mobile={2}>
                        <BackButton onClick={() => onBackClick()}>
                            <KeyboardArrowRightIcon sx={{ fontSize: '25px', color: 'white' }} />
                        </BackButton>
                    </GridItem>
                    <GridItem item mobile={2}>
                        <Logo src={logo} alt="logo" />
                    </GridItem>
                    <GridItem item mobile={2} style={{ flexDirection: 'column' }}>
                        <ScheduleIcon sx={{ fontSize: '25px', color: 'white' }} />
                        <TimeDescription>{getTimeToReadString(item.timeToRead, t)}</TimeDescription>
                    </GridItem>
                </GridContainer>
            </ImageWithChip>
            <GridButtonsContainer container spacing={2}>
                <Grid item mobile={1}>
                    <IconButton disableRipple onClick={() => setOpenShareDrawer(true)}>
                        <ShareIcon sx={{ fontSize: '22px', color: 'black' }} />
                    </IconButton>
                </Grid>
                <Grid item mobile={1}>
                    <IconButton disableRipple onClick={() => toggleFavorite(dispatch, state.user, item._id)}>
                        {item.isFavorite ? (
                            <CheckIcon sx={{ fontSize: '22px', color: 'black' }} />
                        ) : (
                            <AddIcon sx={{ fontSize: '22px', color: 'black' }} />
                        )}
                    </IconButton>
                </Grid>
            </GridButtonsContainer>
            <ContentTitle>
                {t(`UPLOAD_CONTENTS.${content.title}`)} - {item.title}
            </ContentTitle>
            <ContentDescription>{item.description}</ContentDescription>
            {item.contentType !== ContentType.LESSON && (
                <>
                    <ItemProperties item={item} />
                    <Divider />
                </>
            )}
            <ContentSwitch item={item} />
        </>
    );
};

export default ContentViewer;
