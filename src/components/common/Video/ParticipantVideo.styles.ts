import styled from 'styled-components';

export const ParticipantContainer = styled.div`
  position: relative;
  width: 30%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  border-radius: ${({theme}) => theme.borders.radius.md};
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

export const UsernameOverlay = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  padding: 0.3rem 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: ${({theme}) => theme.borders.radius.round};
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const UsernameContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }
`;
