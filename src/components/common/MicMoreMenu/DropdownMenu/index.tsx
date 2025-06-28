import React, { useState, useRef, useEffect } from "react";
import {
  MoreButton,
  Menu,
  MenuItem,
  VolumeControlWrapper,
  VolumeSlider,
  VolumeLabel,
  VolumeTooltip
} from "./MicMoreMenu.styles";

// import { OptionsIcon } from "assets/icons/black";
import { useIconSet } from "lib/hooks/useIconSet";

interface MicMoreMenuProps {
  isCurrentUserRoomLeader: boolean;
  onToggleMute: () => void;
  onToggleVideoOff: () => void;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
}

const MicMoreMenu: React.FC<MicMoreMenuProps> = ({
  isCurrentUserRoomLeader,
  onToggleMute,
  onToggleVideoOff,
  volume,
  onVolumeChange,
}) => {
  
  const { OptionsIcon } = useIconSet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isSliderHovered, setIsSliderHovered] = useState(false);


  const containerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenuOpen((open) => {
        const newOpen = !open;
        if (!newOpen) {
        setShowVolumeControl(false); // 메뉴 닫을 때 볼륨 컨트롤도 닫기
        }
        return newOpen;
    });
  };

  const handleMuteClick = () => {
    if (!isCurrentUserRoomLeader) return;
    onToggleMute();
  };

  const handleVideoOffClick = () => {
    if (!isCurrentUserRoomLeader) return;
    onToggleVideoOff();
  };

  // 외부 클릭 시 메뉴 & 볼륨조절 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setShowVolumeControl(false);
      }
    }
    if (menuOpen || showVolumeControl) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, showVolumeControl]);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      ref={containerRef}
    >
      <MoreButton onClick={toggleMenu} aria-label="더보기 메뉴">
        <OptionsIcon/>
      </MoreButton>

      {menuOpen && (
        <Menu>
            <VolumeControlWrapper>
            <VolumeLabel>사용자 음량</VolumeLabel>
            {isSliderHovered && <VolumeTooltip>{volume}</VolumeTooltip>}
            <VolumeSlider
                id="volumeSlider"
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
            />
            </VolumeControlWrapper>

            {isCurrentUserRoomLeader && (
                <MenuItem onClick={handleMuteClick}>
                    통화방 마이크 끄기
                </MenuItem>
            )}
            {isCurrentUserRoomLeader && (
                <MenuItem onClick={handleVideoOffClick}>
                    통화방 비디오 끄기
                </MenuItem>
            )}
        </Menu>
        )}
    </div>
  );
};

export default MicMoreMenu;
