import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import * as kurentoUtils from 'kurento-utils';
import Waiting from "pages/room/waiting";
import Conference from "pages/room/conference";

const Room: React.FC = () => {
    const { roomId: urlRoomId } = useParams();

    const [joined, setJoined] = useState(false);
    const [userName, setUserName] = useState('');
    const [roomId, setRoomId] = useState(urlRoomId || '');
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');

    const handleJoin = (
        name: string,
        roomId: string,
        isVideoOn: boolean,
        isAudioOn: boolean,
        videoDeviceId?: string,
        audioDeviceId?: string
    ) => {
        setUserName(name);
        setRoomId(roomId);
        setIsVideoOn(isVideoOn);
        setIsAudioOn(isAudioOn);
        setVideoDeviceId(videoDeviceId || '');
        setAudioDeviceId(audioDeviceId || '');
        setJoined(true);
    };

    return(
        <>
        {!joined ? (
            <Waiting isRoom={handleJoin} />
        ) : (
            <Conference 
                name={userName}
                roomId={roomId}
                isVideoOn={isVideoOn}
                isAudioOn={isAudioOn}
                videoDeviceId={videoDeviceId}
                audioDeviceId={audioDeviceId}/>
        )}
        </>
    ); 
}

export default Room;