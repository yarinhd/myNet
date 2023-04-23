/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { IMyWiki } from 'common-atom/interfaces/myWiki.interface';
import { DefinitionText, ItemArea, Mark, Title } from './WikiItem.Style';

interface IProps {
    wikiWord: IMyWiki;
    wordToMark?: string;
}

const WikiItem: React.FC<IProps> = ({ wikiWord, wordToMark }) => {
    const handleText = (text: string) => {
        if (!wordToMark || text.indexOf(wordToMark) === -1) return text;
        const indexOfMark = text.indexOf(wordToMark);
        return (
            <>
                {text.slice(0, indexOfMark)}
                <Mark>{wordToMark}</Mark>
                {text.slice(indexOfMark + wordToMark.length, text.length)}
            </>
        );
    };

    return (
        <ItemArea>
            <Title>{handleText(wikiWord.word)}</Title>
            <DefinitionText>{handleText(wikiWord.defenition)}</DefinitionText>
        </ItemArea>
    );
};

WikiItem.defaultProps = {
    wordToMark: '',
};

export default WikiItem;
