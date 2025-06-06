import React, { forwardRef } from 'react';
import {
  ParticipantContainer,
  StyledVideo,
  UsernameOverlay,
  Placeholder,
  UsernameContent,
  Icon
} from './ParticipantVideo.styles';

import EmojiEffects from '../EmojiEffects';

import { MicOffIcon } from 'assets/icons/white';

type Props = {
  sessionId: string;
  username: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  emojiName?: string;
  mySessionId: string;
};

const ParticipantVideo = forwardRef<HTMLVideoElement, Props>(
  ({ sessionId, username, isVideoOn, isAudioOn, emojiName, mySessionId }, ref) => {
    console.log("Participants Video Ref", ref);
    return (
      <ParticipantContainer id={sessionId}>
        <StyledVideo
            id={`video-${sessionId}`}
            ref={ref}
            autoPlay
            muted={sessionId === mySessionId}
            playsInline
          />
        {/* {isVideoOn ? (
          <StyledVideo
            id={`video-${sessionId}`}
            ref={ref}
            autoPlay
            muted={sessionId === mySessionId}
            playsInline
          />
        ) : (
          <Placeholder>{username.charAt(0).toUpperCase()}</Placeholder>
        )} */}

        <UsernameOverlay>
          <UsernameContent>
            {!isAudioOn && (
              <Icon>
                <MicOffIcon />
              </Icon>
            )}
            {username}
          </UsernameContent>
        </UsernameOverlay>
        <EmojiEffects emojiName={emojiName}/>
      </ParticipantContainer>
    );
  }
);

export default ParticipantVideo;