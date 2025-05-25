import React from 'react';
import Participant from 'lib/webrtc/Participant';
import { ItemWrapper, Avatar, Username, StatusIcons } from './ParticipantItem.styles';

interface Props {
  participant: Participant;
}

const ParticipantItem: React.FC<Props> = ({ participant }) => {
  return (
    <ItemWrapper>
      <Avatar>{participant.username.charAt(0).toUpperCase()}</Avatar>
      <Username>{participant.username}</Username>
      <StatusIcons>
      </StatusIcons>
    </ItemWrapper>
  );
};

export default ParticipantItem;
