import React from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../../config';
import { BoundryLine, Container, AboutUsDiv, MainTitle, SecondryTitle, Content, UnitsLogo } from './AboutUs.style';
import modash from '../../../assets/images/logos/modash.svg';
import sapir from '../../../assets/images/logos/sapir.svg';

const AboutUs: React.FC = () => {
    const { t } = useTranslation();
    const { MyNetEmail } = config;

    return (
        <Container>
            <BoundryLine />
            <AboutUsDiv>
                <MainTitle>{t('MENU_PAGE.ON_US')}</MainTitle>
                <SecondryTitle>
                    {t('MENU_PAGE.ABOUT_US')}
                    <UnitsLogo src={modash} alt="modash" /> {t('MENU_PAGE.MUDESH')}
                </SecondryTitle>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Content>
                        <UnitsLogo src={sapir} alt="sapir" />
                        {t('MENU_PAGE.SAPIR')}
                    </Content>
                </div>
                <SecondryTitle sx={{ gap: '40px', marginTop: '15px' }}>
                    {t('MENU_PAGE.EMAIL')}
                    <div style={{ cursor: 'pointer' }}>{MyNetEmail}</div>
                </SecondryTitle>
            </AboutUsDiv>
            <BoundryLine />
        </Container>
    );
};
export default AboutUs;
