/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import { PlayArrow, Pause } from '@mui/icons-material';
import { MainLayout, PlayButton, TimeArea, TimeText, Track, DisplayAudio } from './AudioPlayer.style';
import getMinsFromSecondsFormatted from '../../../../utils/getMinsFromSecondsFormatted';
import AudioControls from '../AudioControls/AudioControls';

interface IProps {
    audioSrc?: string;
}

const ZERO_PERCENT = 0;
const TO_PERCENT = 100;

const AudioPlayer: React.FC<IProps> = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioPlayer = useRef<any>();
    const progressBar = useRef<any>();
    const animationRef = useRef<any>();

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            audioPlayer?.current.play();
            animationRef.current = requestAnimationFrame(repeat);
        } else {
            audioPlayer?.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const repeat = () => {
        if (progressBar.current) {
            progressBar.current.value = audioPlayer?.current?.currentTime;
            setCurrentTime(progressBar.current.value);
            animationRef.current = requestAnimationFrame(repeat);
        }
    };

    const onChangeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        setCurrentTime(progressBar.current.value);
    };

    const onLoadedMetadata = () => {
        const seconds = Math.round(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    };

    const getTimeProgress = () => {
        // Calculates the input progress relative to the audio current time
        return progressBar?.current ? (progressBar.current.value / duration) * TO_PERCENT : ZERO_PERCENT;
    };

    return (
        <MainLayout>
            <DisplayAudio>
                <div style={{ width: '90%' }}>
                    <Track
                        type="range"
                        dir="ltr"
                        defaultValue={ZERO_PERCENT}
                        ref={progressBar}
                        onInput={onChangeRange}
                        progress={getTimeProgress()}
                    />
                </div>
                <PlayButton onClick={togglePlayPause} disableRipple>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </PlayButton>
            </DisplayAudio>
            <div style={{ width: '90%' }}>
                <TimeArea>
                    <TimeText>{getMinsFromSecondsFormatted(duration)}</TimeText>
                    <TimeText>{getMinsFromSecondsFormatted(currentTime)}</TimeText>
                </TimeArea>
                <AudioControls progressBar={progressBar} audioPlayer={audioPlayer} onChangeRange={onChangeRange} />
            </div>
            {audioSrc && (
                <audio
                    src={audioSrc}
                    ref={audioPlayer}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />
            )}
        </MainLayout>
    );
};

AudioPlayer.defaultProps = {
    audioSrc: undefined,
};

export default AudioPlayer;
