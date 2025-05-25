import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 1.025rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: ${({ theme }) => theme.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
