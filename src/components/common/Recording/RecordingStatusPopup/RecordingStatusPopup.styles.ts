import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: absolute;
  display: flex;
  top: 1rem;
  right: 1rem;
  background-color: #1E1E1E;
  color: ${({ theme }) => theme.colors.background.light};
  padding: ${({theme})=> theme.spacings.xs };
  border-radius: ${({ theme }) => theme.borders.radius.sm};
  z-index: 1000;
`;

export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({theme}) => theme.spacings.xs};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({theme}) => theme.colors.text.inverse};

  span {
    margin-right: ${({theme}) => theme.spacings.sm};
  }

  svg {
    width:0.75rem;
    height:0.75rem;
  }
`;

export const PopupControls = styled.div`
  display: flex;
  gap: ${({theme})=>theme.spacings.xs};
`;

export const ControlButton = styled.button`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.background.light};
    border: none;
    border-radius:${({theme})=>theme.borders.radius.sm};
    background:none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    padding:0 0.15rem;
    &:hover {
        background-color: #494949;
    }

    svg {
        width:0.9rem;
        height:0.9rem;
    }
    
`;
