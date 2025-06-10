import styled from "styled-components";

export const PermissionOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PermissionModal = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  padding: ${({ theme }) => theme.spacings.md};
  border-radius: ${({ theme }) => theme.borders.radius.md};
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

export const PermissionMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.default};
  margin: ${({ theme }) => `${theme.spacings.sm} 0 ${theme.spacings.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacings.sm};
`;

export const GrantButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacings.xs};
  background-color: ${({ theme }) => theme.colors.state.success};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.state.info};
  }
`;

export const DenyButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacings.xs};
  background-color: ${({ theme }) => theme.colors.state.error};
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.state.info};
  }
`;
