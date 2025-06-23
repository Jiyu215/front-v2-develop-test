// waiting/JoinRoom.tsx
import React, { useState } from 'react';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { InputWrapper, LogoImage } from '../Waiting.styles';

type Props = {
  name: string;
  onNameChange: (name: string) => void;
  roomId: string;
  onRoomIdChange: (roomId: string) => void;

  settings: {
    isVideoOn: boolean;
    isAudioOn: boolean;
    videoDeviceId?: string;
    audioDeviceId?: string;
  };
  
  onJoin: (
    name: string,
    roomId: string,
    isVideoOn: boolean,
    isAudioOn: boolean,
    videoDeviceId?: string,
    audioDeviceId?: string
  ) => void;

};

const JoinRoom: React.FC<Props> = ({ name, onNameChange, onRoomIdChange, roomId, settings ,onJoin }) => {
  // const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!roomId.trim()) {
      alert('방 코드를 입력해주세요.');
      return;
    }

    onJoin(
      name,
      roomId,
      settings.isVideoOn,
      settings.isAudioOn,
      settings.videoDeviceId,
      settings.audioDeviceId
    );
  };

  return (
    <InputWrapper>
      <LogoImage />
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <Input
        value={roomId}
        onChange={(e) => onRoomIdChange(e.target.value)}
        placeholder="방 코드를 입력하세요"
      />
      <Button onClick={handleJoin}>방 참가</Button>
    </InputWrapper>
  );
};

export default JoinRoom;
