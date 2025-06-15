import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import {
  Wrapper,
  TitleWrapper,
  LogoImage,
  SubTitle,
  ButtonWrapper,
  StyledButton
} from './Home.styles';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    navigate(`/room/${roomId}`, { state: { action: 'create' } });
  };

  const handleJoinRoom = () => {
    navigate(`/room/${roomId}`, { state: { action: 'join' } });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <LogoImage />
        <SubTitle>누구나 쉽게 시작하는 화상 통화 플랫폼</SubTitle>
      </TitleWrapper>

      <ButtonWrapper>
        <Button variant='secondary' onClick={handleCreateRoom}>방 생성</Button>
        <Button variant='secondary' onClick={handleJoinRoom}>방 참가</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Home;