import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
`;

export const ToggleTrigger = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  display: flex;
  padding: 0;

  &:hover {
     background-color: ${({ $active, theme }) => ($active ? theme.colors.background.gray : theme.colors.hover )};
  }
`;

export const ChevronIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-top: ${({theme})=>theme.spacings.sm};
`;