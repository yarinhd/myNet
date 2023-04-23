export interface INavigationItem {
    title: string;
    route: string;
}

export const navigationItems: INavigationItem[] = [
    { title: 'UPLOAD', route: '/' },
    { title: 'MY_WIKI', route: '/my-wiki' },
    { title: 'ALL_CONTENTS', route: '/1' },
    { title: 'STATISTICS', route: '/2' },
    { title: 'USERS_DATA', route: '/3' },
    { title: 'WORK_PLAN', route: '/4' },
    { title: 'PERMISSIONS', route: '/5' },
];
