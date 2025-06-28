import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown"; // 위에서 만든 컴포넌트

interface AudioDevice {
  deviceId: string;
  label: string;
}

interface AudioInputSelectorProps {
  onDeviceChange: (deviceId: string) => void;
  selectedDeviceId?: string; // 외부에서 선택된 장치를 props로 받아옴
}

const AudioInputSelector: React.FC<AudioInputSelectorProps> = ({ onDeviceChange, selectedDeviceId }) => {
  const [devices, setDevices] = useState<AudioDevice[]>([]);

  useEffect(() => {
    const initDevices = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = deviceList
        .filter((d) => d.kind === "audioinput")
        .map((d) => ({ deviceId: d.deviceId, label: d.label || "이름 없는 장치" }));

      setDevices(audioInputs);

      // 최초 설정
      if (audioInputs.length > 0 && !selectedDeviceId) {
        onDeviceChange(audioInputs[0].deviceId);
      }
    };

    initDevices();
  }, [onDeviceChange, selectedDeviceId]);

  const selectedDevice = devices.find(d => d.deviceId === selectedDeviceId) || null;

  const handleDeviceChange = (device: AudioDevice) => {
    onDeviceChange(device.deviceId);
  };

  return (
    <Dropdown
      options={devices}
      onChange={handleDeviceChange}
      placeholder="녹음 장치를 선택하세요"
      labelKey="label"
      valueKey="deviceId"
      title="마이크 장치"
      value={selectedDevice}
    />
  );
};

export default AudioInputSelector;

