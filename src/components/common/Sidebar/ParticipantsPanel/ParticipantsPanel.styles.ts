import styled from 'styled-components';

export const PanelWrapper = styled.div<{ participantsVisible: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: ${({ participantsVisible }) => participantsVisible ? '30vh' : '100vh'};
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacings.xs};
  gap: ${({ theme }) => theme.spacings.xs};
`;
