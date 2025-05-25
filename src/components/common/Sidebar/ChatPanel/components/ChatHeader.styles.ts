import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.95rem;
    font-weight: ${({theme})=>theme.fontWeights.medium};
    background-color: ${({ theme }) => theme.colors.background.light};
`;