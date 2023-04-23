import React, { useState } from 'react';
import { IMedia } from 'common-atom/interfaces/media.interface';
import { MainLayout, Title, Description, Text } from './PodcastContent.style';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

interface IProps {
    podcast: IMedia;
}

const PodcastContent: React.FC<IProps> = ({ podcast }) => {
    const [openDescription, setOpenDescription] = useState<boolean>(false);

    return (
        <MainLayout>
            <Title>{podcast.title}</Title>
            <div>
                <Description className={openDescription ? '' : 'description-close'}>{podcast.description}</Description>
                {!openDescription && <Text onClick={() => setOpenDescription(true)}>עוד</Text>}
            </div>
            <AudioPlayer audioSrc={podcast.audio ?? ''} />
        </MainLayout>
    );
};

export default PodcastContent;
