import styled from 'styled-components';

export const PanelWrapper = styled.div<{ participantsVisible: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${({ participantsVisible }) => participantsVisible ? '100vh':'30vh'};
  
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width:90%;
  height:100%;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacings.xs};
  gap: ${({ theme }) => theme.spacings.xs};

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const ButtonWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.xs};
  margin-top: ${({ theme }) => theme.spacings.sm};
  padding-bottom: ${({ theme }) => theme.spacings.sm};
`;