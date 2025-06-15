import styled from 'styled-components';

export const SidebarWrapper = styled.div<{ isOpen: boolean }>`
    flex: ${({ isOpen }) => (isOpen ? '0 0 clamp(260px, 25%, 400px)' : '0 0 0')};
    max-width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    background-color: ${({ theme }) => theme.colors.background.light};
    border-left: ${({ isOpen, theme }) => (isOpen ? `1px solid ${theme.colors.background.gray}` : 'none')};
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

export const ChatArea = styled.div`
  flex: 3;
`;

export const ParticipantsArea = styled.div`
  flex: 1;
  border-bottom: ${({theme})=>theme.borders.width} solid ${({ theme }) => theme.colors.border};
`;