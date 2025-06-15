import React, {useState, useEffect } from 'react';
import { useLocation, useParams  } from 'react-router-dom';
import Header from 'components/common/Header';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';
import VideoPreviewPanel from './VideoPreviewPanel';
import DeviceSettingsPanel from './DeviceSettingsPanel';
import { Wrapper, WaitingWrapper, RoomActionWrapper, PreviewWapper } from './Waiting.styles';

type Props = {
  isRoom: (name: string, roomId: string, isVideoOn: boolean, isAudioOn: boolean, videoDeviceId?: string, audioDeviceId?: string) => void;
};

const Waiting: React.FC<Props> = ({ isRoom }) => {
    const location = useLocation();
    const { roomId: paramRoomId } = useParams<{ roomId: string }>();
    const [roomId, setRoomId] = useState(paramRoomId || '');
    const action = location.state?.action;

    // 이름과 방 코드 상태 관리
    const [username, setUsername] = useState('');

    // DeviceSettingsPanel에서 받아온 설정을 상태로 관리
    const [settings, setSettings] = useState<{
            isVideoOn: boolean;
            isAudioOn: boolean;
            videoDeviceId?: string;
            audioDeviceId?: string;
        }>({
            isVideoOn: true,
            isAudioOn: true,
            videoDeviceId: '',
            audioDeviceId: '',
        });
    useEffect(() => {
        if (paramRoomId) {
            setRoomId(paramRoomId);
        }
    }, [paramRoomId]);

    return (
    <Wrapper>
        <Header />
        <WaitingWrapper>
        <RoomActionWrapper>
            {action === 'create' ? (
            <CreateRoom 
                name={username}
                onNameChange={setUsername}
                onRoomIdChange={setRoomId}
                roomId={roomId}
                settings={settings}
                onCreate={(name, roomId) =>
                    isRoom(name, roomId, settings.isVideoOn, settings.isAudioOn, settings.videoDeviceId, settings.audioDeviceId)
                } />
            ) : (
            <JoinRoom
                name={username}
                onNameChange={setUsername}
                onRoomIdChange={setRoomId}
                roomId={roomId}
                settings={settings}
                onJoin={(name, roomId) =>
                    isRoom(name, roomId, settings.isVideoOn, settings.isAudioOn, settings.videoDeviceId, settings.audioDeviceId)
                } />
            )}
            <DeviceSettingsPanel
                onChange={(settings) => setSettings(settings)}
            />
        </RoomActionWrapper>
        <PreviewWapper>
          <VideoPreviewPanel
            username={username}
            isVideoOn={settings.isVideoOn}
            isAudioOn={settings.isAudioOn}

            // videoDeviceId, audioDeviceId는 VideoPreviewPanel에서 스트림 설정에 활용
            videoDeviceId={settings.videoDeviceId}
            audioDeviceId={settings.audioDeviceId}
          />

          
        </PreviewWapper>
        </WaitingWrapper>
    </Wrapper>
    );
};

export default Waiting;