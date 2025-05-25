import styled, { css } from 'styled-components';

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'exit';
}

export const StyledButton = styled.button<StyledButtonProps>`
  width:100%;
  padding: 0.75rem 0rem;
  text-align:center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  cursor: pointer;

  ${({ variant, theme }) =>
    variant === 'primary' &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text.inverse};

      &:hover {
        background-color: #335ed6;
      }

      &:disabled {
        background-color: ${theme.colors.border};
        color: ${theme.colors.text.muted};
        cursor: not-allowed;
      }
    `}

  ${({ variant, theme }) =>
    variant === 'secondary' &&
    css`
      background-color: ${theme.colors.background.light};
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};

      &:hover {
        background-color: #335ed6;
        color: ${theme.colors.text.inverse}
      }

      &:disabled {
        background-color: ${theme.colors.border};
        color: ${theme.colors.text.muted};
        cursor: not-allowed;
      }
    `}

    ${({ variant, theme }) =>
    variant === 'exit' &&
    css`
      background-color: ${theme.colors.mediaControl.off};
      color: #fff;
      font-size: ${theme.fontSizes.xs};
      margin:0.75rem;

      &:hover {
        background-color: #e03131;
      }

      &:disabled {
        background-color: #f5a2a2;
        color: #fff;
        cursor: not-allowed;
      }
    `}
`;
