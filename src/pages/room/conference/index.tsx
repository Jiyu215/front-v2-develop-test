import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as kurentoUtils from 'kurento-utils';
import Header from 'components/common/Header';
import Participant from 'lib/webrtc/Participant';
import ParticipantVideo from 'components/common/Video/ParticipantVideo';
import CallControls from 'components/common/CallControls';
import { Wrapper, GalleryWrapper, MainArea } from './Conference.styles';
import Sidebar from 'components/common/Sidebar';
import { ChatMessage, ChatMessageInput } from 'types/chat';
import { EmojiMessage } from 'types/emoji';
import EmojiPicker from 'components/common/EmojiPicker';
import ChangeNameForm from 'components/common/UserSettings/ChangeNameForm';
import RecordingStatusPopup from 'components/common/Recording/RecordingStatusPopup';
import ListPopup from 'components/common/ListPopup';
import RecordingPermissionPopup from 'components/common/Recording/RecordingPermissionPopup';
// import { useScreenRecording } from 'lib/hooks/useRecording';

type ConferenceProps = {
    name: string;
    roomId: string;
    isVideoOn: boolean;
    isAudioOn: boolean;
    videoDeviceId?: string;
    audioDeviceId?: string;
};

// User data 타입 정의
interface UserData {
    sessionId: string;
    username: string;
    roomId: string;
    audioOn: boolean;
    videoOn: boolean;
}

const wsServerUrl = "wss://vmo.o-r.kr:8080";
// const wsServerUrl = "ws://localhost:8080";

const iceServers = [
    { urls: "stuns:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    {
        urls: "turn:vmo.o-r.kr:3478",
        username: "user",
        credential: "1234abcd"
    },
    {
        urls: "turns:vmo.o-r.kr:5349",
        username: "user",
        credential: "1234abcd"
    }
];

