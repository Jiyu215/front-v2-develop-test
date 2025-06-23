import { useEffect, useRef, useState } from 'react';

interface VADOptions {
  intervalMs?: number;
  threshold?: number;
}

export default function useVoiceActivityDetection(
  stream: MediaStream | null,
  isAudioOn: boolean,
  options: VADOptions = {}
) {
  const { intervalMs = 200, threshold = 0.05 } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (!stream || !isAudioOn) {
      setIsSpeaking(false);
      return;
    }

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let isCancelled = false;

    const checkSpeaking = () => {
      analyser.getByteFrequencyData(dataArray);
      const avgVolume = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length / 255;
      setIsSpeaking(avgVolume > threshold);
    };

    const interval = setInterval(() => {
      if (!isCancelled) checkSpeaking();
    }, intervalMs);

    // 저장 레퍼런스 (종료 시 close)
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sourceRef.current = source;

    return () => {
      isCancelled = true;
      clearInterval(interval);
      source.disconnect();
      analyser.disconnect();
      audioContext.close();
    };
  }, [stream, isAudioOn]);

  return isSpeaking;
}
