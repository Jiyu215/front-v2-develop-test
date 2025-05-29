import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'components/common/Header';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import { Wrapper, WaitingWrapper, RoomActionWrapper, PreviewWapper } from './Waiting.styles';

type Props = {
  isRoom: (name: string, roomId: string) => void;
};

const Waiting: React.FC<Props> = ({ isRoom }) => {
    const location = useLocation();
    const action = location.state?.action;
    return (
    <Wrapper>
        <Header />
        <WaitingWrapper>
        <RoomActionWrapper>
            {action === 'create' ? (
            <CreateRoom onCreate={isRoom} />
            ) : (
            <JoinRoom onJoin={isRoom} />
            )}
        </RoomActionWrapper>
        <PreviewWapper />
        </WaitingWrapper>
    </Wrapper>
    );
};

export default Waiting;