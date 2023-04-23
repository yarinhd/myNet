import React from 'react';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Grid } from '@mui/material';
import MainLayout from './SlideInput.style';

const FIRST_INDEX = 0;
const INDEX = 1;

interface Props<T> {
    options: T[] | { min: number; max: number };
    selected: {
        value: T;
        set: (value: T) => void;
    };
    color?: string;
    label?: string;
}

const iconSx = {
    fontSize: 'max(2.5vh,0.6em)',
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const SlideInput = <T extends any>({ options, selected, color, label }: Props<T>) => {
    const handleClick = (forward: boolean) => {
        if (Array.isArray(options)) {
            const currentIndex = options.indexOf(selected.value);

            if (forward) {
                selected.set(options[currentIndex === options.length - INDEX ? currentIndex : currentIndex + INDEX]);
            } else {
                selected.set(options[currentIndex === FIRST_INDEX ? FIRST_INDEX : currentIndex - INDEX]);
            }
        } else if (options?.min && options?.max && typeof selected.value === 'number') {
            if (forward) {
                selected.set((selected.value === options.max ? selected.value : selected.value + 1) as T);
            } else {
                selected.set((selected.value === options.min ? selected.value : selected.value - 1) as T);
            }
        }
    };

    return (
        <MainLayout container color={color}>
            <ArrowForwardIos onClick={() => handleClick(false)} sx={iconSx} />
            <Grid>{`${label ? `${label} ` : ''}${selected.value}`}</Grid>
            <ArrowBackIosNew onClick={() => handleClick(true)} sx={iconSx} />
        </MainLayout>
    );
};

SlideInput.defaultProps = {
    color: undefined,
    label: '',
};

export default SlideInput;
