import React from 'react';
import { PanelWrapper, ParticipantsList } from './ParticipantsPanel.styles';
import Participant from 'lib/webrtc/Participant';
import ParticipantItem from './components/ParticipantItem'
import ParticipantHeader from './components/ParticipantHeader';

interface Props {
  participants: Participant[];
  participantsVisible: boolean;
}

const ParticipantsPanel: React.FC<Props> = ({ participants, participantsVisible }) => {
  return (
    <PanelWrapper participantsVisible={participantsVisible}>
        <ParticipantHeader count={participants.length}/>
        <ParticipantsList>
        {participants.map((participant) => (
            <ParticipantItem key={participant.sessionId} participant={participant} />
        ))}
        </ParticipantsList>
    </PanelWrapper>
  );
};

export default ParticipantsPanel;
