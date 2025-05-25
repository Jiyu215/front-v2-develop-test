import styled from "styled-components";

export const PanelWrapper = styled.div<{ participantsVisible: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: ${({theme})=>theme.borders.width} solid ${({ theme }) => theme.colors.border};
  height: ${({ participantsVisible }) => participantsVisible ? '70vh' : '100vh'};
`;

export const ChatMessagesWrapper = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
`;