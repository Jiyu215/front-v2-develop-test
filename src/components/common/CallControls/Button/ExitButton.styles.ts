import styled from 'styled-components';
import Button from 'components/common/Button';

export const ExitButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: #ff4d4f;
  color: white;
`;