const Conference: React.FC<ConferenceProps> = ({ 
        name,
        roomId,
        isVideoOn,
        isAudioOn,
        videoDeviceId,
        audioDeviceId 
    }) => {

    //CallControls에서 받는 값
    const [micOn, setMicOn] = useState(isAudioOn);
    const [videoOn, setVideoOn] = useState(isVideoOn);

    const [participantsVisible, setParticipantsVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordingPaused, setRecordingPaused] = useState(false);
    const [recordingListVisible, setRecordingListVisible] = useState(false);
    const [recordingPopupVisible, setRecordingPopupVisible] = useState(false);
    const [captionsVisible, setCaptionsVisible] = useState(false);
    const [emotesVisible, setEmotesVisible] = useState(false);

    const handleMicToggle = () => {
        const newMicState = !micOn;
        setMicOn(newMicState);

        sendMessage({
            eventId: 'audioStateChange',
            audioOn: newMicState
        });
    };

    const handleVideoToggle = () => {
        const newVideoState = !videoOn;
        setVideoOn(newVideoState);

        sendMessage({
            eventId: 'videoStateChange',
            videoOn: newVideoState
        });
    };

    const handleScreenSharingToggle = () => setScreenSharing((prev) => !prev);
    const handleRecordingToggle = () => {
        if(roomLeader.sessionId===userData.sessionId){   
            startRecording();
        }else{
            sendMessage({eventId:'requestRecordingPermission'});  
        }

        stopRecording();
    };

    const startRecording = () => {
        if(!recording){
            sendMessage({ eventId: 'startRecording' });
            setRecording((prev) => !prev);
            setRecordingPaused(false);
        }
    };

    const stopRecording = () => {
        if(recording) {
            sendMessage({ eventId: 'stopRecording' });
        }
    }

    const handleCaptionsToggle = () => setCaptionsVisible((prev) => !prev);
    const handleChatToggle = () => setChatVisible((prev) => !prev);
    const handleParticipantsToggle = () => setParticipantsVisible((prev) => !prev);
    const handleEmotesToggle = () => setEmotesVisible((prev) => !prev);

    const navigate = useNavigate();

    // 녹화 리스트 팝업 열기/닫기
    const handleRecordingListToggle = () => {
        setRecordingListVisible(prev => !prev);
    };

    // 녹화 리스트 팝업 닫기
    const closeRecordingList = () => {
        setRecordingListVisible(false);
    };

    const isJoin = roomId.trim().length > 0;
    const ws = useRef<WebSocket | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const videoRefs = useRef<{ [sessionId: string]: React.RefObject<HTMLVideoElement> }>({});

    const [participants, setParticipants] = useState<{ [sessionId: string]: Participant }>({});
    const participantsRef = useRef<{ [sessionId: string]: Participant }>({});
    const [roomLeader, setRoomLeader] = useState<{ sessionId: string; username: string }>({ sessionId: '', username: ''});
    const [recordedFiles, setRecordedFiles] = useState<string[]>([]);
    const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);


    const [userData, setUserData] = useState<UserData>({
        sessionId: '',
        username: name,
        roomId: roomId,
        audioOn: isAudioOn,
        videoOn: isVideoOn,
    });

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [emojiMessages, setEmojiMessages] = useState<EmojiMessage[]>([]);
    const [systemMessages, setSystemMessages] = useState<SystemMessage[]>([]);
    const hasSidebar = chatVisible || participantsVisible;

    useEffect(()=>{
        ws.current = new WebSocket(wsServerUrl);

        ws.current.onopen = () => {
            console.log('WebSocket connection opened.');

            const message = isJoin ? {
                eventId: 'joinRoom',
                username: name,
                roomId: roomId,
                audioOn: isAudioOn,     // 오디오 상태 값
                videoOn: isVideoOn,     // 비디오 상태 값
            }:{
                eventId: 'createRoom',
                username: name,
                audioOn: isAudioOn,
                videoOn: isVideoOn,
            }

            ws.current.send(JSON.stringify(message));
        };

        // ✅ 브라우저 닫기/새로고침 시 exitRoom 전송
        const handleBeforeUnload = () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                const exitMessage = {
                    eventId: 'exitRoom'
                };
                ws.current.send(JSON.stringify(exitMessage));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        ws.current.onmessage = (message) => {
            let parsedMessage = JSON.parse(message.data);
            console.info('Received message: ' + message.data);

            // 에러 메시지 처리
            if (parsedMessage.type === "ERROR" && parsedMessage.message?.includes("존재하지 않는 방입니다")) {
                alert(parsedMessage.message);
                navigate('/');  // useNavigate() 훅으로 이동하세요
                return; // 이후 처리 중단
            }

            switch (parsedMessage.action) {
                case 'roomCreated':
                    roomCreated(parsedMessage);
                    break;
                case 'sendExistingUsers':
                    sendExistingUsers(parsedMessage);
                    break;
                case 'newUserJoined':
                    newUserJoined(parsedMessage);
                    break;
                case 'onIceCandidate': //사용자 peer연결
                    onIceCandidate(parsedMessage);
                    break;
                case 'receiveVideoAnswer': //비디오 연결
                    receiveVideoResponse(parsedMessage);
                    break;
                case 'exitRoom':
                    userLeft(parsedMessage);
                    break;
                case 'leaderChanged':
                    handleLeaderChanged(parsedMessage);
                    break;
                case 'sendPersonalChat':
                    handleChatMessage(parsedMessage, true);
                    break;
                case 'broadcastChat':
                    handleChatMessage(parsedMessage, false);
                    break;
                case 'audioStateChange':
                    handleAudioStateChange(parsedMessage);
                    break;
                case 'videoStateChange':
                    handleVideoStateChange(parsedMessage);
                    break;
                // case 'sendPrivateEmoji': //비공개 이모지
                //     handleEmojiMessage(parsedMessage, true);
                //     break;
                case 'sendPublicEmoji': //공개 이모지
                    handleEmojiMessage(parsedMessage);
                    break;
                case 'changeName': //이름 변경
                    handleUsernameChanged(parsedMessage);
                    break;
                
                //녹화 기능
                case 'startRecording': // 녹화 시작
                    break;
                case 'stopRecording': // 녹화 중지
                    finalizeRecordingSession(parsedMessage.fileName);
                    break;
                // case 'saveRecording': // 녹화본 다운로드
                //     break;
                case 'pauseRecording': // 녹화 일시정지
                    setRecordingPaused(true);
                    break;
                case 'resumeRecording': // 녹화 재개
                    setRecordingPaused(false);
                    break;
                
                //녹화 권한
                case 'requestRecordingPermission':
                    setPendingSessionId(parsedMessage.sessionId);
                    setRecordingPopupVisible(true);
                    break;
                case 'grantRecordingPermission':
                    startRecording();
                    break;
                case 'denyRecordingPermission':
                    break;
                default:
                    console.error('Unrecognized message', parsedMessage);
            }
        }

        return () => {
            if(ws.current){
                console.log("Closing WebSocket connection.");
                ws.current.close();  // 웹소켓 연결 종료
            }
        }
    },[]);

    useEffect(()=>{
        console.log("userData:",userData);
    },[userData]);

    const sendMessage = (message) => {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(jsonMessage);
        }
    }
    
    const roomCreated = (response:{ 
        sessionId: string;
        username: string;
        roomId: string;
        roomLeaderId: string;
        roomLeaderName: string;
     }) => {
        console.log('Room created response:', response);

        // 서버에서 받은 응답에 맞게 유저 데이터를 업데이트
        setUserData((prevData) => ({
            ...prevData,
            sessionId: response.sessionId,
            roomId: response.roomId, // 방 ID 업데이트
        }));

        sendExistingUsers(response);
    }

    const receiveVideo = (sender) => {
        let participant = participantsRef.current[sender.sessionId];

        if (!participant) {
            participant = new Participant(sender.sessionId, sender.username, sendMessage, sender.videoOn, sender.audioOn);

            // 비디오 ref 등록
            if (!videoRefs.current[sender.sessionId]) {
                videoRefs.current[sender.sessionId] = React.createRef<HTMLVideoElement>();
            }
            console.log("videoRefs.current[sender.sessionId]",videoRefs.current[sender.sessionId]);

            participantsRef.current[sender.sessionId] = participant;
            setParticipants(prev => ({
                ...prev,
                [sender.sessionId]: participant
            }));
        }

        // 💡 렌더링 이후까지 기다렸다가 비디오 연결 시도
        setTimeout(() => {
            const videoElement = videoRefs.current[sender.sessionId]?.current;

            if (!videoElement) {
                console.warn("❗ 비디오 요소가 아직 준비되지 않았습니다:", sender.sessionId);
                return;
            }

            const options = {
                configuration: { iceServers },
                remoteVideo: videoElement,
                onicecandidate: participant.onIceCandidate.bind(participant),
            };

            participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
                if (error) {
                    console.error("WebRtcPeerRecvonly 생성 실패:", error);
                    return;
                }

                this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            });
        }, 1000); // 💡 100ms 정도의 짧은 지연
    };


    const newUserJoined = (msg) => {
        receiveVideo(msg);
    }

    const sendExistingUsers = (msg) => {
        const participant = new Participant(msg.sessionId, msg.username,sendMessage, msg.videoOn, msg.audioOn);
        participantsRef.current[msg.sessionId] = participant;

        setRoomLeader({
            sessionId: msg.roomLeaderId,
            username: msg.roomLeaderName,
        });

        setParticipants(prev => ({
            ...prev,
            [msg.sessionId]: participant
        }));

        setUserData((prevData) => ({
            ...prevData,
            sessionId: msg.sessionId,
        }));

        if (msg.roomId) {
            addSystemMessage(`📢 현재 방 코드: ${msg.roomId}`);
        } else if (userData.roomId) {
            addSystemMessage(`📢 현재 방 코드: ${userData.roomId}`);
        }
        

        if (!videoRefs.current[msg.sessionId]) {
            videoRefs.current[msg.sessionId] = React.createRef<HTMLVideoElement>();
        }
        
        console.log("videoRefs.current[msg.sessionId]",videoRefs.current[msg.sessionId]);
        const localVideoRef = videoRefs.current[msg.sessionId];

        // getUserMedia → WebRTC 연결
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                 // 스트림 전역에 저장
                localStreamRef.current = stream;

                // 현재 오디오/비디오 상태 반영
                stream.getAudioTracks().forEach(track => (track.enabled = micOn));
                stream.getVideoTracks().forEach(track => (track.enabled = videoOn));

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                const options = {
                    configuration: {iceServers: iceServers},
                    localVideo: stream,
                    mediaConstraints: { audio: true, video: true },
                    onicecandidate: participant.onIceCandidate.bind(participant),
                };

                participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error: any) {
                    if (error) {
                        return console.error("WebRtcPeerSendonly 생성 오류:", error);
                    }

                    this.peerConnection.addEventListener("iceconnectionstatechange", () => {
                        console.log(`ICE 상태: ${this.peerConnection.iceConnectionState}`);
                    });

                    this.generateOffer(participant.offerToReceiveVideo.bind(participant));
                });
                // 기존 참가자 목록 처리
                if (msg.participants && Array.isArray(msg.participants)) {
                    msg.participants.forEach((existingParticipantInfo) => {
                        // 기존 참가자 처리
                        const existingParticipant = parseParticipant(existingParticipantInfo);

                        // 기존 참가자에게 비디오 수신 설정
                        receiveVideo(existingParticipant);
                    });
                }
            })
            .catch((error) => {
                console.error("로컬 미디어 접근 오류:", error);
            });        
    }

    const parseParticipant = (participantInfo) => {
        // 문자열이면 JSON 파싱
        if (typeof participantInfo === 'string') {
            try {
            const parsed = JSON.parse(participantInfo);
            const result = {
                sessionId: parsed.sessionId,
                username: parsed.username,
                audioOn: typeof parsed.audioOn === "string" ? parsed.audioOn === "true" : !!parsed.audioOn,
                videoOn: typeof parsed.videoOn === "string" ? parsed.videoOn === "true" : !!parsed.videoOn,
            };
            console.log("✅ 파싱된 참가자:", result);
            return result;
            } catch (e) {
            console.error("❌ 문자열 파싱 실패:", participantInfo, e);
            return null;
            }
        }

        // 객체면 그대로 처리
        return {
            sessionId: participantInfo.sessionId,
            username: participantInfo.username,
            audioOn: typeof participantInfo.audioOn === 'string' ? participantInfo.audioOn === "true" : !!participantInfo.audioOn,
            videoOn: typeof participantInfo.videoOn === 'string' ? participantInfo.videoOn === "true" : !!participantInfo.videoOn
        };
    };

    const receiveVideoResponse = (result: { sessionId: string; sdpAnswer: string }) => {
        // 참가자가 존재하는지 확인
        let participant = participantsRef.current[result.sessionId]

        if (!participant) {
            console.error(`Participant with sessionId ${result.sessionId} not found.`);
            return;
        }

        // rtcPeer가 없으면 새로운 rtcPeer를 생성해야 함
        if (!participant.rtcPeer) {
            console.error(`rtcPeer for participant ${result.sessionId} is not initialized.`);
            return;
        }

        // processAnswer 호출
        participant.rtcPeer.processAnswer(result.sdpAnswer, function (error: any) {
            if (error) {
                console.error('Error processing SDP answer:', error);
                return;
            }
            console.log('SDP answer processed successfully');
        });
    };


    const onIceCandidate = (message: any) => {
        const { sessionId, candidate } = message;
        const participant = participantsRef.current[sessionId];

        // 1. 참가자가 존재하는지 확인
        if (!participant) {
            console.error(`Participant with sessionId ${sessionId} does not exist.`);
            return;
        }

        // 2. rtcPeer가 생성되지 않았다면, 초기화가 필요
        if (!participant.rtcPeer) {
            console.error(`rtcPeer is not initialized for participant ${sessionId}`);
            return;
        }

        // 3. ICE 후보를 rtcPeer에 추가
        const iceCandidate = new RTCIceCandidate(candidate);
        participant.rtcPeer.addIceCandidate(iceCandidate, (error) => {
            if (error) {
                console.error('Failed to add ICE candidate:', error);
            } else {
                console.log('ICE candidate added for participant:', sessionId);
            }
        });
    };

    const exitRoom = () => {
        const message = {
            eventId: 'exitRoom',
            sessionId: userData.sessionId
        };
        
        sendMessage(message);
        navigate('/');
    }

    const userLeft = (request: { sessionId: string }) => {
        const sessionId = request.sessionId;
        const participant = participantsRef.current[sessionId];

        if (!participant) {
            console.warn("🚫 해당 sessionId의 참가자가 없습니다:", sessionId);
            return;
        }

        console.log("👋 사용자 퇴장 처리 시작:", participant.username);

        // 1. WebRTC 연결 정리
        participant.dispose();

        // 2. ref 객체에서 삭제
        delete participantsRef.current[sessionId];
        delete videoRefs.current[sessionId];

        // 3. 상태에서 제거 → UI에서 사라짐
        setParticipants(prev => {
            const updated = { ...prev };
            delete updated[sessionId];
            return updated;
        });

        // 4. 방장이 나갔다면 콘솔 알림 (방장 변경은 서버에서 별도 이벤트로 처리 중)
        if (roomLeader.sessionId === sessionId) {
            console.log("⚠️ 방장이 퇴장했습니다. 서버에서 leaderChanged 이벤트가 오기를 대기 중...");
        }
    };



    const handleLeaderChanged = (data: { roomLeaderId: string; roomLeadername: string }) => {
        setRoomLeader({
            sessionId: data.roomLeaderId,
            username: data.roomLeadername,
        });
    };

    // 오디오 상태 변경 처리 함수
    const handleAudioStateChange = (msg) => {
        setParticipants(prev => {
            const updated = { ...prev };
            if (updated[msg.sessionId]) {
                updated[msg.sessionId].audioOn = msg.audioOn;
            }
            return updated;
        });

        if (participantsRef.current[msg.sessionId]) {
            participantsRef.current[msg.sessionId].audioOn = msg.audioOn;
        }
    };

    // 비디오 상태 변경 처리 함수
    const handleVideoStateChange = (msg) => {
        setParticipants(prev => {
            const updated = { ...prev };
            if (updated[msg.sessionId]) {
                updated[msg.sessionId].videoOn = msg.videoOn;
            }
            return updated;
        });

        if (participantsRef.current[msg.sessionId]) {
            participantsRef.current[msg.sessionId].videoOn = msg.videoOn;
        }
    };


    const handleUsernameChanged = (data: { sessionId: string; newUserName: string }) => {
        // participants 상태 업데이트
        setParticipants(prev => {
            const updated = { ...prev };
            if (updated[data.sessionId]) {
            updated[data.sessionId].username = data.newUserName;
            }
            return updated;
        });

        // ref에도 반영
        if (participantsRef.current[data.sessionId]) {
            participantsRef.current[data.sessionId].username = data.newUserName;
        }

        // 본인일 경우 userData도 업데이트
        if (data.sessionId === userData.sessionId) {
            setUserData(prev => ({
            ...prev,
            username: data.newUserName,
            }));
        }
    };

    const addSystemMessage = (content: string) => {
        setSystemMessages(prev => [
            ...prev,
            {
            content,
            timestamp: Date.now(),
            },
        ]);
    };

    const handleChatMessage = (
        data: {
            senderSessionId: string;
            senderName: string;
            receiverSessionId: string;
            receiverName: string;
            message: string;
        },
        isPrivate: boolean
        ) => {
        const chat: ChatMessage = {
            type: isPrivate ? 'private' : 'public',
            from: data.senderName,
            to: data.receiverName,
            content: data.message,
            sessionId: data.senderSessionId,
        };
        console.log("Chat message added:", chat); // 디버그용 로그
        setChatMessages(prev => [...prev, chat]);
    };

    const sendChatMessage = ({ to, content, isPrivate }: ChatMessageInput) => {
        // 내가 보낸 메시지를 상태에 바로 추가
        const newMessage: ChatMessage = {
            type: isPrivate ? 'private' : 'public',
            from: userData.username,  // 내가 보낸 메시지의 경우, userData에서 이름을 가져오기기
            to,
            content,
            sessionId: userData.sessionId,
        };

        // 상태에 추가하여 즉시 표시되게 하기
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);

        const messagePayload = isPrivate
        ? {
              eventId: 'sendPersonalChat',
              receiverSessionId: to,
              message: content,
          }
        : {
              eventId: 'broadcastChat',
              message: content,
          };

        sendMessage(messagePayload);
    };

    const handleEmojiMessage = (
        data: {
            senderSessionId: string;
            senderName: string;
            receiverSessionId: string;
            receiverName: string;
            emoji: string;
        }) => {
        const emojiMessage: EmojiMessage = {
            from: data.senderName,
            to: data.receiverName,
            emoji: data.emoji,
            sessionId: data.receiverSessionId,
        };

        setEmojiMessages((prev) => [...prev, emojiMessage]);

        // 3초 뒤 자동 제거 (애니메이션 처리 가능)
        setTimeout(() => {
            setEmojiMessages((prev) => prev.filter((m) => m !== emojiMessage));
        }, 3000);
    };

    const finalizeRecordingSession = (fileName?: string) => {
        setRecording(false);
        setRecordingPaused(false);

        if (fileName?.trim()) {
            setRecordedFiles(prev => [...prev, fileName]);
        }
    };
    
    // 참가자 상태가 변경될 때마다 UI에 반영
    useEffect(() => {
        // 참가자가 추가되었을 때 화면에 비디오 업데이트
        console.log('Participants updated:', participants);
        Object.values(participants).forEach((participant) => {
            if (!videoRefs.current[participant.sessionId]) {
                videoRefs.current[participant.sessionId] = React.createRef<HTMLVideoElement>();
            }
        });
    }, [participants]);

    // 마이크 상태 변경 시 오디오 트랙에 반영
    useEffect(() => {
        const stream = localStreamRef.current;
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = micOn;
                console.log(`🎤 마이크 상태 변경: ${micOn}`);
            });
        }
    }, [micOn]);

    // 비디오 상태 변경 시 비디오 트랙에 반영
    useEffect(() => {
        const stream = localStreamRef.current;
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = videoOn;
                console.log(`📹 비디오 상태 변경: ${videoOn}`);
            });
        }
    }, [videoOn]);


    return (
    <Wrapper>
        <MainArea>
            <Header variant="compact" />
            <GalleryWrapper>
                {Object.values(participants).map((participant) => (
                    <ParticipantVideo 
                        isVideoOn={participant.videoOn} 
                        isAudioOn={participant.audioOn} 
                        key={participant.sessionId} 
                        sessionId={participant.sessionId} 
                        username={participant.username}  
                        ref={videoRefs.current[participant.sessionId]}
                        mySessionId={userData.sessionId}
                        emojiName={
                            emojiMessages.find((msg) => msg.sessionId === participant.sessionId)?.emoji
                        }
                    />
                ))}
                {recording && (
                    <RecordingStatusPopup
                        isPaused={recordingPaused}
                        onPause={() => sendMessage({ eventId: 'pauseRecording' })}
                        onResume={() => sendMessage({ eventId: 'resumeRecording' })}
                        onStop={() => sendMessage({ eventId: 'stopRecording' })}
                    />
                )}
                
            </GalleryWrapper>
            <CallControls
                micOn={micOn}
                setMicOn={handleMicToggle}
                videoOn={videoOn}
                setVideoOn={handleVideoToggle}
                screenSharing={screenSharing}
                setScreenSharing={handleScreenSharingToggle}
                recording={recording}
                recordingListVisible={recordingListVisible}
                setRecordingListVisible={handleRecordingListToggle}
                setRecording={handleRecordingToggle}
                captionsVisible={captionsVisible}
                setCaptionsVisible={handleCaptionsToggle}
                chatVisible={chatVisible}
                setChatVisible={handleChatToggle}
                participantsVisible={participantsVisible}
                setParticipantsVisible={handleParticipantsToggle}
                emotesVisible={emotesVisible}
                setEmotesVisible={handleEmotesToggle}
                onExit={exitRoom}
            />
        </MainArea>
        <ChangeNameForm
            currentName={userData.username}
            sessionId={userData.sessionId}
            onChangeName={(newName) => {
                const message = {
                eventId: 'changeName',
                sessionId: userData.sessionId,
                newUserName: newName,
                };
                sendMessage(message);
            }}
            />
        <Sidebar 
            participants={Object.values(participants)} 
            participantsVisible={participantsVisible}
            chatVisible={chatVisible} 
            systemMessages={systemMessages}
            chatMessages={chatMessages}
            currentUserSessionId={userData.sessionId}
            onSendMessage={sendChatMessage}
            roomId={userData.roomId}
        />
        {emotesVisible && (
            <EmojiPicker
                participants={Object.values(participants)}
                currentUserSessionId={userData.sessionId}
                onClose={() => setEmotesVisible(false)}
                onSelect={(emojiName, receiver) => {
                    if (!receiver) {
                        console.warn("❗ 수신자가 없습니다. 이모지를 보내지 않습니다.");
                        return;
                    }
                    const messagePayload = {
                        eventId: 'sendPublicEmoji',
                        // senderSessionId: userData.sessionId,
                        receiverSessionId: receiver.sessionId,
                        emoji: emojiName,
                    };
                    
                    sendMessage(messagePayload);
                }}
                hasSidebar={hasSidebar}
            />
        )}

        {/* 녹화본 리스트 팝업 */}
        {recordingListVisible && (
        <ListPopup
            title="녹화본 다운로드"
            items={recordedFiles}
            renderItem={(item) => (
            <span
                onClick={async () => {
                const fileName = `${item}`;
                const encodedFileName = encodeURIComponent(fileName); // 🔒 안전한 URL 변환
                const url = `https://vmo.o-r.kr:8080/recordings/${encodedFileName}`;

                try {
                    // HEAD 요청으로 파일 존재 확인
                    const response = await fetch(url, { method: 'HEAD' });
                    if (!response.ok) {
                    alert('녹화 파일이 존재하지 않습니다.');
                    return;
                    }

                    // 다운로드 링크 생성 및 클릭
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    closeRecordingList();
                } catch (error) {
                    console.error('다운로드 중 오류 발생:', error);
                    alert('다운로드에 실패했습니다.');
                }
                }}
                title="클릭해서 다운로드"
            >
                {item}
            </span>
            )}
            onClose={closeRecordingList}
            hasSidebar={hasSidebar}
            popupLeft={45}
        />
        )}
        {recordingPopupVisible && (
            <RecordingPermissionPopup 
                username={participants[pendingSessionId]?.username || '알 수 없는 사용자'} 

                onGrant={() => {
                    sendMessage({
                        eventId: 'grantRecordingPermission',
                        sessionId: pendingSessionId
                    });
                    setRecordingPopupVisible(false);
                    setPendingSessionId(null);
                }}

                onDeny={() => {
                    sendMessage({
                        eventId: 'denyRecordingPermission',
                        sessionId: pendingSessionId
                    });
                    setRecordingPopupVisible(false);
                    setPendingSessionId(null);
                }}
            />)}
    </Wrapper>
    );
};

export default Conference;
