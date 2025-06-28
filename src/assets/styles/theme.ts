import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  mode: 'light',
  colors: {
    primary: '#4A7AFF',          // 브랜드 메인 색상 (파란색)
    point: '#E1F5FF',            // point color
    background: {
      light: '#ffffff',          // 기본 배경 색상 (흰색)
      gray: '#F1F0F0',           // 섹션/비디오 영역 등
      grayLight: '#F6F6F6',
      inverse: '#1A1A1A',
    },
    text: {
      default: '#121212',        // 일반 텍스트
      muted: '#8A8A8A',          // 서브 텍스트 (설명 등)
      inverse: '#FFFFFF',        // 다크 배경에서 쓰는 텍스트
      highlight: '#5F9DF7',      // 강조 텍스트
    },
    border: '#F1F0F0',           // 경계선/보더 색상
    link: '#007bff',             // 링크 색상 (파란색)
    state: {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
    },
    mediaControl: {
      on: '#121212',
      off: '#ff4d4f'
    },
    chat: {
      background: '#FFFFFF', // 채팅 전체 영역
      input: '#F6F6F6',       // 입력창 배경
      bubble: '#FFFFFF',      // 상대 메시지 말풍선
      bubbleSelf: '#E1F5FF',  // 본인 메시지 말풍선
      name: '#8A8A8A',
    },
    hover:'#f7f7f7',
  },
  fontSizes: {
    xxs: '0.75rem',
    xs: '0.875rem',  // 작은 폰트 (예: 작은 텍스트)
    sm: '1rem',      // 기본 폰트 (본문 텍스트)
    md: '1.25rem',   // 중간 크기 폰트 (헤더)
    lg: '1.5rem',    // 큰 폰트 (섹션 제목)
    xl: '2rem',      // 매우 큰 폰트 (메인 제목)
  },
  fonts: {
    primary: "'Inter', sans-serif",    // 기본 폰트 (Inter로 변경)
    secondary: "'Inter', sans-serif", // 보조 폰트 (Inter로 변경)
  },
  fontWeights: { // 폰트 굵기 추가
    light: 300,    // 가벼운 텍스트
    regular: 400,  // 기본 텍스트
    medium: 500,   // 중간 굵기
    bold: 700,     // 굵은 텍스트
    black: 900,    // 가장 굵은 텍스트
  },
  lineHeights: {
    sm: 1.2,   // 작은 텍스트 줄 간격
    md: 1.5,   // 기본 줄 간격
    lg: 1.8,   // 큰 텍스트 줄 간격
  },
  spacings: {
    xs: '0.5rem',   // 작은 여백 (8px을 rem으로 변환)
    sm: '1rem',     // 기본 여백 (16px)
    md: '1.5rem',   // 중간 여백 (24px)
    lg: '2rem',     // 큰 여백 (32px)
    xl: '3rem',     // 매우 큰 여백 (48px)
  },
  borders: {
    radius: {
      sm: '0.25rem',  // 테두리 둥글기 (4px)
      md: '0.5rem',   // 테두리 둥글기 (8px)
      round: '9999px', // 완전 둥글게 (버튼, 프로필 등)
    },
    width: '0.0625rem',  // 테두리 두께 (1px)
  },
}
