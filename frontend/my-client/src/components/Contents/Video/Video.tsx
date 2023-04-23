import React, { useRef, useState } from 'react';
import { PlayArrow, CropFree, ZoomInMap, Pause } from '@mui/icons-material';
import { IMedia } from 'common-atom/interfaces/media.interface';
import {
    MainLayout,
    VideoTag,
    PlayButton,
    VideoWrap,
    Track,
    ControlsWrap,
    TimeArea,
    PauseIconWrap,
} from './Video.style';
import VideoPlaceholder from '../../../assets/images/media/video-placeholder.png';
import getMinsFromSecondsFormatted from '../../../utils/getMinsFromSecondsFormatted';

interface IProps {
    video: IMedia;
}

const ZERO_PERCENT = 0;
const TO_PERCENT = 100;
const EMPTY_STRING = '';

const Video: React.FC<IProps> = ({ video }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const videoPlayer = useRef<any>();
    const progressBar = useRef<any>();
    const animationRef = useRef<any>();

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
            videoPlayer?.current.play();
            animationRef.current = requestAnimationFrame(repeat);
        } else {
            videoPlayer?.current.pause();
            cancelAnimationFrame(animationRef.current);
        }
    };

    const repeat = () => {
        if (progressBar.current) {
            progressBar.current.value = videoPlayer.current?.currentTime;
            setCurrentTime(progressBar.current.value);
            animationRef.current = requestAnimationFrame(repeat);
        }
    };

    const onChangeRange = () => {
        videoPlayer.current.currentTime = progressBar.current.value;
        setCurrentTime(progressBar.current.value);
    };

    const onLoadedMetadata = () => {
        const seconds = Math.round(videoPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
    };

    const getTimeProgress = () => {
        // Calculates the input progress relative to the audio current time
        return progressBar?.current ? (progressBar.current.value / duration) * TO_PERCENT : ZERO_PERCENT;
    };

    const toggleScreenMode = () => {
        const prevValue = isFullScreen;
        const rootDocumentElement = document.documentElement;

        setIsFullScreen(!prevValue);
        if (!prevValue) {
            rootDocumentElement.requestFullscreen();
        }
    };

    const iconSX = { color: 'white', fontSize: '1.2rem' };

    return (
        <MainLayout isFullScreen={isFullScreen}>
            <div style={{ height: '100%', position: 'relative' }}>
                <VideoTag
                    src={video.video || EMPTY_STRING}
                    poster={VideoPlaceholder}
                    ref={videoPlayer}
                    onLoadedMetadata={onLoadedMetadata}
                    isFullScreen={isFullScreen}
                    onEnded={() => setIsPlaying(false)}
                />
                <VideoWrap isPlaying={isPlaying} isFullScreen={isFullScreen}>
                    <PlayButton onClick={togglePlayPause} disableRipple size="large">
                        {isPlaying ? (
                            <PauseIconWrap>
                                <Pause sx={{ fontSize: '4rem' }} />
                            </PauseIconWrap>
                        ) : (
                            <PlayArrow sx={{ fontSize: '4rem' }} />
                        )}
                    </PlayButton>
                    <ControlsWrap>
                        <TimeArea>
                            <p style={{ margin: 0 }}>{`${getMinsFromSecondsFormatted(
                                currentTime
                            )}/${getMinsFromSecondsFormatted(duration)}`}</p>
                        </TimeArea>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {isFullScreen ? (
                                <ZoomInMap sx={iconSX} onClick={toggleScreenMode} />
                            ) : (
                                <CropFree sx={iconSX} onClick={toggleScreenMode} />
                            )}
                            <Track
                                type="range"
                                dir="ltr"
                                defaultValue={ZERO_PERCENT}
                                ref={progressBar}
                                onInput={onChangeRange}
                                progress={getTimeProgress()}
                            />
                        </div>
                    </ControlsWrap>
                </VideoWrap>
            </div>
        </MainLayout>
    );
};

export default Video;
