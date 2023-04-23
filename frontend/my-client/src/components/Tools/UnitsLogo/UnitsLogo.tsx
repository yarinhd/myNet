import React from 'react';
import { MainLayout } from './UnitsLogo.style';
import AmanLogo from '../../../assets/images/logos/aman.svg';
import MaynetLogo from '../../../assets/images/logos/mynet.svg';
import ModashLogo from '../../../assets/images/logos/modash.svg';

const UnitsLogo: React.FC = () => {
    return (
        <MainLayout>
            <img src={ModashLogo} alt="modash-logo" style={{ marginLeft: '0.1rem', height: '1.6rem' }} />
            <img src={MaynetLogo} alt="mynet-logo" style={{ height: '2.6rem' }} />
            <img src={AmanLogo} alt="aman-logo" style={{ height: '1.4rem' }} />
        </MainLayout>
    );
};

export default UnitsLogo;
