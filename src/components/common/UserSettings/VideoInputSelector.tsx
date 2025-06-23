import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";

interface VideoDevice {
  deviceId: string;
  label: string;
}

interface VideoInputSelectorProps {
  onDeviceChange: (deviceId: string) => void;
}

const VideoInputSelector: React.FC<VideoInputSelectorProps> = ({ onDeviceChange }) => {
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<VideoDevice | null>(null);

  useEffect(() => {
    const initDevices = async () => {
      await navigator.mediaDevices.getUserMedia({ video: true }); // 권한 요청

      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = deviceList
        .filter((d) => d.kind === "videoinput")
        .map((d) => ({ deviceId: d.deviceId, label: d.label || "이름 없는 카메라" }));

      setDevices(videoInputs);
      setSelectedDevice(videoInputs[0]);
      if (videoInputs[0]) {
        onDeviceChange(videoInputs[0].deviceId); // 초기값 전달
      }
    };

    initDevices();
  }, [onDeviceChange]);

  const handleDeviceChange = (device: VideoDevice) => {
    setSelectedDevice(device);
    onDeviceChange(device.deviceId);
  };

  return (
    <Dropdown
      options={devices}
      onChange={handleDeviceChange}
      placeholder="비디오 장치를 선택하세요"
      labelKey="label"
      valueKey="deviceId"
      initialValue={selectedDevice || undefined}
    />
  );
};

export default VideoInputSelector;
