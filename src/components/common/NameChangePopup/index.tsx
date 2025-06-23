import React, { useState } from 'react';
import {
  Overlay,
  PopupContainer,
  Title,
  Input,
  ButtonGroup,
  Button,
  ErrorText,
} from './NameChangePopup.styles';

interface NameChangePopupProps {
  currentName: string;
  onChangeName: (newName: string) => void;
  onClose: () => void
}

const NameChangePopup: React.FC<NameChangePopupProps> = ({
  currentName,
  onChangeName,
  onClose
}) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim() !== '') {
      setError('');
    }
  };

  const handleSave = () => {
    const trimmedName = name.trim();

    if (trimmedName === '') {
        setError('이름을 입력해주세요.');
        return;
    }

    if (trimmedName === currentName.trim()) {
        setError('기존 이름과 동일합니다.');
        return;
    }

    onChangeName(name.trim());
    onClose();
  };

  return (
    <Overlay onClick={onClose}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <Title>이름 변경</Title>
        <Input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="새 이름을 입력하세요"
          maxLength={20}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonGroup>
          <Button onClick={onClose}>취소</Button>
          <Button variant="primary" onClick={handleSave}>
            이름 변경
          </Button>
        </ButtonGroup>
      </PopupContainer>
    </Overlay>
  );
};

export default NameChangePopup;
