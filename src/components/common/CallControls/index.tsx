import React from 'react';
import CallControlButton from './Button/CallControlButton';
import CollapsibleControls from './CollapsibleControls';

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

import { ControlsWrapper, InteractionControls, MediaControls, ControlsToggleGroup, SystemControls } from './CallControls.styles';
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

    recordingListVisible: boolean;  // 녹화본 리스트 팝업 상태
    setRecordingListVisible: () => void;  // 녹화본 리스트 팝업 열기/닫기 함수

    micListVisible: boolean;
    setMicListVisible:() => void;
    videoListVisible:boolean;
    setVideoListVisible:() => void;
};

const CallControls: React.FC<CallControlsProps> = ({
    micOn, setMicOn, micListVisible, setMicListVisible,
    videoOn, setVideoOn, videoListVisible, setVideoListVisible,
    screenSharing, setScreenSharing,
    recording, setRecording, recordingListVisible, setRecordingListVisible,
    captionsVisible, setCaptionsVisible,
    chatVisible, setChatVisible, 
    participantsVisible, setParticipantsVisible, 
    emotesVisible, setEmotesVisible,
    onExit
}) => {

    return (
        <ControlsWrapper>
            <MediaControls>
                <ControlsToggleGroup $active={micOn}>
                    <CallControlButton
                        onClick={setMicOn}
                        active={micOn}
                        icon={micOn ? <MicIcon /> : <MicOffIcon />}
                        label={micOn ? 'Mute' : 'Unmute'}
                        variant='media'
                    />
                    <CollapsibleControls 
                        active={micOn} 
                        onToggle={setMicListVisible}
                        isCollapsed={micListVisible}/>
                </ControlsToggleGroup>
                <ControlsToggleGroup $active={videoOn}>
                    <CallControlButton
                        onClick={setVideoOn}
                        active={videoOn}
                        icon={videoOn ? <VideoIcon /> : <VideoOffIcon />}
                        label={videoOn ? 'Stop Video' : 'Start Video'}
                        variant='media'
                    />
                    <CollapsibleControls active={videoOn}
                    onToggle={setVideoListVisible}
                        isCollapsed={videoListVisible}/>
                </ControlsToggleGroup>
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
                <ControlsToggleGroup $active={!recording}>
                    <CallControlButton
                        onClick={setRecording}
                        icon={<RecordIcon />}
                        label='Record'
                    />
                    <CollapsibleControls 
                        active={!recording} 
                        onToggle={setRecordingListVisible}
                        isCollapsed={recordingListVisible}/>
                </ControlsToggleGroup>

                {/* 자막기능 off */}
                {captionsVisible && (
                    <CallControlButton
                        onClick={setCaptionsVisible}
                        active={captionsVisible}
                        icon={<ClosedCaptioningIcon />}
                        label='Show Captions'
                    />
                )}
                
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
    );
};

export default CallControls;
