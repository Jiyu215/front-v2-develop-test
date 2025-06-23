import styled from "styled-components";

export const PanelWrapper = styled.div`
  display:flex;
  flex-direction: column;
  border-top: 1px solid ${({theme})=>theme.colors.background.gray};
  width:80%;
`;

export const Title = styled.h3`
  font-size: ${({theme})=>theme.fontSizes.sm};
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme})=>theme.spacings.xs};
`;

export const DeviceSection = styled.div`
  margin-bottom: ${({theme})=>theme.spacings.xs};
`;

export const Label = styled.label`
  font-size: ${({theme})=>theme.fontSizes.xs};
  svg
  {
    width:0.8rem;
    height:0.8rem;
    margin-right:0.5rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({theme})=>theme.spacings.xs};
  margin-top: ${({theme})=>theme.spacings.xs};
  border-radius: ${({theme})=>theme.borders.radius.md};
  border: 1px solid #ccc;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
`;
