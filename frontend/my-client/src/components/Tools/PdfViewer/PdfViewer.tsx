import React, { useState, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { IChapter } from 'common-atom/interfaces/chapter.interface';
import { PageByHeight, PageByWidth, StyledDocument } from './PdfViewer.style';

interface IPageRange {
    startPage: number;
    endPage: number;
}
type Fit = 'width' | 'height';
interface IProps {
    chapterSelected: IChapter | undefined;
    allChapters: IChapter[];
    pdf: string;
    style: Record<string, any>;
    isOnlyChpaterPages?: boolean;
    fitBy?: Fit;
}

const PdfViewer: React.FC<IProps> = ({ chapterSelected, allChapters, pdf, isOnlyChpaterPages, fitBy, style }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pdfLength, setPdfLength] = useState<number | undefined>(undefined);
    const [pageRage, setPageRange] = useState<IPageRange>();

    const arrayRange = (start: number, stop: number, step = 1) =>
        Array.from({ length: (stop - start) / step + 1 }, (_value, index) => start + index * step);

    const onDocumentLoadSuccess = (loadedPdf: any) => {
        setPdfLength(loadedPdf.numPages);
    };

    const getRelevantPages = (rage: IPageRange) => {
        const Page = fitBy === 'width' ? PageByWidth : PageByHeight;
        return arrayRange(rage.startPage, rage.endPage).map((page: number) => (
            <Page
                key={page}
                pageNumber={page}
                renderMode="canvas"
                renderAnnotationLayer={false}
                renderTextLayer={false}
                loading=""
            />
        ));
    };

    useEffect(() => {
        if (pdfLength) {
            setPageRange({ startPage: 1, endPage: pdfLength });
        }
    }, [pdfLength]);

    useEffect(() => {
        if (pdfLength) {
            if (chapterSelected) {
                const currentIndex = allChapters.indexOf(chapterSelected);
                const isLastChapter = currentIndex === allChapters.length - 1;
                const endOfNextChapter = isLastChapter ? pdfLength : allChapters[currentIndex + 1].page - 1;
                setPageRange({
                    startPage: chapterSelected.page,
                    endPage: isOnlyChpaterPages ? endOfNextChapter : pdfLength,
                });
            } else {
                setPageRange({ startPage: 1, endPage: pdfLength });
            }
        }
    }, [chapterSelected, pdfLength]);

    return (
        <StyledDocument file={pdf} onLoadSuccess={onDocumentLoadSuccess} options={style}>
            {!!pdfLength && !!pageRage && getRelevantPages(pageRage)}
        </StyledDocument>
    );
};

PdfViewer.defaultProps = {
    isOnlyChpaterPages: false,
    fitBy: 'width',
};

export default PdfViewer;
