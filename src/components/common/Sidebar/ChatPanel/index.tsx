import React from 'react';
import { ChatMessagesWrapper, PanelWrapper } from './ChatPanel.styles';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { ChatMessage, ChatMessageInput } from 'types/chat';
import Participant from 'lib/webrtc/Participant';

interface ChatPanelProps {
  chatMessages: ChatMessage[];
  systemMessages: SystemMessage[];
  participants: Participant[];
  currentUserSessionId: string;
  chatVisible: boolean;
  onSendMessage: (input: ChatMessageInput) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ chatMessages, systemMessages, participants, onSendMessage, currentUserSessionId, chatVisible }) => {

  return (
    <PanelWrapper chatVisible={chatVisible}>
      <ChatHeader />
      <ChatMessagesWrapper>
        <ChatMessages
            participants={participants} 
            chatMessages={chatMessages} 
            systemMessages={systemMessages}
            currentUserSessionId={currentUserSessionId}
        />
      </ChatMessagesWrapper>
      <ChatInput
        participants={participants}
        currentUserSessionId={currentUserSessionId}
        onSendMessage={onSendMessage}
      />
    </PanelWrapper>
  );
};

export default ChatPanel;
