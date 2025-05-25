import React from 'react';
import { StyledInput } from './Input.styles';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) => {
  return <StyledInput value={value} onChange={onChange} placeholder={placeholder} type={type} />;
};

export default Input;
