import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.sm};
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: center;
  border-top: ${({theme})=>theme.borders.width} solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.light};
`;

export const SelectArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.xs}; // 간격 조절
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings.sm};
`;

export const Select = styled.select`
  width: 40%;
  padding: ${({theme})=>theme.spacings.xs};
  border: ${({theme})=>theme.borders.width} solid ${({ theme }) => theme.colors.border};
  border-radius: ${({theme})=>theme.borders.radius.sm};
  font-size: ${({theme})=>theme.fontSizes.xs};
  background-color: ${({ theme }) => theme.colors.background.gray}; /* 회색 배경 */
`;

export const InputArea = styled.div`
  display: flex;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.background.gray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({theme})=>theme.borders.radius.sm};
  overflow: hidden;
`;

export const Input = styled.input`
  flex: 1;
  padding: ${({theme})=>theme.spacings.sm};
  border: none;
  outline: none;
  font-size: ${({theme})=>theme.fontSizes.xs};
  background-color: transparent;
  color: ${({theme})=>theme.colors.text.default};
`;

export const SendButton = styled.button`
    padding: 0 ${({theme})=>theme.spacings.sm};
    background-color: ${({ theme }) => theme.colors.primary};
    color: #FFFFFF !important;
    border: none;
    height: 100%;
    font-weight: ${({theme})=>theme.fontWeights.medium};
    cursor: pointer;
`;

export const Label = styled.label`
    display:flex;
    font-size: ${({theme})=>theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text.muted};
`;