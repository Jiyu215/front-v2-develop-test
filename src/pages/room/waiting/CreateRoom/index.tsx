import React, { useState } from 'react';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { InputWrapper, LogoImage } from '../Waiting.styles';

type Props = {
  onCreate: (name: string, roomId: string) => void;
};

const CreateRoom: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    onCreate(name, '');
  };

  return (
    <InputWrapper>
      <LogoImage />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <Button onClick={handleCreate}>방 생성</Button>
    </InputWrapper>
  );
};

export default CreateRoom;
