import React, { useEffect, useState } from 'react';
import { IItem } from 'common-atom/interfaces/item.interface';
import { ContentType } from 'common-atom/enums/ContentType';
import { IAllContent } from 'common-atom/interfaces/content.interface';
import { IPakal } from 'common-atom/interfaces/pakal.interface';
import { IMedia } from 'common-atom/interfaces/media.interface';
import { IInfographic } from 'common-atom/interfaces/infographic.interface';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import useWrapFetch from '../../../utils/hooks/useWrapFetch';
import ContentService from '../../../services/content';
import Pakal from '../../Contents/Pakal/Pakal';
import Podcast from '../../Contents/Podcast/PodcastContent/PodcastContent';
import Video from '../../Contents/Video/Video';
import Infographic from '../../Contents/Infografhic/infographic';
import Lesson from '../../Contents/Lesson/LessonContent/LessonContent';

interface IProps {
    item: IItem;
}

const ContentSwitch: React.FC<IProps> = ({ item }) => {
    const [content, setContent] = useState<IAllContent>();
    const getContentByIdWrapped = useWrapFetch(ContentService.getContentById);

    useEffect(() => {
        getContentByIdWrapped(
            item.contentType,
            item.contentId,
            item._id
        )((wantedContent: IAllContent) => setContent(wantedContent));
    }, []);

    const getContent = () => {
        switch (item.contentType) {
            case ContentType.GAME:
                return <p> GAME </p>;
            case ContentType.INFOGRAPHIC:
                return <Infographic infographic={content as IInfographic} />;
            case ContentType.LESSON:
                return <Lesson lesson={content as ILesson} item={item} />;
            case ContentType.LOMDA:
                return <p> LOMDA </p>;
            case ContentType.PAKAL:
                return <Pakal pakal={content as IPakal} />;
            case ContentType.PODCAST:
                return <Podcast podcast={content as IMedia} />;
            case ContentType.VIDEO:
                return <Video video={content as IMedia} />;
            default:
                return <p> loading... </p>;
        }
    };
    return content ? getContent() : <p> loading... </p>;
};

export default ContentSwitch;
