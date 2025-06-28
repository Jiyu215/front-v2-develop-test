import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import * as kurentoUtils from 'kurento-utils';
import Waiting from "pages/room/waiting";
import Conference from "pages/room/conference";


import { theme } from 'assets/styles/theme';
import { darkTheme } from 'assets/styles/darkTheme';
import { ThemeProvider } from "styled-components";

const Room: React.FC = () => {
    const { roomId: urlRoomId } = useParams();

    const [joined, setJoined] = useState(false);
    const [userName, setUserName] = useState('');
    const [roomId, setRoomId] = useState(urlRoomId || '');
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [videoDeviceId, setVideoDeviceId] = useState('');
    const [audioDeviceId, setAudioDeviceId] = useState('');

    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

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
        <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        {!joined ? (
            <Waiting 
                
                isRoom={handleJoin} 
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
        ) : (
            <Conference 
                name={userName}
                roomId={roomId}
                isVideoOn={isVideoOn}
                isAudioOn={isAudioOn}
                videoDeviceId={videoDeviceId}
                audioDeviceId={audioDeviceId}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
            />
        )}
        </ThemeProvider>
    ); 
}

export default Room;