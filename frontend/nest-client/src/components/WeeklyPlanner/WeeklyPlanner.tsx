import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MainLayout,
    Line,
    MissionsArea,
    DaysArea,
    Mission,
    MissionsTemplate,
    WeekNumWrap,
} from './WeeklyPlanner.style';
import MissionService from '../../services/mission';
import { Context } from '../../Store';
import { IMission } from '../../common/interfaces/mission.interface';
import ProgressLoading from '../ProgressLoading/ProgressLoading';
import getNumberOfWeek from '../../utils/weekNumber';
import SlideInput from '../SlideInput/SlideInput';

interface IMissionDayIndex extends IMission {
    startDayIndex: number;
    completionDayIndex: number;
}

const INCREASE_INDEX = 1;
const INCREASE_TWO_INDEX = 2;

const WeeklyPlanner: React.FC = () => {
    const { t } = useTranslation();
    const [state] = useContext(Context);
    const [missions, setMissions] = useState<IMissionDayIndex[] | undefined>(undefined);
    const [weekNum, setWeekNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setWeekNum(getNumberOfWeek());
    }, []);

    useEffect(() => {
        fetchUserMissions();
        setIsLoading(true);
    }, [weekNum]);

    useEffect(() => {
        setIsLoading(false);
    }, [missions]);

    const fetchUserMissions = () => {
        const userId = state.user?._id;

        if (userId) {
            MissionService.getUserMissionsByWeek(userId, weekNum).then((data) => {
                const newData = data.map((mission: IMission) => {
                    const tempMission: IMissionDayIndex = {
                        ...mission,
                        startDayIndex: new Date(mission.startDate).getDay() + INCREASE_INDEX,
                        completionDayIndex: new Date(mission.complitionDate).getDay() + INCREASE_TWO_INDEX,
                    };
                    return tempMission;
                });
                setMissions(newData);
            });
        }
    };

    const getUserMissions = () => {
        return missions?.map((mission: IMissionDayIndex) => {
            return (
                <Mission
                    container
                    key={mission._id}
                    startDay={mission.startDayIndex}
                    endDay={mission.completionDayIndex}
                >
                    <p>{mission.notes}</p>
                </Mission>
            );
        });
    };

    const getDays = (days: string[]) => {
        return days.map((day: string) => <p key={day}>{day}</p>);
    };

    return (
        <MainLayout container>
            <WeekNumWrap>
                <SlideInput
                    options={{ min: 1, max: 52 }}
                    label={t('WEEK') ?? ''}
                    selected={{
                        value: weekNum,
                        set: (value: number) => {
                            setWeekNum(value);
                        },
                    }}
                />
            </WeekNumWrap>
            <MissionsArea>
                {isLoading ? <ProgressLoading /> : <MissionsTemplate container>{getUserMissions()}</MissionsTemplate>}
            </MissionsArea>
            <DaysArea container>
                <Line />
                <Grid container justifyContent="space-around">
                    {getDays(t('WEEK_DAYS', { returnObjects: true }))}
                </Grid>
            </DaysArea>
        </MainLayout>
    );
};

export default WeeklyPlanner;
