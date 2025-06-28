import React from 'react';
import { HeaderWrapper, LogoImage } from './Header.styles';
import ToggleSwitch from '../ToggleSwitch';

type HeaderProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  variant?: 'default' | 'compact'; // variant을 통해 대기실과 화상통화방 스타일 분기
};

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, variant = 'default' }) => {
  return (
    <HeaderWrapper variant={variant}>
      <LogoImage />
      <ToggleSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
    </HeaderWrapper>
  );
};

export default Header;