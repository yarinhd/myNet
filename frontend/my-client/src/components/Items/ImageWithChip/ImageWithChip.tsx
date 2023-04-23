/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IContent } from '../../../models/ContentItems';
import { ContentChip, ContentType, ThumbNailButton, ThumbNailImage, ExtraChip, Chip } from './ImageWithChip.style';
import ImageNotFound from '../../../assets/images/item/ImageNotFound.jpg';

interface IProps {
    content: IContent;
    image: string;
    style?: object;
    imageStyle?: object;
    onClick?: () => void;
}

const ImageWithChip: React.FC<IProps> = ({ content, image, style, imageStyle, onClick, children }) => {
    const { t } = useTranslation();

    return (
        <div style={style}>
            <ThumbNailButton
                onClick={() => (onClick ? onClick() : {})}
                disableRipple={!onClick}
                disableTouchRipple={!onClick}
            >
                <ThumbNailImage src={image ?? ImageNotFound} style={imageStyle} alt="Item image" />
                <Chip>
                    <ContentChip>
                        {content.icon}
                        <ContentType>{t(`UPLOAD_CONTENTS.${content.title}`)}</ContentType>
                    </ContentChip>
                    <ExtraChip />
                </Chip>
            </ThumbNailButton>
            {children}
        </div>
    );
};

ImageWithChip.defaultProps = {
    onClick: undefined,
    style: {},
    imageStyle: {},
};

export default ImageWithChip;
