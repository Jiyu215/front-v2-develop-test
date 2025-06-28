import React, {useState} from 'react';
import Participant from 'lib/webrtc/Participant';
import { ItemWrapper, Avatar, Username, StatusIcons } from './ParticipantItem.styles';
import { RaisingHands } from 'assets/images/emojis';
// import { MicIcon,MicOffIcon,VideoIcon,VideoOffIcon } from 'assets/icons/black';
import { getUserColor } from 'lib/color/colorManager';
import { useIconSet } from 'lib/hooks/useIconSet';
import MicMoreMenu from 'components/common/MicMoreMenu/DropdownMenu';

interface Props {
  participant: Participant;
  isHandRaised: boolean;
  isCurrentUser: boolean;
  isRoomLeader: boolean;
  isCurrentUserRoomLeader: boolean;

  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

const ParticipantItem: React.FC<Props> = ({ participant, isHandRaised, isCurrentUser, isRoomLeader, isCurrentUserRoomLeader, volume, onVolumeChange }) => {
  const { MicIcon,RedMicOffIcon,VideoIcon,RedVideoOffIcon } = useIconSet();

  const handleVolumeChange = (newVolume: number) => {
    onVolumeChange(newVolume);
  };

  const handleToggleMute = () => {
    // 음소거 토글 로직
    alert(`마이크 음소거 토글 - ${participant.username}`);
  };

  const handleToggleVideoOff = () => {
    // 비디오 끄기 토글 로직
    alert(`비디오 끄기 토글 - ${participant.username}`);
  };

  return (
    <ItemWrapper>
      <Avatar bgColor={getUserColor(participant.sessionId)}>{participant.username.charAt(0).toUpperCase()}</Avatar>
      <Username>
        {participant.username}
        {isCurrentUser && (<span> (YOU)</span>)}
        {isRoomLeader && <span> (방장)</span>}
        {isHandRaised && <RaisingHands/>}
      </Username>
      
      <StatusIcons>
        {participant.videoOn?<VideoIcon/>:<RedVideoOffIcon/>}
        {participant.audioOn?<MicIcon/>:<RedMicOffIcon/>}
        {!isCurrentUser && (
          <MicMoreMenu
            isCurrentUserRoomLeader={isCurrentUserRoomLeader}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            onToggleMute={handleToggleMute}
            onToggleVideoOff={handleToggleVideoOff}
          />
        )}
      </StatusIcons>
    </ItemWrapper>
  );
};

export default ParticipantItem;
