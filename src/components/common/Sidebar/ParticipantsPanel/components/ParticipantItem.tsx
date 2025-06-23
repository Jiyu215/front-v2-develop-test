import React from 'react';
import Participant from 'lib/webrtc/Participant';
import { ItemWrapper, Avatar, Username, StatusIcons } from './ParticipantItem.styles';
import { RaisingHands } from 'assets/images/emojis';
import { MicIcon,MicOffIcon,VideoIcon,VideoOffIcon } from 'assets/icons/black';
import { getUserColor } from 'lib/color/colorManager';

interface Props {
  participant: Participant;
  isHandRaised: boolean;
  isCurrentUser: boolean;
}

const ParticipantItem: React.FC<Props> = ({ participant, isHandRaised, isCurrentUser }) => {
  return (
    <ItemWrapper>
      <Avatar bgColor={getUserColor(participant.sessionId)}>{participant.username.charAt(0).toUpperCase()}</Avatar>
      <Username>
        {participant.username}
        {isCurrentUser && (<span> (YOU)</span>)}
        {isHandRaised && <RaisingHands/>}
      </Username>
      
      <StatusIcons>
        {participant.videoOn?<VideoIcon/>:<VideoOffIcon/>}
        {participant.audioOn?<MicIcon/>:<MicOffIcon/>}
      </StatusIcons>
    </ItemWrapper>
  );
};

export default ParticipantItem;
