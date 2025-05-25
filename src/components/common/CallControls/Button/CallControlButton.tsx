import React from 'react';
import { StyledButton, IconWrapper, Label } from './CallControlButton.styles';

interface CallControlButtonProps {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  label?: string;
  variant?: 'media' | 'interaction';
}

const CallControlButton: React.FC<CallControlButtonProps> = ({
  onClick,
  active = false,
  disabled = false,
  icon,
  label,
  variant = 'interaction'
}) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $active={active}
      aria-pressed={active}
      aria-label={label}
      variant={variant}
      type="button"
    >
      <IconWrapper>{icon}</IconWrapper>
      {label && <Label>{label}</Label>}
    </StyledButton>
  );
};

export default CallControlButton;