import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { IItem } from 'common-atom/interfaces/item.interface';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import { Context } from '../../../../Store';
import ChapterDialog from '../LessonChapterDialog/ChapterDialog';
import LessonChapters from '../LessonChapters/LessonChapters';
import LessonIntroduction from '../LessonIntroduction/LessonIntroduction';
import TabsMenu from '../../../Inputs/TabsMenu/TabsMenu';

interface IProps {
    lesson: ILesson;
    item: IItem;
}

const Lesson: React.FC<IProps> = ({ lesson, item }) => {
    const { t } = useTranslation();
    const [isViewChapter, setIsViewChapter] = useState<boolean>(false);
    const [selectedChapter, setSelectedChapter] = useState<IChapter>();
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        if (selectedChapter) setIsViewChapter(true);
    }, [selectedChapter]);

    return (
        <>
            <TabsMenu
                tabs={[
                    {
                        title: t('LESSON.INTRODUCTION'),
                        tabElement: <LessonIntroduction item={item} lesson={lesson} />,
                    },
                    {
                        title: t('LESSON.CHAPTERS'),
                        tabElement: (
                            <LessonChapters lesson={lesson} setChapterSelect={setSelectedChapter} user={state.user} />
                        ),
                    },
                ]}
            />
            <ChapterDialog
                isOpen={isViewChapter}
                setIsOpen={setIsViewChapter}
                chapter={selectedChapter}
                setChapter={setSelectedChapter}
                lesson={lesson}
                allChapters={lesson.chapters as IChapter[]}
                dispatch={dispatch}
                user={state.user}
            />
        </>
    );
};

export default Lesson;
