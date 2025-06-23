import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

export const MainArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const GalleryWrapper = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background.gray};
    height:100%;
`;

export const ParticipantVideoGroup = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => `repeat(${Math.max($cols, 1)}, 1fr)`};
  grid-auto-rows: auto;
  gap: 16px;
  width: 90%;
  justify-items: center;
  align-items: start;
`;

