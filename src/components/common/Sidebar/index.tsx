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
  systemMessages: SystemMessage[];
  currentUserSessionId: string;
  roomLeaderSessionId: string;
  onSendMessage: (input: ChatMessageInput) => void;
  roomId: string;
  raisedHandSessionIds: string[]; 
  changeNamePopupVisible: boolean;
  setChangeNamePopupVisible: (visible: boolean) => void;

  participantVolumes: Record<string, number>;
  onVolumeChange: (sessionId: string, volume: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    participants,
    participantsVisible, 
    chatVisible, 
    chatMessages, onSendMessage, systemMessages, raisedHandSessionIds,
    currentUserSessionId, roomLeaderSessionId,
    roomId,
    changeNamePopupVisible,setChangeNamePopupVisible,
    participantVolumes, onVolumeChange
 }) => {
    const isOpen = participantsVisible || chatVisible;

    return(
    <SidebarWrapper isOpen={isOpen}>
        {participantsVisible && (
            <ParticipantsArea>
                <ParticipantsPanel 
                    participants={participants} 
                    participantsVisible={participantsVisible && !chatVisible} 
                    roomId={roomId} 
                    roomLeaderSessionId={roomLeaderSessionId}
                    raisedHandSessionIds={raisedHandSessionIds} 
                    currentUserSessionId={currentUserSessionId}
                    
                    changeNamePopupVisible={changeNamePopupVisible}
                    setChangeNamePopupVisible={setChangeNamePopupVisible}

                    participantVolumes={participantVolumes}        // 추가
                    onVolumeChange={onVolumeChange}
                />
            </ParticipantsArea>
        )}
        {chatVisible && (
            <ChatArea>
                <ChatPanel 
                    chatMessages={chatMessages}
                    systemMessages={systemMessages}
                    participants={participants}
                    onSendMessage={onSendMessage}
                    chatVisible={chatVisible && !participantsVisible}
                    currentUserSessionId={currentUserSessionId} 
                />
            </ChatArea>
        )}
    </SidebarWrapper>
  );
};

export default Sidebar;