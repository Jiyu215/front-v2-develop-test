import styled from 'styled-components';

export const ToggleWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 2.5rem;
  height: 1.45rem;
  margin-right: 1rem;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

export const Slider = styled.span<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.background.gray};
  border-radius: ${({ theme }) => theme.borders.radius.round};
  transition: background-color 0.3s;
`;

// 아이콘이 들어간 동그라미
export const IconWrapper = styled.div<{ $checked: boolean }>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
  z-index: 1;

  transform: ${({ $checked }) => ($checked ? 'translateX(1.15rem)' : 'translateX(0.1rem)')};

  svg {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

export const Checkbox = styled(HiddenCheckbox)`
`;
