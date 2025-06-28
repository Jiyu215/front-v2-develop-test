import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";

interface VideoDevice {
  deviceId: string;
  label: string;
}

interface VideoInputSelectorProps {
  onDeviceChange: (deviceId: string) => void;
  selectedDeviceId?: string; // 외부에서 현재 선택된 장치 ID를 받음
}

const VideoInputSelector: React.FC<VideoInputSelectorProps> = ({
  onDeviceChange,
  selectedDeviceId
}) => {
  const [devices, setDevices] = useState<VideoDevice[]>([]);

  useEffect(() => {
    const initDevices = async () => {
      await navigator.mediaDevices.getUserMedia({ video: true });

      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = deviceList
        .filter((d) => d.kind === "videoinput")
        .map((d) => ({ deviceId: d.deviceId, label: d.label || "이름 없는 카메라" }));

      setDevices(videoInputs);

      // 초기 장치 설정
      if (videoInputs.length > 0 && !selectedDeviceId) {
        onDeviceChange(videoInputs[0].deviceId);
      }
    };

    initDevices();
  }, [onDeviceChange, selectedDeviceId]);

  const selectedDevice = devices.find(d => d.deviceId === selectedDeviceId) || null;

  const handleDeviceChange = (device: VideoDevice) => {
    onDeviceChange(device.deviceId);
  };

  return (
    <Dropdown
      options={devices}
      onChange={handleDeviceChange}
      placeholder="비디오 장치를 선택하세요"
      labelKey="label"
      valueKey="deviceId"
      title="비디오 장치"
      value={selectedDevice}
    />
  );
};

export default VideoInputSelector;
