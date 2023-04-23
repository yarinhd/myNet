import React from 'react';
import { CloudUpload, PieChart, AccessAlarm } from '@mui/icons-material';

export interface ISection {
    title: string;
    icon: JSX.Element;
}

export interface IDashboardSections {
    right: ISection;
    left: ISection;
    bottom: ISection;
}

const iconSX = {
    color: 'white',
    m: 2,
    fontSize: 'max(2.2vw,1.6em)',
};

export const sections: IDashboardSections = {
    right: {
        title: 'DASHBOARD_SECTIONS.UPLOAD',
        icon: <CloudUpload sx={iconSX} />,
    },
    left: {
        title: 'DASHBOARD_SECTIONS.STATISTICS',
        icon: <PieChart sx={iconSX} />,
    },
    bottom: {
        title: 'DASHBOARD_SECTIONS.WORK_PLAN',
        icon: <AccessAlarm sx={iconSX} />,
    },
};
