import React, { forwardRef, useState, useEffect } from 'react';
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

import useVoiceActivityDetection from 'lib/hooks/useVoiceActivityDetection';
import useSpeakingScore from 'lib/hooks/useSpeakingScore';

type Props = {
  sessionId: string;
  username: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  emojiName?: string;
  mySessionId: string;
  isPreview?: boolean;
  className?: string;
  onSpeakingScoreChange?: (score: number) => void;
};

const ParticipantVideo = forwardRef<HTMLVideoElement, Props>(
  ({ sessionId, username, isVideoOn, isAudioOn, emojiName, mySessionId, isPreview, onSpeakingScoreChange, className }, ref) => {

    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    useEffect(() => {
      const video = (ref as React.RefObject<HTMLVideoElement>)?.current;
      if (!video) return;

      let mounted = true;

      const checkStream = () => {
        if (!mounted) return;

        if (video.srcObject instanceof MediaStream) {
          setMediaStream(video.srcObject);
          console.log(`[${sessionId}] MediaStream set.`);
        } else {
          setTimeout(checkStream, 100);
        }
      };

      checkStream();

      return () => {
        mounted = false;
      };
    }, [ref]);


    const isSpeaking = useVoiceActivityDetection(mediaStream, isAudioOn);
    const speakingScore = useSpeakingScore(isSpeaking);

    useEffect(() => {
      if (onSpeakingScoreChange) {
        onSpeakingScoreChange(speakingScore);
      }
    }, [speakingScore, onSpeakingScoreChange]);

    return (
      <ParticipantContainer id={sessionId} isPreview={isPreview} className={className} 
      style={{
        border: '3px solid',
        borderColor: isSpeaking ? '#00ff3c' : 'transparent'
      }}>
          <StyledVideo
            id={`video-${sessionId}`}
            ref={ref}
            autoPlay
            muted={isPreview ? false : sessionId === mySessionId || !isAudioOn}
            playsInline
            style={{ display: isVideoOn ? 'block' : 'none' }}
          />
          
          {!isVideoOn && (
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
        <EmojiEffects emojiName={emojiName}/>
      </ParticipantContainer>
    );
  }
);

export default ParticipantVideo;