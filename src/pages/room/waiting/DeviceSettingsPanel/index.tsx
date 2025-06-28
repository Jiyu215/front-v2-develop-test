import React, { useState, useEffect } from 'react';
import {
  PanelWrapper,
  SettingsContainer,
  DeviceSection,
  Title,
  Label,
  Select,
  ToggleRow
} from './DeviceSettingsPanel.styles';

import { VideoIcon ,VideoOffIcon, MicIcon, MicOffIcon } from 'assets/icons/black';

type DeviceSettingsPanelProps = {
  onChange: (settings: {
    isVideoOn: boolean;
    isAudioOn: boolean;
    videoDeviceId?: string;
    audioDeviceId?: string;
  }) => void;
};

const DeviceSettingsPanel: React.FC<DeviceSettingsPanelProps> = ({ onChange }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | undefined>();
  const [selectedAudio, setSelectedAudio] = useState<string | undefined>();

  useEffect(() => {
  navigator.mediaDevices.enumerateDevices().then(devices => {
    const videoList = devices.filter(d => d.kind === 'videoinput');
    const audioList = devices.filter(d => d.kind === 'audioinput');

    setVideoDevices(videoList);
    setAudioDevices(audioList);

    // 초기 선택값이 없으면 가장 첫 번째 장치로 설정
    if (!selectedVideo && videoList.length > 0) {
      setSelectedVideo(videoList[0].deviceId);
    }
    if (!selectedAudio && audioList.length > 0) {
      setSelectedAudio(audioList[0].deviceId);
    }
  });
}, []);

  useEffect(() => {
    onChange({
      isVideoOn,
      isAudioOn,
      videoDeviceId: selectedVideo,
      audioDeviceId: selectedAudio,
    });
  }, [isVideoOn, isAudioOn, selectedVideo, selectedAudio]);

  return (
    <PanelWrapper>
      <Title>마이크/비디오 설정</Title>

      <SettingsContainer>
      <DeviceSection>
        <Label htmlFor="video-device">카메라 장치</Label>
        <Select 
        id="video-device" 
        value={selectedVideo || ''}
        onChange={(e) => setSelectedVideo(e.target.value)}>
          {videoDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
          ))}
        </Select>
      </DeviceSection>

      <DeviceSection>
        <Label htmlFor="audio-device">마이크 장치</Label>
        <Select 
          id="audio-device" 
          value={selectedAudio || ''}
          onChange={(e) => setSelectedAudio(e.target.value)}>
          {audioDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
          ))}
        </Select>
      </DeviceSection>

      <ToggleRow>
        <input
          type="checkbox"
          checked={isVideoOn}
          onChange={() => setIsVideoOn(v => !v)}
          id="toggle-video"
        />
        <Label htmlFor="toggle-video">
            {isVideoOn ? <VideoOffIcon/>:<VideoIcon/>}
            {isVideoOn ? '비디오 끄기' : '비디오 켜기'}
        </Label>
      </ToggleRow>

      <ToggleRow>
        <input
          type="checkbox"
          checked={isAudioOn}
          onChange={() => setIsAudioOn(a => !a)}
          id="toggle-audio"
        />
        <Label htmlFor="toggle-audio">
            {isAudioOn?<MicOffIcon/>:<MicIcon/>}
            {isAudioOn ? '오디오 끄기' : '오디오 켜기'}
        </Label>
      </ToggleRow>
      </SettingsContainer>
    </PanelWrapper>
  );
};

export default DeviceSettingsPanel;
