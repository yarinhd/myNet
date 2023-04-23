import React from 'react';
import ScrollableDiv, { CategoryContainer, CategoryTitle } from './InfiniteScroll.style';

interface IPropsInfiniteScroll {
    loading: React.ReactNode;
    endComponent?: React.ReactNode;
    loadNext: () => void;
    isLoading?: boolean;
    precentToLoad: number;
    hasMore: boolean;
    onScrollListeners?: ((e: React.UIEvent<HTMLDivElement, UIEvent>) => void)[];
    useRef?: React.RefObject<HTMLDivElement>;
}

const InfiniteScroll: React.FC<IPropsInfiniteScroll> = ({
    loading,
    loadNext,
    children,
    precentToLoad,
    hasMore,
    endComponent,
    isLoading,
    onScrollListeners,
    useRef,
}) => {
    const onScrollEven = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (
            hasMore &&
            ((e.currentTarget.offsetHeight + e.currentTarget.scrollTop) / e.currentTarget.scrollHeight) * 100 >=
                precentToLoad &&
            !isLoading
        ) {
            loadNext();
        }
    };
    return (
        <ScrollableDiv
            onScroll={(e) => {
                onScrollEven(e);
                onScrollListeners?.forEach((func) => {
                    func(e);
                });
            }}
            onLoad={onScrollEven}
            ref={useRef}
        >
            {children}
            {hasMore ? loading : endComponent}
        </ScrollableDiv>
    );
};

InfiniteScroll.defaultProps = {
    isLoading: false,
    onScrollListeners: [],
    useRef: undefined,
    endComponent: <p>There is no more items</p>,
};

interface IPropsCatagory {
    title: string;
    TitleElement?: React.FC;
    CategoryElement?: React.FC;
}

export const Catagory: React.FC<IPropsCatagory> = ({ children, title, TitleElement, CategoryElement }) => {
    const TitleUse = TitleElement ? <TitleElement>{title}</TitleElement> : <h4>{title}</h4>;
    return (
        <CategoryContainer>
            {CategoryElement ? (
                <CategoryElement>{TitleUse}</CategoryElement>
            ) : (
                <CategoryTitle className="category-title">{TitleUse}</CategoryTitle>
            )}
            {children}
        </CategoryContainer>
    );
};

Catagory.defaultProps = {
    TitleElement: undefined,
    CategoryElement: undefined,
};

export default InfiniteScroll;
