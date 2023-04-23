import { Grid, styled, Divider } from '@mui/material';

export const MainLayout = styled(Grid)({
    width: '100%',
    height: '84%',
    justifyContent: 'center',
    alignContent: 'center',
});

export const WeekNumWrap = styled(Grid)({
    position: 'absolute',
    left: '11%',
    top: '59%',
});

export const DaysArea = styled(Grid)(({ theme }) => ({
    height: '18%',
    width: '88%',
    fontSize: 'max(1.8vh,0.9em)',
    fontWeight: 500,
    color: theme.palette.primary.main,
}));

export const Line = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
}));

export const MissionsArea = styled('div')({
    margin: '4% 0 1% 0',
    width: '88%',
    height: '50%',
});

export const MissionsTemplate = styled(Grid)({
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridAutoRows: 'max(25%, 35px)',
    gridGap: '15px',
    gridAutoFlow: 'row dense',
    gridRowStart: 'span 9000',
    overflowY: 'auto',

    '::-webkit-scrollbar': {
        width: '30px',
    },
    '::-webkit-scrollbar-thumb': {
        border: '8px solid rgba(0, 0, 0, 0)',
        backgroundClip: 'padding-box',
        borderRadius: '1rem',
        backgroundColor: '#AAAAAA',
    },
});

export const Mission = styled(Grid, {
    shouldForwardProp: (prop) => prop !== 'startDay' && prop !== 'endDay',
})<{ startDay: number; endDay: number }>(({ theme, startDay, endDay }) => ({
    backgroundColor: '#427C67',
    color: theme.palette.content.title,
    gridColumn: `${startDay}/${endDay} `,
    justifyContent: 'center',
    alignContent: 'center',
    fontWeight: 600,
    borderRadius: '3px',
}));
