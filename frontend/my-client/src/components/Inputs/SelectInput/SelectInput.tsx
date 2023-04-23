import React from 'react';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ExpandMore } from '@mui/icons-material';
import { MainLayout, StyledSelect } from './SelectInput.style';

interface IProps<T> {
    selected: {
        value: T | { value: T | string; label: string } | undefined;
        set: (value: T) => void;
    };
    options: T[] | { value: T; label: string }[] | undefined;
    icon?: JSX.Element;
    color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const SelectInput = <T extends any>({ selected, options, icon, color }: IProps<T>) => {
    const { t } = useTranslation();

    const handleSelect = (event: any) => {
        selected.set(event.target.value);
    };

    const getSelectOptions = () => {
        if (options) {
            const [firstElement] = options;
            const isString = typeof firstElement === 'string';

            return options.map((option: any) => {
                return (
                    <MenuItem key={isString ? option : option?.label} value={isString ? option : option?.value}>
                        {t(isString ? option : option?.label)}
                    </MenuItem>
                );
            });
        }
        return null;
    };

    return (
        <MainLayout contentColor={color}>
            {icon}
            <StyledSelect
                variant="standard"
                value={selected.value || ''}
                onChange={handleSelect}
                IconComponent={ExpandMore}
                disableUnderline
                contentColor={color}
            >
                {getSelectOptions()}
            </StyledSelect>
        </MainLayout>
    );
};

SelectInput.defaultProps = {
    icon: undefined,
    color: undefined,
};

export default SelectInput;
