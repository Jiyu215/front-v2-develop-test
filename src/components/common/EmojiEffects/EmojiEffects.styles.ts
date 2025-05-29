import styled, { keyframes } from 'styled-components';

// 아래에서 위로 떠오르는 애니메이션
const floatUp = keyframes`
  0% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-200px) scale(1.2) rotate(15deg);
    opacity: 0;
  }
`;

export const EmojiOverlay = styled.div`
  position: absolute;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 5;
`;

export const EmojiParticle = styled.span<{ left: number; delay: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}%;
  font-size: ${({theme})=>theme.fontSizes.xs};
  animation: ${floatUp} 3s ease-out forwards;
  animation-delay: ${({ delay }) => delay}s;
  
  svg {
    width: 20%;
    height: 20%;
  }
`;