import React, { forwardRef } from 'react';
import {
  ParticipantContainer,
  StyledVideo,
  UsernameOverlay,
  Placeholder,
  UsernameContent,
  Icon
} from './ParticipantVideo.styles';

import { MicOffIcon } from 'assets/icons/white';

type Props = {
  sessionId: string;
  username: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
};

const ParticipantVideo = forwardRef<HTMLVideoElement, Props>(
  ({ sessionId, username, isVideoOn, isAudioOn }, ref) => {
    return (
      <ParticipantContainer id={sessionId}>
        {isVideoOn ? (
          <StyledVideo
            id={`video-${sessionId}`}
            ref={ref}
            autoPlay
            muted
            playsInline
          />
        ) : (
          <Placeholder>{username.charAt(0).toUpperCase()}</Placeholder>
        )}

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
      </ParticipantContainer>
    );
  }
);

export default ParticipantVideo;