import styled from "styled-components";

export const MoreButton = styled.button`
  background: none;
  border: none;
  display:flex;
  align-items: center;
  cursor: pointer;
  padding:0;
`;

export const Menu = styled.div`
    width: 200px;
    min-width: 160px;
    max-width: 280px;
    position: absolute;
    background: ${({theme})=>theme.colors.background.light};
    border: 1px solid ${({theme})=>theme.colors.border};
    border-radius: 6px;
    padding: ${({theme})=>theme.spacings.sm};
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 1000;
    right:0;
    margin-top:${({theme})=>theme.spacings.sm};
    font-size:${({theme})=>theme.fontSizes.xs};
`;

export const MenuItem = styled.div`
    padding: ${({theme})=>theme.spacings.xs};
    cursor: pointer;
    color: ${({theme})=>theme.colors.state.error};
    border-radius: ${({theme})=>theme.borders.radius.sm};
    &:hover {
        background-color: ${({theme})=>theme.colors.background.gray};
    }
`;

export const VolumeControlWrapper = styled.div`
    padding: ${({theme})=>theme.spacings.xs};
    width: 100%;
    box-sizing: border-box;
`;

export const VolumeLabel = styled.label`
    display: block;
    margin-bottom: 4px;
`;

export const VolumeSlider = styled.input`
    width: 100%;
    box-sizing: border-box;
`;

export const VolumeTooltip = styled.div`
  position: absolute;
  top: ${({theme})=>theme.spacings.xs};
  left: 50%;
  transform: translateX(-50%);
  background: ${({theme})=>theme.colors.background.inverse};
  color: ${({theme})=>theme.colors.text.inverse};
  font-size: ${({theme})=>theme.fontSizes.xxs};
  padding: 2px 6px;
  border-radius: ${({theme})=>theme.borders.radius.sm};
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
`;
