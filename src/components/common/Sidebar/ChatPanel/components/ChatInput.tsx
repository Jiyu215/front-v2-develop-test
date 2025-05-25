import React, { useState } from 'react';
import { InputWrapper, Select, Input, Label, SelectArea, SendButton, InputArea } from './ChatInput.styles';
import type { ChatMessageInput } from 'types/chat';

interface ChatInputProps {
  participants: { sessionId: string; username: string }[];
  onSendMessage: (input: ChatMessageInput) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ participants, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');

  const handleSend = () => {
    if (message.trim() === '') return;

    onSendMessage({
      to: recipient,
      content: message,
      isPrivate: recipient !== 'all',
    });

    setMessage('');
  };

  return (
    <InputWrapper>
      <SelectArea>
        <Label htmlFor="recipient-select">수신자 :</Label>
        <Select id="recipient-select" value={recipient} onChange={(e) => setRecipient(e.target.value)}>
          <option value="all">전체에게</option>
          {participants.map((p) => (
            <option key={p.sessionId} value={p.sessionId}>
              {p.username}
            </option>
          ))}
        </Select>
      </SelectArea>
      <InputArea>
        <Input
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputArea>
    </InputWrapper>
  );
};

export default ChatInput;
