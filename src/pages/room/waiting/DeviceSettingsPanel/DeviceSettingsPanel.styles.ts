import styled from "styled-components";

export const PanelWrapper = styled.div`
  padding: ${({theme})=>theme.spacings.lg};
  border-top: 1px solid ${({theme})=>theme.colors.background.gray};
`;

export const DeviceSection = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
//   display: block;
//   font-weight: 600;
//   margin-bottom: 6px;
  svg
  {
    width:0.95rem;
    height:0.95rem;
    margin-right:1rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const ToggleRow = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
