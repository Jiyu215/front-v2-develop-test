import React, { useState } from 'react';
import CallControlButton from './Button/CallControlButton';

import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  ChatIcon,
  UsersIcon,
  RecordIcon,
  ScreenShareIcon,
  EmojiIcon,
  ClosedCaptioningIcon
} from 'assets/icons/black';

import { ControlsWrapper, InteractionControls, MediaControls, SystemControls } from './CallControls.styles';
import Button from '../Button';

type CallControlsProps = {
    micOn: boolean;
    setMicOn: () => void;
    videoOn: boolean;
    setVideoOn: () => void;
    screenSharing: boolean;
    setScreenSharing: () => void;
    recording: boolean;
    setRecording: () => void;
    captionsVisible: boolean;
    setCaptionsVisible: () => void;
    chatVisible: boolean;
    setChatVisible: () => void;
    participantsVisible: boolean;
    setParticipantsVisible: () => void;
    emotesVisible: boolean;
    setEmotesVisible: () => void; 
    onExit: () => void;
};

const CallControls: React.FC<CallControlsProps> = ({
    micOn, setMicOn,
    videoOn, setVideoOn,
    screenSharing, setScreenSharing,
    recording, setRecording,
    captionsVisible, setCaptionsVisible,
    chatVisible, setChatVisible, 
    participantsVisible, setParticipantsVisible, 
    emotesVisible, setEmotesVisible,
    onExit
}) => {

    return (
    <>
        <ControlsWrapper>
        <MediaControls>
            <CallControlButton
                onClick={setMicOn}
                active={micOn}
                icon={micOn ? <MicIcon /> : <MicOffIcon />}
                label={micOn ? 'Mute' : 'Unmute'}
                variant='media'
            />
            <CallControlButton
                onClick={setVideoOn}
                active={videoOn}
                icon={videoOn ? <VideoIcon /> : <VideoOffIcon />}
                label={videoOn ? 'Stop Video' : 'Start Video'}
                variant='media'
            />
        </MediaControls>
        <InteractionControls>
            <CallControlButton
                onClick={setParticipantsVisible}
                active={participantsVisible}
                icon={<UsersIcon/>}
                label='Participants'
            />
            <CallControlButton
                onClick={setChatVisible}
                active={chatVisible}
                icon={<ChatIcon />}
                label='Chat'
            />
            <CallControlButton
                onClick={setScreenSharing}
                active={screenSharing}
                icon={<ScreenShareIcon />}
                label='Share Screen'
            />
            <CallControlButton
                onClick={setRecording}
                active={recording}
                icon={<RecordIcon />}
                label='Record'
            />
            <CallControlButton
                onClick={setCaptionsVisible}
                active={captionsVisible}
                icon={<ClosedCaptioningIcon />}
                label='Show Captions'
            />
            <CallControlButton
                onClick={setEmotesVisible}
                active={emotesVisible}
                icon={<EmojiIcon />}
                label='Emotes'
            />
        </InteractionControls>
        <SystemControls>
            <Button onClick={onExit} variant='exit'>Leave</Button>
        </SystemControls>
        </ControlsWrapper>
    </>
    );
};

export default CallControls;
