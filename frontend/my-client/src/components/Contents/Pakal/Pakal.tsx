import React, { useState } from 'react';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { IPakal } from 'common-atom/interfaces/pakal.interface';
import { ChapterButton, ChapterFilter } from './Pakal.style';
import PdfViewer from '../../Tools/PdfViewer/PdfViewer';

interface IProps {
    pakal: IPakal;
}

const Pakal: React.FC<IProps> = ({ pakal }) => {
    const chapters = pakal.chapters as IChapter[];
    const [chapterSelected, setChapterSelected] = useState<IChapter | undefined>();

    const handleChapterSelect = (chapter: IChapter) => {
        if (chapter) {
            setChapterSelected(chapter);
        }
    };

    const createChapterButtons = () => {
        return chapters.map((chapter: IChapter) => {
            return (
                <ChapterButton disableRipple key={chapter._id} value={chapter}>
                    {chapter.title}
                </ChapterButton>
            );
        });
    };

    return (
        <>
            <ChapterFilter
                value={chapterSelected}
                exclusive
                onChange={(_event, chapter) => {
                    handleChapterSelect(chapter);
                }}
            >
                {createChapterButtons()}
            </ChapterFilter>
            <PdfViewer
                chapterSelected={chapterSelected}
                allChapters={pakal.chapters as IChapter[]}
                pdf={pakal.pdf}
                style={{
                    width: '100vw',
                    minHeight: 'calc(100vh - 70px)',
                    marginRight: '-5%',
                    overflowY: 'auto',
                }}
            />
        </>
    );
};

export default Pakal;
