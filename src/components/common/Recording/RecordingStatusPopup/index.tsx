import React from 'react';
import {
  PopupContainer,
  PopupHeader,
  PopupControls,
  ControlButton,
} from './RecordingStatusPopup.styles';

import { Play, Stop, Pause, RecordIcon } from 'assets/icons/white';

interface RecordingStatusPopupProps {
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

const RecordingStatusPopup: React.FC<RecordingStatusPopupProps> = ({
  isPaused,
  onPause,
  onResume,
  onStop,
}) => {
  return (
    <PopupContainer>
      <PopupHeader>
        <RecordIcon/>
        <span>{isPaused ? '일시 정지 중' : '녹화 중'}</span>
      </PopupHeader>
      <PopupControls>
        {isPaused ? (
          <ControlButton onClick={onResume} aria-label="녹화 재개">
            <Play/>
          </ControlButton>
        ) : (
          <ControlButton onClick={onPause} aria-label="녹화 일시정지">
            <Pause/>
          </ControlButton>
        )}
        <ControlButton onClick={onStop} aria-label="녹화 중지">
          <Stop/>
        </ControlButton>
      </PopupControls>
    </PopupContainer>
  );
};

export default RecordingStatusPopup;