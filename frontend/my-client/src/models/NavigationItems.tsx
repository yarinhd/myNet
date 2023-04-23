import { Section } from 'common-atom/enums/Section';

export interface INavigationItem {
    title: string;
    value: Section;
    color?: string;
}

export const HomePageItems: INavigationItem[] = [
    { title: 'HOME_PAGE.NAVIGATION_ITEMS_HOMEPAGE.OPERATIONAL_ACTIVITY', value: Section.OPERATIVE },
    { title: 'HOME_PAGE.NAVIGATION_ITEMS_HOMEPAGE.QUALIFIED_FOR_WAR', value: Section.WAR },
];
