import React from 'react';
import {Button} from './ChangenameButton.styles';

interface ChangeNameButtonProps {
    onClick: () => void;
}

const ChangeNameButton: React.FC<ChangeNameButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>이름 변경</Button>;
};

export default ChangeNameButton;

