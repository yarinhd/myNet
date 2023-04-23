import React, { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IContent } from '../../models/ContentItems';
import { ContentItem, IconsNavigation } from './ContentMenu.style';

interface IProps {
    contents: IContent[];
    inline: boolean;
}

const ContentOptions: React.FC<IProps> = ({ contents, inline }) => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState('');

    const handleSelect = (event: SyntheticEvent<Element, Event>, newValue: string) => {
        setSelected(newValue);
    };

    const getContents = (options: IContent[]) => {
        return options.map((content: IContent) => (
            <ContentItem
                key={content.title}
                itemColor={content.iconColor}
                inline={inline}
                value={content.title}
                icon={content.icon}
                label={t(`UPLOAD_CONTENTS.${content.title}`)}
                disableRipple
            />
        ));
    };

    return (
        <IconsNavigation value={selected} showLabels onChange={handleSelect} inline={inline}>
            {getContents(contents)};
        </IconsNavigation>
    );
};

export default ContentOptions;
