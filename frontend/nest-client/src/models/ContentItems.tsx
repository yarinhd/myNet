import React from 'react';
import {
    MenuBook,
    Toc,
    Headphones,
    SmartDisplay,
    Computer,
    SportsEsports,
    Info,
    FontDownload,
} from '@mui/icons-material';

export interface IContent {
    title: string;
    iconColor?: string;
    icon: JSX.Element;
}

const iconSX = {
    fontSize: 'max(2.7vw,1.6em)',
};

enum ContentColors {
    LESSON = '#3E7A64',
    PODCAST = '#68B180',
    VIDEO = '#8EB8E5',
    PAKAL = '#F39C6B',
    LOMDA = '#C5153C',
    INFOGRAPHIC = '#B6465F',
    GAME = '#2C2C54',
    CONCEPT = '#e5c78e',
}

export const contents: IContent[] = [
    { title: 'LESSON', iconColor: ContentColors.LESSON, icon: <MenuBook sx={iconSX} /> },
    { title: 'INFOGRAPHIC', iconColor: ContentColors.INFOGRAPHIC, icon: <Info sx={iconSX} /> },
    { title: 'PAKAL', iconColor: ContentColors.PAKAL, icon: <Toc sx={iconSX} /> },
    { title: 'GAME', iconColor: ContentColors.GAME, icon: <SportsEsports sx={iconSX} /> },
    { title: 'PODCAST', iconColor: ContentColors.PODCAST, icon: <Headphones sx={iconSX} /> },
    { title: 'VIDEO', iconColor: ContentColors.VIDEO, icon: <SmartDisplay sx={iconSX} /> },
    { title: 'LOMDA', iconColor: ContentColors.LOMDA, icon: <Computer sx={iconSX} /> },
    { title: 'CONCEPT', iconColor: ContentColors.CONCEPT, icon: <FontDownload sx={iconSX} /> },
];
