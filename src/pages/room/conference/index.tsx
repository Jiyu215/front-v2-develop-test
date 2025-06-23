import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as kurentoUtils from 'kurento-utils';
import fixWebmDuration from 'webm-duration-fix';
import Header from 'components/common/Header';
import Participant from 'lib/webrtc/Participant';
import ParticipantVideo from 'components/common/Video/ParticipantVideo';
import CallControls from 'components/common/CallControls';
import { Wrapper, GalleryWrapper, MainArea, ParticipantVideoGroup } from './Conference.styles';
import Sidebar from 'components/common/Sidebar';
import { ChatMessage, ChatMessageInput } from 'types/chat';
import { EmojiMessage } from 'types/emoji';
import EmojiPicker from 'components/common/EmojiPicker';
import ChangeNameForm from 'components/common/UserSettings/ChangeNameForm';
import RecordingStatusPopup from 'components/common/Recording/RecordingStatusPopup';
import ListPopup from 'components/common/ListPopup';
import RecordingPermissionPopup from 'components/common/Recording/RecordingPermissionPopup';
import RecordingConsentPopup from 'components/common/Recording/RecordingConsentPopup';
// import { useScreenRecording } from 'lib/hooks/useRecording';
import { useRecording } from 'lib/hooks/useRecording';
import { useTopSpeaker } from 'lib/hooks/useTopSpeaker';
import { useSortedSpeakers } from 'lib/hooks/useSortedSpeakers';
import NameChangePopup from 'components/common/NameChangePopup';
import AudioInputSelector from 'components/common/UserSettings/AudioInputSelector';
import VideoInputSelector from 'components/common/UserSettings/VideoInputSelector';

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

