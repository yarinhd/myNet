import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, IconButton, Grid } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WhatsappShareButton, EmailShareButton } from 'react-share';
import CloseIcon from '@mui/icons-material/Close';
import { IItem } from 'common-atom/interfaces/item.interface';
import { BottomDrawer, GridContainer, Title, URL, Logo, AppName, GridItem } from './ShareDrawer.style';
import logo from '../../../assets/images/logos/mynetIcon.png';
import mail from '../../../assets/images/apps/mail.svg';
import whatsApp from '../../../assets/images/apps/whatsApp.svg';
import copy from '../../../assets/images/apps/copy.svg';
import { getContent } from '../../../utils/itemHelpers';

interface IProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    item: IItem;
    url?: string;
}

const ShareDrawer: React.FC<IProps> = ({ isOpen, setIsOpen, item, url }) => {
    const { t } = useTranslation();
    const apps = [
        {
            button: EmailShareButton,
            image: mail,
            name: 'Mail',
        },
        {
            button: WhatsappShareButton,
            image: whatsApp,
            name: 'WhatsApp',
        },
        {
            button: CopyToClipboard,
            image: copy,
            name: 'Copy URL',
            isCopy: true,
        },
    ];

    return (
        <BottomDrawer
            anchor="bottom"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            PaperProps={{ sx: { backgroundColor: '#F6F6F5' } }}
        >
            <GridContainer container justifyContent="flex-right" alignItems="center" spacing={2}>
                <Grid item mobile={2}>
                    <Logo src={logo} alt="logo" />
                </Grid>
                <Grid item mobile={9}>
                    <Title>
                        {t(`UPLOAD_CONTENTS.${getContent(item.contentType).title}`)} - {item.title}
                    </Title>
                    <URL>{url}</URL>
                </Grid>
                <Grid item mobile={1}>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon sx={{ fontSize: '20px', color: 'black' }} />
                    </IconButton>
                </Grid>
                <Grid item mobile={12}>
                    <Divider />
                </Grid>
                {apps.map((app: any) => {
                    return (
                        <GridItem key={app.name} item mobile={4}>
                            {app.isCopy ? (
                                <>
                                    <app.button text={url}>
                                        <Logo src={app.image} />
                                    </app.button>
                                    <AppName>{app.name}</AppName>
                                </>
                            ) : (
                                <>
                                    <app.button url={url}>
                                        <Logo src={app.image} />
                                    </app.button>
                                    <AppName>{app.name}</AppName>
                                </>
                            )}
                        </GridItem>
                    );
                })}
            </GridContainer>
        </BottomDrawer>
    );
};

ShareDrawer.defaultProps = {
    url: window.location.href,
};

export default ShareDrawer;
