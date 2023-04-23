import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISection } from '../../models/DashboardSections';
import Header from './BoxHeader.style';

interface IProps {
    section: ISection;
}

const SectionTitle: React.FC<IProps> = ({ section }) => {
    const { t } = useTranslation();

    return (
        <Header>
            {section.icon}
            <Typography variant="title">{t(section.title)}</Typography>
        </Header>
    );
};

export default SectionTitle;
