import React from 'react';
import { useTranslation } from 'react-i18next';
import { IInfographic } from 'common-atom/interfaces/infographic.interface';
import { MainHeader, MainDialog, ImageDialog, ZoomButton, AllDialog } from './infographic.style';

interface IProps {
    infographic: IInfographic;
}

const myInfo = {
    _id: '63e264b3522cdf2e3530d050',
    image: 'https://img.mako.co.il/2014/08/21/evidence-map-Ii.jpg',
};

const Infographic: React.FC<IProps> = ({ infographic }) => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <MainHeader>
            <img src={myInfo.image} alt="small" />
            <ZoomButton variant="outlined" onClick={handleClickOpen}>
                {t('INFOGRAPHIC.ZOOM_INFOGRAPHIC')}
            </ZoomButton>
            <AllDialog open={open} onClose={handleClose}>
                <MainDialog>
                    <ImageDialog>
                        <img
                            src={myInfo.image}
                            alt="big"
                            width="100%"
                            style={{ width: '163vw', height: '46vh', transform: 'rotate(90deg)' }}
                        />
                    </ImageDialog>
                </MainDialog>
            </AllDialog>
        </MainHeader>
    );
};

export default Infographic;
