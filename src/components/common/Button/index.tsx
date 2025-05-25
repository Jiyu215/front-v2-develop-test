import React from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'exit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <StyledButton onClick={onClick} type={type} variant={variant} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;