import styled from 'styled-components';

export const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme})=>theme.colors.background.light};
    width:100%;
    height:auto;
    overflow:hidden;
    max-height:4rem;
`;

export const MediaControls = styled.div`
    display: flex;
    height:100%;
`;

export const InteractionControls = styled.div`
    display: flex;
    margin: 0 auto;
    height:100%;
    width:45%;
`;

export const ControlsToggleGroup = styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    height:100%;

    background-color: ${({ $active, theme }) =>
    $active ? theme.colors.background.light : '#E8E8E8'};

    & > * {
        background: transparent;
    }
`;

export const SystemControls = styled.div`
    display: flex;
    height:100%;
    width:8%;
    padding:0 1%;
`;

