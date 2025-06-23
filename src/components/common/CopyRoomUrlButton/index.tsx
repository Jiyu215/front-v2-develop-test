import React from 'react';
import {Button} from './CopyRoomUrlButton.styles';

interface CopyRoomUrlButtonProps {
  roomId: string;
}

const CopyRoomUrlButton: React.FC<CopyRoomUrlButtonProps> = ({ roomId }) => {
  const roomUrl = `${window.location.origin}/room/${roomId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(roomUrl)
      .then(() => alert('방 URL이 복사되었습니다!'))
      .catch(() => alert('복사에 실패했습니다. 직접 URL을 복사해주세요.'));
  };

  return <Button onClick={handleCopy}>방 URL 복사하기</Button>;
};

export default CopyRoomUrlButton;