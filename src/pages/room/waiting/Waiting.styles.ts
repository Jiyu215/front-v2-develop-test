import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/images/logo_home.svg';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color:${({theme})=>theme.colors.background.light};
    color:${({theme})=>theme.colors.text.default};

    input {
        color:${({theme})=>theme.colors.text.default};
        background-color:${({theme})=>theme.colors.background.light};
    }
    
    select {
        background-color:${({theme})=>theme.colors.background.grayLight};
        color:${({theme})=>theme.colors.text.muted};
        border: 1px solid ${({theme})=>theme.colors.background.gray};
    }

    option {
        color:${({theme})=>theme.colors.text.default};
    }
`;

export const WaitingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width:100%;
`;

export const RoomActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    

    > div:first-child {
        display:flex;
        flex:2;
        margin-bottom: ${({ theme }) => theme.spacings.lg};
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacings.md};
    width: 80%;

`;

export const LogoImage = styled(Logo)`
    width: 10rem;
    height: auto;
`;

export const PreviewWapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex:2.5;
    width:100%;
    height:100%;
    background-color:${({ theme }) => theme.colors.background.gray};
`;