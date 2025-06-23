import React, { useState } from 'react';
import {
  PopupContainer,
  Header,
  Body,
  CheckboxLabel,
  CheckboxWrapper,
  Important,
  ButtonContainer,
  StyledButton
} from './RecordingConsentPopup.styles';

interface RecordingConsentPopupProps {
  onConfirmConsent?: () => void;
  onDeclineConsent?: () => void;
}

const RecordingConsentPopup: React.FC<RecordingConsentPopupProps> = ({
  onConfirmConsent,
  onDeclineConsent
}) => {
  const [contentChecked, setContentChecked] = useState(false); // 내용 확인 체크 여부

  const handleConfirm = () => {
    // if (!contentChecked) {
    // //   setShowError(true); // 내용 확인 안 함
    //   return;
    // }
    onConfirmConsent?.();
  };

  const handleDecline = () => {
    // if (!contentChecked) {
    // //   setShowError(true); // 내용 확인 안 함
    //   return;
    // }
    onDeclineConsent?.();
  };

  return (
    <PopupContainer>
      <Header>🎥 회의 녹화 동의 안내</Header>

      <Body>
        이 회의는 서비스 품질 향상, 교육 및 내부 기록을 목적으로 녹화되고 있습니다.
        <br />
        녹화에는 화면, 음성 및 공유된 콘텐츠가 포함될 수 있습니다.
      </Body>

      <Body>
        녹화된 자료는 회사 내부에서만 활용되며, <br />
        외부로 공유되지 않으며 보안 정책에 따라 안전하게 관리됩니다.
      </Body>

      {/* 내용 확인 체크박스 */}
      <CheckboxWrapper>
        <input
          type="checkbox"
          id="contentCheck"
          checked={contentChecked}
          onChange={() => {
            setContentChecked(prev => !prev);
            // setShowError(false);
          }}
        />
        <CheckboxLabel htmlFor="contentCheck">
          위 내용을 확인하셨으면, 체크해 주세요.
        </CheckboxLabel>
      </CheckboxWrapper>

      <Important>
        ※ 녹화에 동의하지 않으실 경우, 회의 참여가 제한됩니다.
      </Important>

      <ButtonContainer>
        <StyledButton onClick={handleConfirm} disabled={!contentChecked}>
          동의하고 회의 참여
        </StyledButton>
        <StyledButton onClick={handleDecline} cancel disabled={!contentChecked}>
          동의하지 않음 (회의 나가기)
        </StyledButton>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default RecordingConsentPopup;
