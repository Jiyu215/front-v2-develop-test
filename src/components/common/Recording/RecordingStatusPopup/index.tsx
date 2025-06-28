import React, { useEffect, useRef } from 'react';
import {
  PopupContainer,
  PopupHeader,
  PopupControls,
  ControlButton,
} from './RecordingStatusPopup.styles';

import { useReversedIconSet } from 'lib/hooks/useReversedIconSet';

interface RecordingStatusPopupProps {
  isPaused: boolean;
  elapsed: number;
  setElapsed: React.Dispatch<React.SetStateAction<number>>;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const RecordingStatusPopup: React.FC<RecordingStatusPopupProps> = ({
  isPaused,
  elapsed,
  setElapsed,
  onPause,
  onResume,
  onStop
}) => {
  const { Play, Stop, Pause, RecordIcon } = useReversedIconSet();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null); // ⏱️ 기준 시간 저장

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        const diff = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsed(diff);
      }
    }, 1000);
  };


  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleStop = () => {
    stopTimer();
    onStop();
    startTimeRef.current = null; // ⛔ 녹화 종료 시 기준 초기화
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hrs, mins, secs]
      .map((v) => String(v).padStart(2, '0'))
      .join(':');
  };

  useEffect(() => {
  if (!isPaused) {
    startTimeRef.current = Date.now() - elapsed * 1000;
    startTimer();
  } else {
    stopTimer();
  }

  return () => stopTimer();
}, [isPaused]);

  return (
    <PopupContainer>
      <PopupHeader>
        <RecordIcon />
        <span>
          {isPaused ? '일시 정지 중' : '녹화 중'} • {formatTime(elapsed)}
        </span>
      </PopupHeader>
      <PopupControls>
        {isPaused ? (
          <ControlButton onClick={onResume} aria-label="녹화 재개">
            <Play />
          </ControlButton>
        ) : (
          <ControlButton onClick={onPause} aria-label="녹화 일시정지">
            <Pause />
          </ControlButton>
        )}
        <ControlButton onClick={handleStop} aria-label="녹화 중지">
          <Stop />
        </ControlButton>
      </PopupControls>
    </PopupContainer>
  );
};

export default RecordingStatusPopup;
