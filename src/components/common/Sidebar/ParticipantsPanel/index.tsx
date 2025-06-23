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
  raisedHandSessionIds: string[];
  changeNamePopupVisible: boolean;
  setChangeNamePopupVisible: (visible: boolean) => void;
}

const ParticipantsPanel: React.FC<Props> = ({
  participants,
  participantsVisible,
  roomId,
  currentUserSessionId,
  raisedHandSessionIds,
  changeNamePopupVisible,setChangeNamePopupVisible
}) => {
  // 현재 유저
  const currentUser = participants.find(p => p.sessionId === currentUserSessionId);

  // 본인 제외한 나머지
  const others = participants.filter(p => p.sessionId !== currentUserSessionId);

  // 손든 사람 (본인 제외)
  const raisedHands = others.filter(p => raisedHandSessionIds.includes(p.sessionId));

  // 손 안든 사람
  const notRaised = others.filter(p => !raisedHandSessionIds.includes(p.sessionId));

  // 최종 정렬: 나 → 손든 사람 → 그 외
  const sortedParticipants = [
    ...(currentUser ? [currentUser] : []),
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
