import { CircularProgress } from '@mui/material';
import React from 'react';
import LoadingWarp from './ProgressLoading.style';

const ProgressLoading: React.FC = () => {
    return (
        <LoadingWarp container>
            <CircularProgress />
        </LoadingWarp>
    );
};

export default ProgressLoading;
