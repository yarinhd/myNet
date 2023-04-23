import React, { useEffect } from 'react';
import { Dialog } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTranslation } from 'react-i18next';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import { IUser } from 'common-atom/interfaces/user.interface';
import PdfViewer from '../../../Tools/PdfViewer/PdfViewer';
import {
    ChaptersDiv,
    Menu,
    ExitDialog,
    ChangeChapter,
    ChapterTitle,
    Title,
    TitleAndLeave,
} from './ChapterDialog.style';
import { finishChapter, viewedChapter } from '../../../../utils/chapterHelpers';

interface IProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    chapter: IChapter | undefined;
    setChapter: (chapter: IChapter | undefined) => void;
    allChapters: IChapter[];
    lesson: ILesson;
    user: IUser | null;
    dispatch: any;
}

const ChapterDialog: React.FC<IProps> = ({
    isOpen,
    setIsOpen,
    chapter,
    allChapters,
    lesson,
    setChapter,
    dispatch,
    user,
}) => {
    const { t } = useTranslation();
    const chapterIndex: number = chapter ? allChapters.indexOf(chapter) : -1;
    const nextDisabled: boolean = chapterIndex === allChapters.length - 1;
    const preDisabled: boolean = chapterIndex === 0;

    const nextFunction = () => {
        if (!nextDisabled) {
            setChapter(allChapters[chapterIndex + 1]);
        }
    };

    const previousFunction = () => {
        if (!preDisabled) {
            setChapter(allChapters[chapterIndex - 1]);
        }
    };

    useEffect(() => {
        if (chapter) {
            if (!nextDisabled && chapter.page - allChapters[chapterIndex + 1].page === 1)
                finishChapter(dispatch, user, chapter._id);
            else viewedChapter(dispatch, user, chapter._id);
        }
    }, [chapter]);

    return (
        <Dialog fullScreen open={isOpen}>
            <ChaptersDiv>
                <Menu>
                    <TitleAndLeave>
                        <ExitDialog
                            onClick={() => {
                                setIsOpen(false);
                                setChapter(undefined);
                            }}
                        >
                            <KeyboardArrowRightIcon sx={{ fontSize: '25px', color: 'black' }} />
                        </ExitDialog>
                        <ChapterTitle>
                            <Title>
                                {t('LESSON.CHAPTER') + (chapterIndex + 1)}: {chapter?.title}
                            </Title>
                        </ChapterTitle>
                    </TitleAndLeave>
                    <div>
                        <ChangeChapter onClick={previousFunction} disabled={preDisabled}>
                            <KeyboardArrowRightIcon sx={{ fontSize: '25px', color: 'black' }} />
                            {t('LESSON.LAST_CHAPTER')}
                        </ChangeChapter>
                        <ChangeChapter onClick={nextFunction} disabled={nextDisabled}>
                            {t('LESSON.NEXT_CHAPTER')}
                            <KeyboardArrowLeftIcon sx={{ fontSize: '25px', color: 'black' }} />
                        </ChangeChapter>
                    </div>
                </Menu>
                <PdfViewer
                    allChapters={allChapters}
                    chapterSelected={chapter}
                    pdf={lesson.pdf}
                    style={{ maxHeight: 'calc(100vw - 3rem)', height: 'calc(100vw - 3rem)', overflowY: 'auto' }}
                    isOnlyChpaterPages
                    fitBy="height"
                />
            </ChaptersDiv>
        </Dialog>
    );
};

export default ChapterDialog;
