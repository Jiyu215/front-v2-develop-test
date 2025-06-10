import styled from 'styled-components';

export const StyledButton = styled.button<{ $active?: boolean; disabled?: boolean; variant?: 'media' | 'interaction';}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 0 ${({theme})=>theme.spacings.sm};

  min-height: 4rem;

  border: none;

  background-color: ${({ $active, theme, variant }) => {
    if (variant === 'media') {
      return $active ? theme.colors.background.light : '#E8E8E8'; // 'media'에서는 클릭 시 배경색 변화
    }else{
      return $active ?  '#E8E8E8' : theme.colors.background.light; // 'interaction'에서 클릭 시 배경색 변화
    }
  }};

  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: #F1F0F0;
  }
`;

export const IconWrapper = styled.div`
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

export const Label = styled.span`
  margin-top: 0.0625rem;
  font-size: ${({theme})=>theme.fontSizes.xxs};
  color: ${({theme})=>theme.colors.text.default};
`;
