import { useState, useRef, useEffect } from 'react';

export const useScreenRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const recordedChunksRef = useRef<BlobPart[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      console.log('Start recording requested');

      // 화면+시스템 오디오 스트림 요청
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true, // 시스템 오디오
      });

      // 마이크 오디오 스트림 요청
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // 화면 비디오 트랙 + 시스템 오디오 트랙 + 마이크 오디오 트랙 합치기
      const combinedStream = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...displayStream.getAudioTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      streamRef.current = combinedStream;

      recordedChunksRef.current = []; // 녹화 시작 시 초기화

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp9' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log('ondataavailable event:', event.data.size, 'bytes');
          console.log('Recorded chunks length:', recordedChunksRef.current.length);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('Recording stopped');
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        downloadRecording(); // 자동 다운로드
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log('MediaRecorder started');
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  const stopRecording = () => {
    console.log('Stop recording requested');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('MediaRecorder stop called');
    } else {
      console.log('MediaRecorder is not recording');
    }
  };

  const downloadRecording = () => {
    console.log('downloadRecording called');
    const chunks = recordedChunksRef.current;
    if (chunks.length === 0) {
      console.log('No recorded chunks to download');
      return;
    }

    const blob = new Blob(chunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `screen_recording_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      console.log('Download link removed');
    }, 100);
  };

  // 컴포넌트 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        console.log('Cleaned up tracks on unmount');
      }
    };
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};