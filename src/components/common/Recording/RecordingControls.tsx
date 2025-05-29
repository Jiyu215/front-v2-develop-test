import React from 'react';

interface RecordingControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  onToggleRecording,
}) => {
  return (
    <button onClick={onToggleRecording}>
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>
  );
};

export default RecordingControls;
