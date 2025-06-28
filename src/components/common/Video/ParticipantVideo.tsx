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

import useVoiceActivityDetection from 'lib/hooks/useVoiceActivityDetection';
import useSpeakingScore from 'lib/hooks/useSpeakingScore';

import { getUserColor } from 'lib/color/colorManager';
import { useIconSet } from 'lib/hooks/useIconSet';

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

  volume?: number;
};

const ParticipantVideo = forwardRef<HTMLVideoElement, Props>(
  ({ sessionId, username, isVideoOn, isAudioOn, emojiName, mySessionId, isPreview, onSpeakingScoreChange, className, volume }, ref) => {

    const { RedMicOffIcon } = useIconSet();
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

    useEffect(() => {
      const video = (ref as React.RefObject<HTMLVideoElement>)?.current;
      if (video) {
        const vol = Number(volume);
        if (!isNaN(vol) && isFinite(vol) && vol >= 0 && vol <= 100) {
          video.volume = vol / 100;
        } else {
          video.volume = 0.5; // 기본값 설정 (예: 50%)
        }
      }
    }, [volume, ref]);


    const isSpeaking = useVoiceActivityDetection(mediaStream, isAudioOn);
    const speakingScore = useSpeakingScore(isSpeaking);

    useEffect(() => {
      if (onSpeakingScoreChange) {
        onSpeakingScoreChange(speakingScore);
      }
    }, [speakingScore, onSpeakingScoreChange]);

    return (
      <ParticipantContainer id={sessionId} isPreview={isPreview} className={className} isSpeaking={isSpeaking}>
          <StyledVideo
            id={`video-${sessionId}`}
            ref={ref}
            autoPlay
            muted={isPreview ? false : sessionId === mySessionId || !isAudioOn}
            playsInline
            style={{ display: isVideoOn ? 'block' : 'none' }}
          />
          
          {!isVideoOn && (
            <Placeholder bgColor={getUserColor(sessionId)} isPreview={isPreview}>
              <span>{username.charAt(0).toUpperCase()}</span>
            </Placeholder>
          )}

        <UsernameOverlay>
          <UsernameContent>
            {!isAudioOn && (
              <Icon>
                <RedMicOffIcon />
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