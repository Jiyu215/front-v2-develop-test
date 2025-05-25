import React from 'react';
import { ChatMessagesWrapper, PanelWrapper } from './ChatPanel.styles';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { ChatMessage, ChatMessageInput } from 'types/chat';
import Participant from 'lib/webrtc/Participant';

interface ChatPanelProps {
  chatMessages: ChatMessage[];
  participants: Participant[];
  currentUserSessionId: string;
  participantsVisible: boolean;
  onSendMessage: (input: ChatMessageInput) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ chatMessages, participants, onSendMessage, currentUserSessionId, participantsVisible }) => {

  return (
    <PanelWrapper participantsVisible={participantsVisible}>
      <ChatHeader />
      <ChatMessagesWrapper>
        <ChatMessages chatMessages={chatMessages} currentUserSessionId={currentUserSessionId}/>
      </ChatMessagesWrapper>
      <ChatInput
        participants={participants}
        onSendMessage={onSendMessage}
      />
    </PanelWrapper>
  );
};

export default ChatPanel;
