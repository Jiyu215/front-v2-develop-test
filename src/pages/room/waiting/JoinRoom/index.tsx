// waiting/JoinRoom.tsx
import React, { useState } from 'react';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { InputWrapper, LogoImage } from '../Waiting.styles';

type Props = {
  onJoin: (name: string, roomId: string) => void;
};

const JoinRoom: React.FC<Props> = ({ onJoin }) => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    onJoin(name, roomId);
  };

  return (
    <InputWrapper>
      <LogoImage />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="방 코드를 입력하세요"
      />
      <Button onClick={handleJoin}>방 참가</Button>
    </InputWrapper>
  );
};

export default JoinRoom;
