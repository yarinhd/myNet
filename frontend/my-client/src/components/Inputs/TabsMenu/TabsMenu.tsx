import React, { useState } from 'react';
import { Box } from '@mui/material';
import { TabItem, TabsMenu } from './TabsMenu.style';

interface ITab {
    title: string;
    tabElement: React.ReactElement;
}

interface IProps {
    tabs: ITab[];
}

const TabMenu: React.FC<IProps> = ({ tabs }) => {
    const [value, setValue] = useState<number>(0);

    const tabProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabsMenu value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((tab: ITab, index) => {
                        return <TabItem label={tab.title} {...tabProps(index)} />;
                    })}
                </TabsMenu>
            </Box>
            {tabs.map((tab: ITab, index) => {
                return (
                    <div
                        role="tabpanel"
                        hidden={value !== index}
                        id={`simple-tabpanel-${index}`}
                        aria-labelledby={`simple-tab-${index}`}
                    >
                        {tab.tabElement}
                    </div>
                );
            })}
        </Box>
    );
};

export default TabMenu;
