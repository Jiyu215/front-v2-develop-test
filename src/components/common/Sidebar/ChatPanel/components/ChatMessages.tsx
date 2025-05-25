import React from 'react';
import { MessagesWrapper, MessageContainer, Profile, MessageContent, Name, MessageText, MessageList } from './ChatMessages.styles';  // 스타일 추가
import { ChatMessage } from 'types/chat';

interface ChatMessagesProps {
  chatMessages: ChatMessage[];
  currentUserSessionId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ chatMessages, currentUserSessionId }) => {
  return (
    <MessagesWrapper>
        <MessageList>
        {chatMessages.map((msg, idx) => (
            <MessageContainer
            key={idx}
            isCurrentUser={msg.sessionId === currentUserSessionId} // 내 메시지인지 확인
            >
            <Profile>
                {msg.sessionId === currentUserSessionId ? '나' : msg.from}
            </Profile>
            <MessageContent isCurrentUser={msg.sessionId === currentUserSessionId}>
                <Name>{msg.sessionId === currentUserSessionId ? 'You' : msg.from}</Name>
                <MessageText>{msg.content}</MessageText>
            </MessageContent>
            </MessageContainer>
        ))}
      </MessageList>
    </MessagesWrapper>
  );
};

export default ChatMessages;
