import React from 'react';
import { useTranslation } from 'react-i18next';
import { IItem } from 'common-atom/interfaces/item.interface';
import { IUnit } from 'common-atom/interfaces/unit.interface';
import { IArea } from 'common-atom/interfaces/area.interface';
import { Corp } from 'common-atom/enums/Corp';
import { ContentProperty, GridContainerProperty, GridItemProperty, UnitImage } from './ItemProperties.style';
import { getDateString } from '../../../utils/itemHelpers';
import Toi18n from '../../../assets/i18n/helpers';

interface IProps {
    item: IItem;
}

const ItemProperties: React.FC<IProps> = ({ item }) => {
    const { t } = useTranslation();

    const properties = [
        {
            property: 'AREA',
            value: (item.areas as IArea[]).map((area: IArea) => area.name).join(', '),
        },
        {
            property: 'GRADE',
            value: t(`GRADES.${Toi18n(item.grade)}`),
        },
        {
            property: 'CORP',
            value: (item.corps as Corp[]).map((corp: Corp) => t(`CORPS.${Toi18n(corp)}`)).join(', '),
        },
        {
            property: 'UNIT',
            value: (item.unit as IUnit).name,
            image: (item.unit as IUnit).image,
        },
        {
            property: 'UPDATED_AT',
            value: getDateString(item.updatedAt),
        },
    ];

    return (
        <GridContainerProperty container justifyContent="flex-start" alignItems="center" spacing={1}>
            {properties.map((singleProperty, index: number) => (
                <GridItemProperty key={singleProperty.value} item>
                    <ContentProperty style={{ fontWeight: 'bold' }}>
                        {t(`ITEM.${singleProperty.property}`)}:
                    </ContentProperty>
                    <ContentProperty>{singleProperty.value}</ContentProperty>
                    {singleProperty.image && <UnitImage src={singleProperty.image} alt="unit logo" />}
                    {index !== properties.length - 1 && <ContentProperty>|</ContentProperty>}
                </GridItemProperty>
            ))}
        </GridContainerProperty>
    );
};

export default ItemProperties;
