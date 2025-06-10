import styled from "styled-components";

export const EmojiPickerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: auto;
`;

export const EmojiPickerContainer = styled.div<{ $hasSidebar?: boolean }>`
  position: fixed;
  bottom: 5rem;
  left: ${({ $hasSidebar }) => ($hasSidebar ? '53%' : '70%')};
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.md}`};
  min-width: 20rem;
  max-width: 28rem;
  max-height: 20rem;
  overflow-y: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

export const EmojiPickerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings.xs};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
`;

export const EmojiGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacings.xs};
  padding-bottom: ${({ theme }) => theme.spacings.xs};
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 기본 제거 (크로스 브라우저 대응) */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.text.muted};
  }
`;

export const EmojiButton = styled.button`
  flex: 0 0 auto; /* 고정 크기 */
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({theme})=>theme.spacings.xs};
  font-size: ${({ theme }) => theme.fontSizes.lg};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0,0,0,0.1);
    border-radius: ${({ theme }) => theme.borders.radius.sm};
  }
`;

export const TargetSelector = styled.div`
  margin: ${({ theme }) => `${theme.spacings.xs} 0`};

  label {
    margin-right: ${({ theme }) => theme.spacings.xs};
    color: ${({ theme }) => theme.colors.text.default};
  }

  select {
    width: 50%;
    padding: 0.4rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borders.radius.sm};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    background-color: ${({ theme }) => theme.colors.background.gray};
  }
`;