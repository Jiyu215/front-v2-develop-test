import React from 'react';
import { PanelWrapper, ParticipantsList } from './ParticipantsPanel.styles';
import Participant from 'lib/webrtc/Participant';
import ParticipantItem from './components/ParticipantItem'
import ParticipantHeader from './components/ParticipantHeader';
import CopyRoomUrlButton from 'components/common/CopyRoomUrlButton';

interface Props {
  participants: Participant[];
  participantsVisible: boolean;
  roomId: string;
}

const ParticipantsPanel: React.FC<Props> = ({ participants, participantsVisible, roomId  }) => {
  return (
    <PanelWrapper participantsVisible={participantsVisible}>
        <ParticipantHeader count={participants.length}/>
        <ParticipantsList>
        {participants.map((participant) => (
            <ParticipantItem key={participant.sessionId} participant={participant} />
        ))}
        </ParticipantsList>
        <CopyRoomUrlButton roomId={roomId} />
    </PanelWrapper>
  );
};

export default ParticipantsPanel;
