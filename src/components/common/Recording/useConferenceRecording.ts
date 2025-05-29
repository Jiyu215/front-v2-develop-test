import { useState, useRef, useEffect } from 'react';

export const useConferenceRecording = (participantsStreams: MediaStream[]) => {
  const [isRecording, setIsRecording] = useState(false);
  const recordedChunks = useRef<BlobPart[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 캔버스에 여러 스트림 그리기
  const drawStreamsToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = participantsStreams.length;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const videoWidth = width / cols;
    const videoHeight = height / rows;

    participantsStreams.forEach((stream, i) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      video.play();

      const col = i % cols;
      const row = Math.floor(i / cols);

      video.onloadedmetadata = () => {
        ctx.drawImage(video, col * videoWidth, row * videoHeight, videoWidth, videoHeight);
      };
    });

    animationFrameId.current = requestAnimationFrame(drawStreamsToCanvas);
  };

  const startRecording = () => {
    if (!canvasRef.current) return;

    recordedChunks.current = [];
    const stream = canvasRef.current.captureStream(30);

    mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
    mediaRecorder.current.ondataavailable = e => {
      if (e.data.size > 0) recordedChunks.current.push(e.data);
    };
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `conference_recording_${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
    drawStreamsToCanvas();
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  return { isRecording, startRecording, stopRecording, canvasRef };
};
