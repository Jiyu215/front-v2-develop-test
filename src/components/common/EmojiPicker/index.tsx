import React, { useEffect } from 'react';
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

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose, participants, currentUserSessionId, hasSidebar }) => {
  const [targetSessionId, setTargetSessionId] = React.useState<string | null>(null);

  const handleSelect = (emojiName: string) => {
    const receiver = participants.find(p => p.sessionId === targetSessionId);
    onSelect(emojiName, targetSessionId ? receiver! : null);
    onClose(); // 선택 후 자동 닫기
  };

  // ESC 눌러서 닫기
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
    <EmojiPickerOverlay hasSidebar={hasSidebar} onClick={onClose}>
      <EmojiPickerContainer onClick={(e) => e.stopPropagation()}>
        <EmojiPickerHeader>
            <CloseButton onClick={onClose}>&times;</CloseButton>
        </EmojiPickerHeader>
        <EmojiGrid>
        {emojiList.map((emoji) => (
            <EmojiButton key={emoji.name} onClick={() => handleSelect(emoji.name)}>
            <emoji.Component width={28} height={28} />
            </EmojiButton>
        ))}
        </EmojiGrid>
        <TargetSelector>
          <label>수신자:</label>
          <select
            value={targetSessionId}
            onChange={e => setTargetSessionId(e.target.value)}
            >
            <option value={currentUserSessionId}>전체에게 보내기 (내 반응)</option>
            {participants
                .filter(p => p.sessionId !== currentUserSessionId)
                .filter((p, index, self) =>
                index === self.findIndex(other => other.sessionId === p.sessionId)
                ) 
                .map(p => (
                <option key={p.sessionId} value={p.sessionId}>
                    {p.username}
                </option>
                ))}
            </select>
        </TargetSelector>
      </EmojiPickerContainer>
    </EmojiPickerOverlay>
  );
};

export default EmojiPicker;
