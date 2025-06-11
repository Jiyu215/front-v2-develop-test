import React, { useEffect, useState } from 'react';
import {
  EmojiPickerOverlay,
  EmojiPickerContainer,
  EmojiButton,
  TargetSelector,
  CloseButton,
  EmojiGrid,
  EmojiPickerHeader
} from './EmojiPicker.styles';
import emojiList from './emojiList';

type EmojiPickerProps = {
  onSelect: (emoji: string, receiver: { sessionId: string; username: string } | null) => void;
  onClose: () => void;
  participants: { sessionId: string; username: string }[];
  currentUserSessionId: string;
  hasSidebar: boolean;
};


const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  onClose,
  participants,
  currentUserSessionId,
  hasSidebar,
}) => {
  // 자기 자신 포함, 첫 번째 참가자에게 보내기
  const firstReceiver = participants.length > 0 ? participants[0] : null;

  const handleSelect = (emojiName: string) => {
    onSelect(emojiName, firstReceiver);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <EmojiPickerOverlay onClick={onClose}>
      <EmojiPickerContainer $hasSidebar={hasSidebar} onClick={e => e.stopPropagation()}>
        <EmojiPickerHeader>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </EmojiPickerHeader>
        <EmojiGrid>
          {emojiList.map(emoji => (
            <EmojiButton key={emoji.name} onClick={() => handleSelect(emoji.name)}>
              <emoji.Component width={28} height={28} />
            </EmojiButton>
          ))}
        </EmojiGrid>
        {/* 수신자 선택 UI 제거 */}
      </EmojiPickerContainer>
    </EmojiPickerOverlay>
  );
};

export default EmojiPicker;
