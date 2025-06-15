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

  onCreate: (
    name: string,
    roomId: string,
    isVideoOn: boolean,
    isAudioOn: boolean,
    videoDeviceId?: string,
    audioDeviceId?: string
  ) => void;
};

const CreateRoom: React.FC<Props> = ({ name, onNameChange, roomId, onRoomIdChange, settings, onCreate }) => {

  const handleCreate = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    
    onCreate(
      name,
      '',
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
      <Button onClick={handleCreate}>방 생성</Button>
    </InputWrapper>
  );
};

export default CreateRoom;
