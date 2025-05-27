import React, { forwardRef, useEffect, useState } from 'react';
import {
  ParticipantContainer,
  StyledVideo,
  UsernameOverlay,
  Placeholder,
  UsernameContent,
  Icon,
  EmojiOverlay,
  EmojiParticle
} from './ParticipantVideo.styles';

import { MicOffIcon } from 'assets/icons/white';
import emojiList from '../EmojiPicker/emojiList';

type Props = {
  sessionId: string;
  username: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  incomingEmoji?: string; // 💥 이름 기반 (예: 'Heart')
};

const ParticipantVideo = forwardRef<HTMLVideoElement, Props>(
  ({ sessionId, username, isVideoOn, isAudioOn, incomingEmoji }, ref) => {
    const [emojiParticles, setEmojiParticles] = useState<string[]>([]);

    // 새 이모지가 들어오면 파티클로 추가
    useEffect(() => {
      if (incomingEmoji) {
        setEmojiParticles((prev) => [...prev, incomingEmoji]);

        // 특정 이모지마다 삭제 타임아웃 설정 (예: 가장 최근에 추가된 것만 삭제)
        const timeout = setTimeout(() => {
          setEmojiParticles((prev) => prev.slice(1));
        }, 2000);

        return () => clearTimeout(timeout); // cleanup
      }
    }, [incomingEmoji]);

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

        {/* 😎 이모지 애니메이션 오버레이 */}
        <EmojiOverlay>
          {emojiParticles.map((emojiName, index) => {
            const match = emojiList.find((e) => e.name === emojiName);
            if (!match) return null;
            const EmojiComponent = match.Component;

            return (
              <EmojiParticle key={index}>
                <EmojiComponent />
              </EmojiParticle>
            );
          })}
        </EmojiOverlay>

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