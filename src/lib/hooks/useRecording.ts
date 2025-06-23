import { useRef } from 'react';

interface UseRecordingOptions {
  onStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export const useRecording = ({ onStop, onError }: UseRecordingOptions = {}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const micTrackRef = useRef<MediaStreamTrack | null>(null); // ✅ 마이크 트랙 참조

  const start = async (micEnabled: boolean) => {
    try {
      // 1. 화면 공유 스트림
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // 2. 마이크 스트림
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micTrack = micStream.getAudioTracks()[0];
      micTrack.enabled = micEnabled;
      console.log("micEnabled",micEnabled);
      micTrackRef.current = micTrack;

      // 3. 스트림 합치기
      const combinedStream = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...micStream.getAudioTracks(),
      ]);

      // 4. 녹화 시작
      const recorder = new MediaRecorder(combinedStream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        chunksRef.current = [];
        onStop?.(blob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      streamRef.current = combinedStream;
    } catch (err) {
      if (onError && err instanceof Error) onError(err);
      else alert('녹화를 시작할 수 없습니다.');
    }
  };

  const pause = () => {
    const r = mediaRecorderRef.current;
    if (r?.state === 'recording') r.pause();
  };

  const resume = () => {
    const r = mediaRecorderRef.current;
    if (r?.state === 'paused') r.resume();
  };

  const stop = () => {
    const r = mediaRecorderRef.current;
    if (!r) return;

    r.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());

    mediaRecorderRef.current = null;
    streamRef.current = null;
    micTrackRef.current = null;
  };

  // ✅ 녹화 중 마이크 상태 토글용 함수
  const setMicEnabled = (enabled: boolean) => {
    if (micTrackRef.current) {
      micTrackRef.current.enabled = enabled;
    }
  };

  return { start, pause, resume, stop, setMicEnabled };
};
