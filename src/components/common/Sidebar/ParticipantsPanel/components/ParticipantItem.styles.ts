import styled from 'styled-components';

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border-radius: ${({theme})=>theme.borders.radius.sm};
  background-color: ${({ theme }) => theme.colors.background.light};

  &:hover {
    background-color: ${({ theme }) => theme.colors.point};
    cursor: pointer;
  }
`;

export const Avatar = styled.div`
  width: ${({theme})=>theme.spacings.lg};
  height: ${({theme})=>theme.spacings.lg};
  border-radius: ${({theme})=>theme.borders.radius.round};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({theme})=>theme.colors.text.inverse};
  font-weight: ${({theme})=>theme.fontWeights.bold};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacings.sm};
`;

export const Username = styled.span`
  flex: 1;
`;

export const StatusIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.default};
`;
