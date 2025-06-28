import styled from 'styled-components';

export const Button = styled.button`
    width:100%;
    padding:${({theme})=>theme.spacings.xs} 0;
    font-size: ${({theme})=>theme.fontSizes.xxs};
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid ${({theme})=>theme.colors.border};
    background-color: ${({theme})=>theme.colors.background.light};
    
    &:hover {
        background-color: ${({theme})=>theme.colors.hover};
    }
`;