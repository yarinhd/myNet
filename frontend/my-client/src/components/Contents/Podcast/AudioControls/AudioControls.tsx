/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { IconButton, MenuItem } from '@mui/material';
import { ControlsArea, SpeedSelect } from './AudioControls.style';
import Backward15 from '../../../../assets/images/media/15-seconds-backward.svg';
import Forward15 from '../../../../assets/images/media/15-seconds-forward.svg';

interface IProps {
    progressBar: any;
    audioPlayer: any;
    onChangeRange: () => void;
}

const SKIP_SECONDS = 15;
const DEFAULT_VOLUME = 1;

const AudioPlayer: React.FC<IProps> = ({ progressBar, audioPlayer, onChangeRange }) => {
    const [isMuted, setIsMuted] = useState(false);

    const speedOptions = [1, 1.25, 1.5, 2];

    const skipAudioTime = (skip: number) => {
        progressBar.current.value = Number(progressBar.current.value) + skip;
        onChangeRange();
    };

    const toggleMuted = () => {
        audioPlayer.current.muted = !audioPlayer.current.muted;
        setIsMuted((prev) => !prev);
    };

    const handleSelectedSpeed = (event: any) => {
        audioPlayer.current.playbackRate = event.target.value;
    };

    const sxIcons = { fontSize: '1.3rem', color: '#000000' };

    return (
        <ControlsArea>
            <IconButton onClick={toggleMuted} disableRipple>
                {isMuted ? <VolumeOff sx={sxIcons} /> : <VolumeUp sx={sxIcons} />}
            </IconButton>
            <IconButton onClick={() => skipAudioTime(SKIP_SECONDS)} disableRipple>
                <img src={Forward15} alt="15-seconds-forward" />
            </IconButton>
            <IconButton onClick={() => skipAudioTime(-SKIP_SECONDS)} disableRipple>
                <img src={Backward15} alt="15-seconds-backward" />
            </IconButton>
            <div>
                <SpeedSelect
                    variant="standard"
                    defaultValue={DEFAULT_VOLUME}
                    onChange={handleSelectedSpeed}
                    disableUnderline
                >
                    {speedOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            x {option}
                        </MenuItem>
                    ))}
                </SpeedSelect>
            </div>
        </ControlsArea>
    );
};

export default AudioPlayer;
