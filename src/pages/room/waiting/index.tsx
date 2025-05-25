import React, { useState } from 'react';
import Header from 'components/common/Header';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import { Wrapper, WaitingWrapper, JoinWrapper, PreviewWapper, InputWrapper, LogoImage } from './Waiting.styles';

type Props = {
    isRoom: (name: string, roomId: string) => void;
}


const Waiting: React.FC<Props> = ({isRoom}) => {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleJoin = () => {
        if (!name.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }
        
        isRoom(name, roomId);
    };

    return(
        <Wrapper>
            <Header/>
            <WaitingWrapper>
                <JoinWrapper>
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
                </JoinWrapper>
                <PreviewWapper></PreviewWapper>
            </WaitingWrapper>
        </Wrapper>
    );
}

export default Waiting;