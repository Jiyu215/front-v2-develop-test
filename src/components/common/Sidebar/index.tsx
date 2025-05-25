import ChatPanel from "./ChatPanel";
import ParticipantsPanel from "./ParticipantsPanel";
import Participant from 'lib/webrtc/Participant';
import { SidebarWrapper, ChatArea, ParticipantsArea } from "./Sidebar.styles";
import type { ChatMessage, ChatMessageInput } from 'types/chat';

interface SidebarProps {
  participants: Participant[];
  participantsVisible: boolean;
  chatVisible: boolean;
  chatMessages: ChatMessage[];
  currentUserSessionId: string;
  onSendMessage: (input: ChatMessageInput) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    participants,
    participantsVisible, 
    chatVisible, 
    chatMessages, onSendMessage,
    currentUserSessionId
 }) => {
    const isOpen = participantsVisible || chatVisible;

    return(
    <SidebarWrapper isOpen={isOpen}>
        {participantsVisible && (
            <ParticipantsArea>
                <ParticipantsPanel participants={participants} participantsVisible={participantsVisible}/>
            </ParticipantsArea>
        )}
        {chatVisible && (
            <ChatArea>
                <ChatPanel 
                    chatMessages={chatMessages}
                    participants={participants}
                    onSendMessage={onSendMessage}
                    participantsVisible={participantsVisible}
                    currentUserSessionId={currentUserSessionId} 
                />
            </ChatArea>
        )}
    </SidebarWrapper>
  );
};

export default Sidebar;