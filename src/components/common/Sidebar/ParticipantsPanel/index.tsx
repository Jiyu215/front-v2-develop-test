import React from 'react';
import { PanelWrapper, ParticipantsList, ButtonWrapper } from './ParticipantsPanel.styles';
import Participant from 'lib/webrtc/Participant';
import ParticipantItem from './components/ParticipantItem'
import ParticipantHeader from './components/ParticipantHeader';
import CopyRoomUrlButton from 'components/common/CopyRoomUrlButton';
import ChangeNameButton from 'components/common/ChangeNameButton';

interface Props {
  participants: Participant[];
  participantsVisible: boolean;
  roomId: string;
  currentUserSessionId: string;
  roomLeaderSessionId: string;
  raisedHandSessionIds: string[];
  changeNamePopupVisible: boolean;
  setChangeNamePopupVisible: (visible: boolean) => void;

  participantVolumes: Record<string, number>;
  onVolumeChange: (sessionId: string, volume: number) => void;
}

const ParticipantsPanel: React.FC<Props> = ({
  participants,
  participantsVisible,
  roomId,
  currentUserSessionId,
  roomLeaderSessionId,
  raisedHandSessionIds,
  changeNamePopupVisible,setChangeNamePopupVisible,
  participantVolumes, onVolumeChange
}) => {
  // 현재 유저
  const currentUser = participants.find(p => p.sessionId === currentUserSessionId);

  // 본인 제외한 나머지
  const others = participants.filter(p => p.sessionId !== currentUserSessionId);

  // 본인 제외한 나머지 중 방장
  const othersExceptRoomLeader = others.filter(p => p.sessionId !== roomLeaderSessionId);
  const roomLeader = participants.find(p => p.sessionId === roomLeaderSessionId);

  // 손든 사람 (본인 제외, 방장 제외)
  const raisedHands = othersExceptRoomLeader.filter(p => raisedHandSessionIds.includes(p.sessionId));

  // 손 안든 사람 (본인 제외, 방장 제외)
  const notRaised = othersExceptRoomLeader.filter(p => !raisedHandSessionIds.includes(p.sessionId));

  // 최종 정렬: 나 → 방장 → 손든 사람 → 그 외
  const sortedParticipants = [
    ...(currentUser ? [currentUser] : []),
    ...(roomLeader && roomLeader.sessionId !== currentUserSessionId ? [roomLeader] : []),
    ...raisedHands,
    ...notRaised,
  ];


  return (
    <PanelWrapper participantsVisible={participantsVisible}>
      <ParticipantHeader count={participants.length}/>
      <ParticipantsList>
        {sortedParticipants.map((participant) => (
          <ParticipantItem 
            key={participant.sessionId} 
            isCurrentUser={participant.sessionId === currentUserSessionId}
            participant={participant} 
            isHandRaised={raisedHandSessionIds.includes(participant.sessionId)}
            isRoomLeader={participant.sessionId === roomLeaderSessionId}
            isCurrentUserRoomLeader={currentUserSessionId === roomLeaderSessionId}

            volume={participantVolumes[participant.sessionId] ?? 50}
            onVolumeChange={(volume) => onVolumeChange(participant.sessionId, volume)}
          />
        ))}
      </ParticipantsList>
      <ButtonWrapper>
        <CopyRoomUrlButton roomId={roomId} />
        <ChangeNameButton onClick={() => setChangeNamePopupVisible(true)} />
      </ButtonWrapper>
    </PanelWrapper>
  );
};


export default ParticipantsPanel;
