import React from "react";

import {
  PermissionOverlay,
  PermissionModal,
  PermissionMessage,
  ButtonGroup,
  GrantButton,
  DenyButton,
} from './RecordingPermissionPopup.styles';

interface RecordingPermissionPopupProps {
    username: string;
    onGrant: () => void;
    onDeny: () => void;
}

const RecordingPermissionPopup: React.FC<RecordingPermissionPopupProps> = ({ username, onGrant, onDeny }) => {
    return (
        <PermissionOverlay>
            <PermissionModal>
            <h3>녹화 권한 요청</h3>
            <PermissionMessage>
                {username}님이 녹화를 시작하려고 합니다. 권한을 허용하시겠습니까?
            </PermissionMessage>
            <ButtonGroup>
                <GrantButton onClick={onGrant}>허용</GrantButton>
                <DenyButton onClick={onDeny}>거절</DenyButton>
            </ButtonGroup>
            </PermissionModal>
        </PermissionOverlay>
    );   
}

export default RecordingPermissionPopup;