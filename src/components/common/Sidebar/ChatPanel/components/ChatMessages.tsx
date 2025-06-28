import React from 'react';
import { MessagesWrapper, MessageContainer, Profile, MessageContent, Name, MessageText, MessageList,  MessageMeta, MessageBody, HighlightText } from './ChatMessages.styles';  // 스타일 추가
import { ChatMessage } from 'types/chat';
import { getUserColor } from 'lib/color/colorManager';

interface ChatMessagesProps {
    participants: { sessionId: string; username: string }[];
    chatMessages: ChatMessage[];
    systemMessages: SystemMessage[];
    currentUserSessionId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ chatMessages, systemMessages, currentUserSessionId, participants }) => {

    const getUsernameBySessionId = (sessionId: string) => {
    return participants.find(p => p.sessionId === sessionId)?.username ?? '';
    };
    return (
    <MessagesWrapper>
        <MessageList>
        {systemMessages.map((msg, idx) => (
          <div
            key={`system-${idx}`}
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
              color: '#888',
              margin: '8px 0',
              fontSize: '12px',
            }}
          >
            {msg.content}
          </div>
        ))}

        {chatMessages.map((msg, idx) => (
            <MessageContainer
                key={idx}
                isCurrentUser={msg.sessionId === currentUserSessionId}
            >
                <Profile bgColor={getUserColor(msg.sessionId)}>
                    {msg.sessionId === currentUserSessionId ? '나' : msg.from.charAt(0)}
                </Profile>
                <MessageContent isCurrentUser={msg.sessionId === currentUserSessionId}>
                    {msg.type === 'private' && (
                        <MessageMeta>
                            {msg.sessionId === currentUserSessionId ? (
                                <>To. <HighlightText>{getUsernameBySessionId(msg.to)}</HighlightText></>
                            ) : (
                                <>From. <HighlightText>{msg.from}</HighlightText></>
                            )}
                        </MessageMeta>
                    )}
                    <MessageBody isCurrentUser={msg.sessionId === currentUserSessionId}>
                        <Name>{msg.sessionId === currentUserSessionId ? 'You' : msg.from}</Name>
                        <MessageText>{msg.content}</MessageText>
                    </MessageBody>
                </MessageContent>
            </MessageContainer>
        ))}
        </MessageList>
    </MessagesWrapper>
    );
};

export default ChatMessages;
