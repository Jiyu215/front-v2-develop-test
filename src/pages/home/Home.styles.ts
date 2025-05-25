import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/images/logo_home.svg';
import bgImage from 'assets/images/home_main_image.svg';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-image: url('${bgImage}');
  background-size: 50%;
  background-position: calc(0% - 2rem) calc(100% + 10rem);
  background-repeat: no-repeat;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings.lg};
`;

export const LogoImage = styled(Logo)`
  width: 15rem;
  height: auto;
`;

export const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background.light};
  margin-top: ${({ theme }) => theme.spacings.sm};
  padding: ${({ theme }) => `0 ${theme.spacings.xs}`};
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.md};
  width: ${100 / 3}%;
  padding: ${({ theme }) => `${theme.spacings.lg} ${theme.spacings.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borders.radius.md};
`;

export const StyledButton = styled.button`
  padding: 0.5rem 10rem;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.primary};
  border: ${({ theme }) => theme.borders.width} solid white;
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  cursor: pointer;

  &:hover {
    background-color: #335ed6;
    color: white;
  }
`;
