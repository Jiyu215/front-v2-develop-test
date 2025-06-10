import styled from 'styled-components';

export const PopupBackdrop = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
    cursor: pointer;
    inset: 0;
    background: transparent;
`;

export const PopupContainer = styled.div<{ $popupLeft?: number; $hasSidebar?: boolean }>`
    background-color: ${({theme})=>theme.colors.background.light};
    padding: ${({theme})=>theme.spacings.sm};
    border-radius: ${({theme})=>theme.borders.radius.md};
    min-width: 12.5rem;
    max-width: 17.5rem;
    max-height: 22.5rem;
    overflow: hidden;
    cursor: default;
    transform: translateX(-50%);
    position: fixed;
    bottom: 5rem;
    left: ${({ $popupLeft, $hasSidebar }) =>
  `${$hasSidebar ? $popupLeft : $popupLeft + 10}%`};
`;

export const PopupHeader = styled.h4`
    font-size: ${({theme})=>theme.fontSizes.xs};
    margin-bottom: ${({theme})=>theme.spacings.xs};
`;

export const PopupItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    max-height: 300px;
    overflow-y: auto;

    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* IE 10+ */

    &::-webkit-scrollbar {
        display: none;
    }
`;


export const PopupItem = styled.li`
    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 12.5rem;
    max-width: 17.5rem;

    &:hover {
        background-color: ${({theme})=>theme.colors.background.gray};
    }
`;
