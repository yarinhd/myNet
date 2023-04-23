import React from 'react';
import { MainLayout, Section, ContentGrid } from './Dashboard.style';
import Navbar from '../../components/Navbar/Navbar';
import BoxHeader from '../../components/BoxHeader/BoxHeader';
import { sections } from '../../models/DashboardSections';
import { contents } from '../../models/ContentItems';
import ContentMenu from '../../components/ContentMenu/ContentMenu';
import WeeklyPlanner from '../../components/WeeklyPlanner/WeeklyPlanner';

const DashboardPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <MainLayout>
                <Section sx={{ gridArea: 'right' }}>
                    <BoxHeader section={sections.right} />
                    <ContentGrid>
                        <ContentMenu contents={contents} inline={false} />
                    </ContentGrid>
                </Section>
                <Section sx={{ gridArea: 'left' }}>
                    <BoxHeader section={sections.left} />
                </Section>
                <Section sx={{ gridArea: 'bottom' }}>
                    <BoxHeader section={sections.bottom} />
                    <WeeklyPlanner />
                </Section>
            </MainLayout>
        </>
    );
};

export default DashboardPage;
