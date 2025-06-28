import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    primary: '#4A7AFF',          // 메인 색상 유지 가능
    point: '#5A5A5A',            // 다크 배경에 맞게 살짝 어둡게
    background: {
      light: '#1A1A1A',          // 다크 배경색 (검정에 가까운 색)
      gray: '#1E1E1E',           // 어두운 섹션 배경
      grayLight: '#2A2A2A',
      inverse: '#FFFFFF',
    },
    text: {
      default: '#FFFFFF',        // 밝은 텍스트 (다크 배경 대비)
      muted: '#8A8A8A',          // 어두운 텍스트에 맞는 서브 텍스트
      inverse: '#121212',        // 라이트 배경에서 쓰는 텍스트 (라이트 모드 반대)
      highlight: '#5F9DF7',      // 강조 텍스트 (그대로)
    },
    border: '#2F2F2F',           // 어두운 경계선
    link: '#4A90E2',             // 다크모드에 어울리는 링크색
    state: {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    },
    mediaControl: {
      on: '#E0E0E0',
      off: '#ff4d4f',
    },
    chat: {
      background: '#1B1B1B', // 채팅 전체 영역
      input: '#2A2A2A',       // 입력창 배경
      bubble: '#2A2A2A',      // 상대 메시지 말풍선
      bubbleSelf: '#5A5A5A',  // 본인 메시지 말풍선
      name: '#FFFFFF',
    },
    hover:'#272727',
  },
  fontSizes: {
    xxs: '0.75rem',
    xs: '0.875rem',
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fonts: {
    primary: "'Inter', sans-serif",
    secondary: "'Inter', sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    sm: 1.2,
    md: 1.5,
    lg: 1.8,
  },
  spacings: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
  borders: {
    radius: {
      sm: '0.25rem',
      md: '0.5rem',
      round: '9999px',
    },
    width: '0.0625rem',
  },
};
