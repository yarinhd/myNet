/* eslint-disable consistent-return */
import React from 'react';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import { WatchMode } from 'common-atom/enums/WatchMode';
import { IUser } from 'common-atom/interfaces/user.interface';
import {
    Chapter,
    ChapterButton,
    ChaptersDiv,
    TitleChapter,
    Title,
    SubTitle,
    Icon,
    EndIcon,
} from './LessonChapters.style';
import FullyChecked from '../../../../assets/images/item/FullyChecked.svg';
import HalfChecked from '../../../../assets/images/item/HalfChecked.svg';

interface IProps {
    lesson: ILesson;
    setChapterSelect: (chapter: IChapter | undefined) => void;
    user: IUser | null;
}

const LessonChapters: React.FC<IProps> = ({ lesson, setChapterSelect, user }) => {
    const getWatchMode = (chapter: IChapter) => {
        if (!user || chapter._id) return;
        const chapterUser = user.chapters.find((chap) => chap.chapterId === chapter._id);
        if (!chapterUser || chapterUser.mode === WatchMode.UNREAD) return;
        if (chapterUser.mode === WatchMode.MIDDLE) return <Icon src={HalfChecked} alt="Finished Chapter" />;
        return <Icon src={FullyChecked} alt="Finished Chapter" />;
    };

    return (
        <ChaptersDiv>
            {(lesson.chapters as IChapter[]).map((chapter) => {
                return (
                    <ChapterButton onClick={() => setChapterSelect(chapter)}>
                        <Chapter>
                            {getWatchMode(chapter)}
                            <TitleChapter>
                                <Title>
                                    <strong>{chapter.title}</strong>
                                </Title>
                                <SubTitle>{chapter.description}</SubTitle>
                            </TitleChapter>
                            <EndIcon />
                        </Chapter>
                    </ChapterButton>
                );
            })}
        </ChaptersDiv>
    );
};

export default LessonChapters;