// const wsServerUrl = "wss://vmo.o-r.kr:8080";
const wsServerUrl = "ws://localhost:8080";

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

    const micOnRef = useRef(micOn);

    const [participantsVisible, setParticipantsVisible] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordingPaused, setRecordingPaused] = useState(true);
    const [recordingListVisible, setRecordingListVisible] = useState(false);
    const [recordingPopupVisible, setRecordingPopupVisible] = useState(false);
    const [recordingConsentPopupVisible, setRecordingConsentPopupVisible] = useState(false);

    const [captionsVisible, setCaptionsVisible] = useState(false);
    const [emotesVisible, setEmotesVisible] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [changeNamePopupVisible, setChangeNamePopupVisible] = useState(false);

    const [micListVisible, setMicListVisible] = useState(false);
    const [videoListVisible, setVideoListVisible] = useState(false);

    //참가자 점수 저장
    const [speakingScores, setSpeakingScores] = useState<{ [id: string]: number }>({});
    const [firstSpokenTimestamps, setFirstSpokenTimestamps] = useState<{ [id: string]: number }>({});

    const handleMicListToggle = () => setMicListVisible(prev => !prev);
  const handleVideoListToggle = () => setVideoListVisible(prev => !prev);
  
    const handleSpeakingScoreChange = (sessionId: string, score: number) => {
        setSpeakingScores(prev => {
            if (prev[sessionId] === score) {
                return prev;
            }
            return { ...prev, [sessionId]: score };
        });

        setFirstSpokenTimestamps(prev => {
            if (prev[sessionId] != null || score <= 0) return prev;
            return { ...prev, [sessionId]: Date.now() };
        });
    };
    const topSpeaker = useTopSpeaker(speakingScores);
    const topSpeakerRef = useRef(topSpeaker);
    const sortedSpeakerIds = useSortedSpeakers(speakingScores, firstSpokenTimestamps);

    const mainSpeakerId = sortedSpeakerIds[0];
    const subSpeakerIds = sortedSpeakerIds.slice(1);


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

    // const handleScreenSharingToggle = () => setScreenSharing((prev) => !prev);
    const [videoTracks, setVideoTracks] = useState<{
    [id: string]: { video: MediaStreamTrack; audio: MediaStreamTrack };
    }>({});

    const handleScreenSharingToggle = async () => {
        const participant = participantsRef.current[userData.sessionId];
        if (!participant?.rtcPeer) return;

        const peerConnection = participant.rtcPeer.peerConnection;
        const videoSender = peerConnection.getSenders().find(s => s.track?.kind === "video");
        const audioSender = peerConnection.getSenders().find(s => s.track?.kind === "audio");

        if (!videoSender || !audioSender) return;

        if (!screenSharing) {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
            });

            const micStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            });

            const screenTrack = displayStream.getVideoTracks()[0];
            const micTrack = micStream.getAudioTracks()[0];

            // 기존 트랙을 먼저 저장
            const prevVideoTrack = videoSender.track;
            const prevAudioTrack = audioSender.track;

            setVideoTracks(prev => ({
            ...prev,
            [userData.sessionId]: {
                video: prevVideoTrack,
                audio: prevAudioTrack,
            }
            }));

            // 트랙 교체
            await videoSender.replaceTrack(screenTrack);
            await audioSender.replaceTrack(micTrack);

            // 비디오 엘리먼트에 화면공유 스트림 할당
            const localVideoEl = videoRefs.current[userData.sessionId]?.current;
            if (localVideoEl) localVideoEl.srcObject = displayStream;

            setScreenSharing(true);

            screenTrack.onended = async () => {
            const prevTracks = videoTracks[userData.sessionId];
            if (prevTracks?.video) await videoSender.replaceTrack(prevTracks.video);
            if (prevTracks?.audio) await audioSender.replaceTrack(prevTracks.audio);

            if (localVideoEl && localStreamRef.current) {
                localVideoEl.srcObject = localStreamRef.current;
            }

            setScreenSharing(false);
            };

            } catch (err) {
            console.error("화면 공유 시작 오류:", err);
            }
        } else {
            // 🔁 원래 트랙 복구
            const prevTracks = videoTracks[userData.sessionId];
            if (prevTracks?.video) await videoSender.replaceTrack(prevTracks.video);
            if (prevTracks?.audio) await audioSender.replaceTrack(prevTracks.audio);

            const localVideoEl = videoRefs.current[userData.sessionId]?.current;
            if (localVideoEl && localStreamRef.current) {
            localVideoEl.srcObject = localStreamRef.current;
            }

            setScreenSharing(false);
        }
    };

    const replaceAudioTrack = async (newDeviceId: string) => {
  const participant = participantsRef.current[userData.sessionId];
  if (!participant?.rtcPeer) return;

  const audioSender = participant.rtcPeer.peerConnection
    .getSenders()
    .find((s) => s.track?.kind === "audio");

  if (!audioSender) return;

  const newStream = await navigator.mediaDevices.getUserMedia({
    audio: { deviceId: { exact: newDeviceId } }
  });

  const newAudioTrack = newStream.getAudioTracks()[0];
  await audioSender.replaceTrack(newAudioTrack);

  // 로컬 비디오 스트림에도 반영
  const localStream = localStreamRef.current;
  if (localStream) {
    localStream.removeTrack(localStream.getAudioTracks()[0]);
    localStream.addTrack(newAudioTrack);
  }

  // UI에서도 듣기 반영
  const localVideoEl = videoRefs.current[userData.sessionId]?.current;
  if (localVideoEl) {
    localVideoEl.srcObject = localStream;
  }
};
const replaceVideoTrack = async (newDeviceId: string) => {
  const participant = participantsRef.current[userData.sessionId];
  if (!participant?.rtcPeer) return;

  const videoSender = participant.rtcPeer.peerConnection
    .getSenders()
    .find((s) => s.track?.kind === "video");

  if (!videoSender) return;

  const newStream = await navigator.mediaDevices.getUserMedia({
    video: { deviceId: { exact: newDeviceId } }
  });

  const newVideoTrack = newStream.getVideoTracks()[0];
  await videoSender.replaceTrack(newVideoTrack);

  const localStream = localStreamRef.current;
  if (localStream) {
    localStream.removeTrack(localStream.getVideoTracks()[0]);
    localStream.addTrack(newVideoTrack);
  }

  const localVideoEl = videoRefs.current[userData.sessionId]?.current;
  if (localVideoEl) {
    localVideoEl.srcObject = localStream;
  }
};


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
    const [recordedFiles, setRecordedFiles] = useState<RecordedFile[]>([]);
    const [elapsed, setElapsed] = useState(0); //녹화 시간 저장
    const [pendingSessionId, setPendingSessionId] = useState<string | null>(null);

    //프론트 녹화 함수들
    const { start, stop, pause, resume, setMicEnabled } = useRecording({
        onStop: async (blob) => {
            const fixedBlob = await fixWebmDuration(blob);
            const url = URL.createObjectURL(fixedBlob);
            const fileName = getFileName();
            setRecordedFiles(prev => [...prev, { url, fileName, duration: elapsed }]);
            setElapsed(0);
        }
    });

    //녹화본 이름
    const getFileName = () => {
        const now = new Date();
        return `recording_${now.toISOString().replace(/[:.]/g, '-')}.webm`;
    };


    const [userData, setUserData] = useState<UserData>({
        sessionId: '',
        username: name,
        roomId: roomId,
        audioOn: isAudioOn,
        videoOn: isVideoOn,
    });
    const userDataRef = useRef(userData);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [emojiMessages, setEmojiMessages] = useState<EmojiMessage[]>([]);
    const [systemMessages, setSystemMessages] = useState<SystemMessage[]>([]);

    //손든 사람 목록
    const [raisedHandSessionIds, setRaisedHandSessionIds] = useState<string[]>([]);

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
                    eventId: 'exitRoom',
                    username: name,
                    roomId: roomId,
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
                case 'cancelHandRaise': //손들기 철회
                    setRaisedHandSessionIds((prev) =>
                        prev.filter((id) => id !== parsedMessage.sessionId)
                    );
                    break;
                case 'changeName': //이름 변경
                    handleUsernameChanged(parsedMessage);
                    break;
                
                //녹화 기능
                case 'startRecording': // 녹화 시작
                    sendMessage({ eventId: 'confirmRecordingConsent' });
                    start(micOnRef.current).then(() => {
                        setRecordingPaused(false); // 타이머 이제 시작 가능
                    }).catch((err) => {
                        console.error('녹화 시작 실패:', err);
                    });
                    break;
                case 'stopRecording': // 녹화 중지
                    stop();
                    finalizeRecordingSession();
                    break;
                // case 'saveRecording': // 녹화본 다운로드
                //     break;
                case 'pauseRecording': // 녹화 일시정지
                    pause();
                    setRecordingPaused(true);
                    break;
                case 'resumeRecording': // 녹화 재개
                    resume();
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
                
                //녹화 동의
                case 'confirmRecordingConsent':
                    setRecordingConsentPopupVisible(true);
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

    useEffect(() => {
        topSpeakerRef.current = topSpeaker;
    }, [topSpeaker]);

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

            setSpeakingScores(prev => ({
                ...prev,
                [sender.sessionId]: 0
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
                participant.rtcPeer.peerConnection.addEventListener("track", (event) => {
                console.log(`[Participant ${participant.sessionId}] 트랙 추가됨: ${event.track.kind}`);

                const remoteStream = event.streams[0]; // 트랙이 포함된 MediaStream

                const videoEl = videoRefs.current[participant.sessionId]?.current;
                if (videoEl && !videoEl.srcObject) {
                    videoEl.srcObject = remoteStream;
                    console.log(`[Participant ${participant.sessionId}] video.srcObject에 remoteStream 할당됨`);
                }
                });
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

        setSpeakingScores(prev => ({
            ...prev,
            [msg.sessionId]: 0
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

                // 비디오 엘리먼트가 렌더링되고 ref가 연결될 때까지 잠시 딜레이
                setTimeout(() => {
                    const localVideoEl = videoRefs.current[msg.sessionId]?.current;
                    if (localVideoEl) {
                        localVideoEl.srcObject = stream;
                        console.log(`[Participant ${msg.sessionId}] video.srcObject set.`);
                    } else {
                        console.warn(`[Participant ${msg.sessionId}] video element not ready yet.`);
                    }
                }, 100); // 100ms 딜레이 (필요에 따라 조절)

                // if (localVideoRef.current) {
                //     localVideoRef.current.srcObject = stream;
                // }

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

        setSpeakingScores(prev => {
            const updated = { ...prev };
            delete updated[sessionId];
            return updated;
        });

        setFirstSpokenTimestamps(prev => {
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
        if (data.sessionId === userDataRef.current.sessionId) {
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
            action?: string;
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
            // sessionId: data.receiverSessionId,
            sessionId: topSpeakerRef.current?.id,
        };

        console.log(topSpeakerRef.current?.id);

        setEmojiMessages((prev) => [...prev, emojiMessage]);
        
        if(data.emoji==='Raising_Hands') {
            setRaisedHandSessionIds((prev) => {
                if (!prev.includes(data.senderSessionId)) {
                    return [...prev, data.senderSessionId];
                }
                return prev;
            });
        }

        // 3초 뒤 자동 제거 (애니메이션 처리 가능)
        setTimeout(() => {
            setEmojiMessages((prev) => prev.filter((m) => m !== emojiMessage));
        }, 3000);
    };

    const finalizeRecordingSession = (/*fileName?: string*/) => {
        setRecording(false);
        setRecordingPaused(false);

        // if (fileName?.trim()) {
        //     setRecordedFiles(prev => [...prev, fileName]);
        // }
    };

    useEffect(() => {
        userDataRef.current = userData; // userData가 바뀔 때마다 ref도 업데이트
    }, [userData]);
    
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
                micOnRef.current = micOn;
                setMicEnabled(micOnRef.current);
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
                {/* {sortedSpeakerIds.map((sessionId) => {
                    const participant = participants[sessionId];
                    if (!participant) return null;

                    return (
                    <ParticipantVideo
                        key={participant.sessionId}
                        isVideoOn={participant.videoOn}
                        isAudioOn={participant.audioOn}
                        sessionId={participant.sessionId}
                        username={participant.username}
                        ref={videoRefs.current[participant.sessionId]}
                        mySessionId={userData.sessionId}
                        emojiName={
                        emojiMessages.find((msg) => msg.sessionId === participant.sessionId)?.emoji
                        }
                        onSpeakingScoreChange={(score) =>
                            handleSpeakingScoreChange(participant.sessionId, score)
                        }
                    />
                    );
                })} */}
                <ParticipantVideoGroup $cols={sortedSpeakerIds.length-1}>
                {sortedSpeakerIds.map((sessionId, index) => {
                    const participant = participants[sessionId];
                    if (!participant) return null;

                    const isMain = index === 0;

                    return (
                    <ParticipantVideo
                        key={participant.sessionId}
                        sessionId={participant.sessionId}
                        username={participant.username}
                        isVideoOn={participant.videoOn}
                        isAudioOn={participant.audioOn}
                        ref={videoRefs.current[sessionId]}
                        mySessionId={userData.sessionId}
                        emojiName={emojiMessages.find(msg => msg.sessionId === sessionId)?.emoji}
                        onSpeakingScoreChange={(score) => handleSpeakingScoreChange(sessionId, score)}
                        className={isMain ? 'main-video' : 'sub-video'} // ⬅️ 스타일 구분
                    />
                    );
                })}
                </ParticipantVideoGroup>
                {recording && (
                    <RecordingStatusPopup
                        isPaused={recordingPaused}
                        elapsed={elapsed}
                        setElapsed={setElapsed}
                        onPause={() => sendMessage({ eventId: 'pauseRecording' })}
                        onResume={() => sendMessage({ eventId: 'resumeRecording' })}
                        onStop={() => sendMessage({ eventId: 'stopRecording' })}
                    />
                )}               
            </GalleryWrapper>
            <CallControls
                micOn={micOn}
                setMicOn={handleMicToggle}
                micListVisible={micListVisible}
                setMicListVisible={handleMicListToggle}
        
                videoOn={videoOn}
                setVideoOn={handleVideoToggle}
                videoListVisible={videoListVisible}
                setVideoListVisible={handleVideoListToggle}

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
        {changeNamePopupVisible && 
        (<NameChangePopup
            currentName={userData.username}
            onChangeName={(newName) => {
                const message = {
                eventId: 'changeName',
                sessionId: userData.sessionId,
                newUserName: newName,
                };
                sendMessage(message);
            }}
            onClose={()=>setChangeNamePopupVisible(false)}
        />)}


        {/* <ChangeNameForm
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
            /> */}
        <Sidebar 
            participants={Object.values(participants)} 
            participantsVisible={participantsVisible}
            chatVisible={chatVisible} 
            systemMessages={systemMessages}
            chatMessages={chatMessages}
            currentUserSessionId={userData.sessionId}
            onSendMessage={sendChatMessage}
            roomId={userData.roomId}
            raisedHandSessionIds={raisedHandSessionIds}

            changeNamePopupVisible={changeNamePopupVisible}
            setChangeNamePopupVisible={setChangeNamePopupVisible}
        />
        {emotesVisible && (
            <EmojiPicker
                participants={Object.values(participants)}
                currentUserSessionId={userData.sessionId}
                onClose={() => setEmotesVisible(false)}
                onSelect={(emojiName) => {
                    if (!topSpeaker) {
                        console.warn("❗ 수신자가 없습니다. 이모지를 보내지 않습니다.");
                        return;
                    }

                    let messagePayload;
                    // 손 내리기 이벤트 처리
                    if (emojiName === 'Lowering_Hands') {
                        messagePayload = {
                        eventId: 'cancelHandRaise', // 손 내리기 이벤트
                        };
                    } else{
                        // 손 들기 이벤트 처리
                        messagePayload = {
                        eventId: 'sendPublicEmoji',
                        receiverSessionId: topSpeaker.id,
                        emoji: emojiName,
                        };
                    }
                    
                    sendMessage(messagePayload);
                }}
                hasSidebar={hasSidebar}
                handRaised={handRaised}
                setHandRaised={setHandRaised}
            />
        )}

        {/* 녹화본 리스트 팝업 */}
        {/* 백엔드에서 녹화본 리스트를 받을 경우 */}
        {/* {recordingListVisible && (
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

                    // 새로운 창 열기
                    const downloadWindow = window.open('', '_blank');
                    if (!downloadWindow) {
                    alert('새로운 창을 열 수 없습니다.');
                    return;
                    }

                    // 다운로드 링크 생성 및 클릭
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    downloadWindow.document.body.appendChild(a);
                    a.click();

                    // 창이 닫히도록 설정
                    downloadWindow.close();
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
        )} */}

        {recordingListVisible && (
        <ListPopup
            title="녹화본 다운로드"
            items={recordedFiles}
            renderItem={(item) => (
            <span
                onClick={() => {
                const a = document.createElement('a');
                a.href = item.url;               // url로 접근
                a.download = item.fileName;     // 파일 이름으로 다운로드
                a.click();
                closeRecordingList();
                }}
                title="클릭해서 다운로드"
                style={{ cursor: 'pointer' }}
            >
                {item.fileName}  {/* 사용자에게 보여줄 파일명 */}
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
        {recordingConsentPopupVisible && (
            <RecordingConsentPopup
                onConfirmConsent={()=>{
                    setRecordingConsentPopupVisible(false);
                }}

                onDeclineConsent={()=>{
                    setRecordingConsentPopupVisible(false);
                    exitRoom();
                }}
            />
        )}
        {micListVisible&&(<AudioInputSelector onDeviceChange={replaceAudioTrack} />)}
        {videoListVisible&&(<VideoInputSelector onDeviceChange={replaceVideoTrack} />)}
    </Wrapper>
    );
};

export default Conference;
