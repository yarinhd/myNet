import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IItem } from 'common-atom/interfaces/item.interface';
import { ILesson } from 'common-atom/interfaces/lesson.interface';
import ItemProperties from '../../../Items/ItemProperties/ItemProperties';

import { IntroductionDiv, DontKnowSpawn } from './LessonIntroduction.style';

interface IProps {
    item: IItem;
    lesson: ILesson;
}

const LessonIntroduction: React.FC<IProps> = ({ item, lesson }) => {
    const { t } = useTranslation();

    const handleLackOfKnowledge = () => {
        console.log('put here handle of unknown knowledge');
    };

    return (
        <IntroductionDiv>
            <ItemProperties item={item} />
            <div>
                <Typography>
                    <strong>{t('LESSON.OUR_GOAL')}</strong>
                </Typography>
                <Typography>{lesson.goal}</Typography>
            </div>
            <div>
                <Typography variant="body1">
                    <strong>{t('LESSON.PREVIOUS_KNOWLEDGE_NEED')}</strong>
                    <DontKnowSpawn onClick={handleLackOfKnowledge}>{t('LESSON.DO_PREVIOUS_KNOWLEDGE')}</DontKnowSpawn>
                </Typography>
                <ul>
                    {lesson.preKnowledge.length ? (
                        lesson.preKnowledge.map((knowledge) => {
                            return <li>{knowledge}</li>;
                        })
                    ) : (
                        <li>{t('LESSON.NO_PREKNOWLEDGE')}</li>
                    )}
                </ul>
            </div>
        </IntroductionDiv>
    );
};

export default LessonIntroduction;
