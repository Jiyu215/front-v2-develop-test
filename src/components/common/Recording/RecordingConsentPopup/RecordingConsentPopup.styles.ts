import styled from 'styled-components';

export const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: ${({theme})=>theme.spacings.md};
    background-color: ${({theme})=>theme.colors.background.light};
    border-radius: ${({theme})=>theme.borders.radius.md};
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
`;

export const Header = styled.h3`
  margin-bottom: ${({theme})=>theme.spacings.md};
  text-align: center;
`;

export const Body = styled.p`
  font-size: ${({theme})=>theme.fontSizes.xs};
  color: ${({theme})=>theme.colors.text.default};
  margin-bottom: ${({theme})=>theme.spacings.md};
`;

export const Important = styled.p`
  font-size: ${({theme})=>theme.fontSizes.xxs};
  color: ${({theme})=>theme.colors.state.error};
  font-weight: ${({theme})=>theme.fontWeights.bold};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: ${({theme})=>theme.spacings.xs};

  input[type='checkbox'] {
    cursor: pointer;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${({theme})=>theme.fontSizes.xxs};
  color: ${({theme})=>theme.colors.text.default};
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledButton = styled.button<{ cancel?: boolean }>`
  flex: 1;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  background-color: ${({ cancel, theme }) => (cancel ? '#9e9e9e' : theme.colors.primary)};
  color:  #FFFFFF !important;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ cancel }) => (cancel ? '#757575' : '#1565c0')};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
