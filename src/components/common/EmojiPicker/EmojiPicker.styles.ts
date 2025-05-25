import styled from "styled-components";

export const EmojiPickerOverlay = styled.div<{ hasSidebar?: boolean }>`
  position: fixed;
  bottom: 5rem;
  left: ${({ hasSidebar }) => (hasSidebar ? '53%' : '70%')};
  transform: translateX(-50%);
  width: 100%;
  height: auto;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const EmojiPickerContainer = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: ${({theme})=>theme.borders.radius.md};
  padding: 16px;
  min-width: 320px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

export const EmojiButton = styled.button`
  background: none;
  border: none;
  margin: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const TargetSelector = styled.div`
  margin: ${({theme})=>`0 ${theme.spacings.xs} 0 ${theme.spacings.xs}`};

  label{
    margin-right:${({theme})=>theme.spacings.xs};
    color:${({theme})=>theme.colors.text.default};
  }
  select{
    width: 50%;
    padding: 0.5rem;
    border: 0.0625rem solid #F1F0F0;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: #F1F0F0;}
`;

export const EmojiPickerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const EmojiGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({theme})=>theme.spacings.xs};
`;


export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${({theme})=>theme.fontSizes.md};
  cursor: pointer;
`;
