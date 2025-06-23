import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown"; // 위에서 만든 컴포넌트

interface AudioDevice {
  deviceId: string;
  label: string;
}

interface AudioInputSelectorProps {
  onDeviceChange: (deviceId: string) => void;
}

const AudioInputSelector: React.FC<AudioInputSelectorProps> = ({ onDeviceChange }) => {
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);

  useEffect(() => {
    const initDevices = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = deviceList
        .filter((d) => d.kind === "audioinput")
        .map((d) => ({ deviceId: d.deviceId, label: d.label || "이름 없는 장치" }));

      setDevices(audioInputs);
      setSelectedDevice(audioInputs[0]);
      onDeviceChange(audioInputs[0].deviceId); // 초기 선택 장치 변경 알림
    };

    initDevices();
  }, [onDeviceChange]);

  const handleDeviceChange = (device: AudioDevice) => {
    setSelectedDevice(device);
    onDeviceChange(device.deviceId); // 선택시 부모에게 알림
  };

  return (
    <Dropdown
      options={devices}
      onChange={handleDeviceChange}
      placeholder="녹음 장치를 선택하세요"
      labelKey="label"
      valueKey="deviceId"
      initialValue={selectedDevice || undefined}
    />
  );
};

export default AudioInputSelector;

