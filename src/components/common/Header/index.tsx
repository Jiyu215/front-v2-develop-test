import React from 'react';
import { HeaderWrapper, LogoImage } from './Header.styles';

type HeaderProps = {
  variant?: 'default' | 'compact'; // variant을 통해 대기실과 화상통화방 스타일 분기
};

const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  return (
    <HeaderWrapper variant={variant}>
      <LogoImage />
    </HeaderWrapper>
  );
};

export default Header;