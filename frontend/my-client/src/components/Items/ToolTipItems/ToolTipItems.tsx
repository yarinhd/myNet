/* eslint-disable react/react-in-jsx-scope */
import React, { useEffect, useRef, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Category } from 'common-atom/enums/Category';
import { Section } from 'common-atom/enums/Section';
import { FilterRows, GreenCheckBox } from './ToolTipItems.style';

interface IProps {
    tooltipOpen: {
        value: boolean;
        set: (value: boolean) => void;
    };
    category: { value: Category[]; set: (value: Category[]) => void };
    section: { value: Section[]; set: (value: Section[]) => void };
}

const ToolTip: React.FC<IProps> = ({ tooltipOpen, category, section }) => {
    const { t } = useTranslation();
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleClose = (event: any) => {
        if (event.type !== 'touchend') {
            const isDescendant = tooltipRef.current?.contains(event.target);
            if (!isDescendant) {
                tooltipOpen.set(false);
            }
        }
    };
    const handleCheckboxChange = (event: any, state: any, setState: any) => {
        event.stopPropagation();
        const { value } = event.target;
        const isChecked = event.target.checked;
        const updatedValues = isChecked ? [...state.value, value] : state.value.filter((c: any) => c !== value);

        setState(updatedValues);
    };

    const sections = [Section.OPERATIVE, Section.WAR];
    const categories = [Category.ONE, Category.TWO, Category.THREE];

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                handleClose(event);
            }
        };

        const documentRef = document as Document;
        documentRef.addEventListener('mousedown', handleClickOutside);

        return () => {
            documentRef.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);

    const handleCheckboxClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <Tooltip
            onClose={handleClose}
            componentsProps={{
                popper: {
                    sx: {
                        marginTop: '0px !important',
                    },
                },
                tooltip: {
                    sx: {
                        backgroundColor: '#f2f2f2',
                        color: 'gray',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '350px',
                        marginTop: '10px !important',
                        fontWeight: 500,
                        padding: '4px 8px',
                        fontSize: '0.6875rem',
                    },
                },
                arrow: {
                    sx: {
                        color: '#f2f2f2',
                    },
                },
            }}
            title={
                <div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.875rem', marginTop: '2%' }}>
                        {t('SEARCH_PAGE.FILTER')}
                    </div>
                    <FilterRows>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{t('SECTION.SECTION')}</div>
                        <FilterRows onClick={handleCheckboxClick}>
                            {sections.map((sectionValue) => (
                                <div key={sectionValue}>
                                    <GreenCheckBox
                                        value={sectionValue}
                                        onChange={(event) => handleCheckboxChange(event, section, section.set)}
                                        checked={section.value.includes(sectionValue)}
                                    />
                                    {t(`SECTION.${sectionValue.toLocaleUpperCase()}`)}
                                </div>
                            ))}
                        </FilterRows>
                    </FilterRows>
                    <FilterRows>
                        <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{t('CATEGORIES.CATEGORY')}</div>
                        <FilterRows onClick={handleCheckboxClick}>
                            {categories.map((categoryValue) => (
                                <div key={categoryValue}>
                                    <GreenCheckBox
                                        key={categoryValue}
                                        value={categoryValue}
                                        onChange={(event) => handleCheckboxChange(event, category, category.set)}
                                        checked={category.value.includes(categoryValue)}
                                    />
                                    {t(`CATEGORIES.${categoryValue.toLocaleUpperCase()}`)}
                                </div>
                            ))}
                        </FilterRows>
                    </FilterRows>
                </div>
            }
            open={tooltipOpen.value}
            arrow
            placement="bottom-start"
            box-sizing="content-box"
        >
            <IconButton onClick={() => tooltipOpen.set(!tooltipOpen.value)}>
                <TuneRoundedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default ToolTip;
