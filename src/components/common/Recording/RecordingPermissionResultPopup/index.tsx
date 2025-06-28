import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Popup = styled.div`
  background: ${({ theme }) => theme.colors.chat.background};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borders.radius.md};
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 360px;
  width: 90%;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.default};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ConfirmButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: ${({ theme, variant }) =>
    variant === 'secondary' ? '#ccc' : theme.colors.primary};
  color: ${({ variant }) => (variant === 'secondary' ? '#333' : '#fff')};
  border: none;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === 'secondary' ? '#b3b3b3' : theme.colors.hover};
  }
`;

type Props = {
  granted: boolean;
  onClose: () => void;
  onStartRecording?: () => void;
};

const RecordingPermissionResultPopup: React.FC<Props> = ({
  granted,
  onClose,
  onStartRecording,
}) => {
  return (
    <Overlay>
      <Popup>
        <Message>
          {granted
            ? '호스트가 녹화를 허용했습니다. 녹화를 시작하시겠습니까?'
            : '호스트가 녹화를 거절했습니다.'}
        </Message>

        {granted ? (
          <ButtonGroup>
            <ConfirmButton
              variant="primary"
              onClick={() => {
                if (onStartRecording) onStartRecording();
                onClose();
              }}
            >
              녹화 시작
            </ConfirmButton>
          </ButtonGroup>
        ) : (
          <ConfirmButton variant="primary" onClick={onClose}>
            확인
          </ConfirmButton>
        )}
      </Popup>
    </Overlay>
  );
};

export default RecordingPermissionResultPopup;
