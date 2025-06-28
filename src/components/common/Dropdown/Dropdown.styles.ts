import styled from "styled-components";

export const DropdownContainer = styled.div`
    position: fixed;
    left: 5%;
    top: 80%;
    display: flex;
    align-items: flex-start;
    width:auto;
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

    max-width: 10rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span{
        font-size:${({theme})=>theme.fontSizes.xxs};
        color:${({theme})=>theme.colors.text.muted};
        font-weight:${({theme})=>theme.fontWeights.medium};
    }
`;

export const OptionsList = styled.ul<{ $isVisible: boolean }>`
    width:100%;
    position: absolute;
    bottom: 0%;
    left: calc(10rem + ${({ theme }) => theme.spacings.sm});
    background: ${({theme})=>theme.colors.background.light};
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
        background: ${({theme})=>theme.colors.background.grayLight};
    }
`;
