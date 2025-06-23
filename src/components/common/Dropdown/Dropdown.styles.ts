import styled from "styled-components";

export const DropdownContainer = styled.div`
    position: fixed;
    left: 5%;
    top: 80%;
    display: flex;
    align-items: flex-start;
    width:100%;
`;

export const Selected = styled.div<{ $isHovered: boolean }>`
    padding: ${({theme})=>theme.spacings.xs};
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);

    background: ${({theme, $isHovered})=>
        $isHovered ? theme.colors.background.gray : theme.colors.background.light};
    border-radius:${({theme})=>theme.borders.radius.sm};
    cursor: default;
    margin-right:${({theme})=>theme.spacings.xs};


    font-size:${({theme})=>theme.fontSizes.xs};
    font-weight:${({theme})=>theme.fontWeights.bold};

    span{
        font-size:${({theme})=>theme.fontSizes.xxs};
        color:${({theme})=>theme.colors.text.muted};
        font-weight:${({theme})=>theme.fontWeights.medium};
    }
`;

export const OptionsList = styled.ul<{ $isVisible: boolean }>`
    position: absolute;
    bottom: 0%; 
    right: calc(80% - ${({ theme }) => theme.spacings.xs});
    background: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
    padding: ${({theme})=>theme.spacings.xs};
    list-style: none;
    z-index: 100;
    display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
    flex-direction: column;
    border-radius:${({theme})=>theme.borders.radius.sm};
`;

export const Option = styled.li`
    padding: ${({ theme }) => ` ${theme.spacings.xs} ${theme.spacings.sm} ${theme.spacings.xs}  ${theme.spacings.xs}`};
    cursor: pointer;
    border-radius:${({theme})=>theme.borders.radius.sm};
    
    &:hover {
        background: ${({theme})=>theme.colors.background.gray};
    }
`;
