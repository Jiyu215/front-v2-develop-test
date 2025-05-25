import React,{ useState } from "react";
import * as kurentoUtils from 'kurento-utils';
import Waiting from "pages/room/waiting";
import Conference from "pages/room/conference";

const Room: React.FC = () => {
    const [joined, setJoined] = useState(false); // 참가 여부
    const [userName, setUserName] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleJoin = (name: string, room: string) => {
        setUserName(name);
        setRoomId(room);
        setJoined(true);
    };

    return(
        <>
        {!joined ? (
            <Waiting isRoom={handleJoin} />
        ) : (
            <Conference name={userName} roomId={roomId} />
        )}
        </>
    ); 
}

export default Room;