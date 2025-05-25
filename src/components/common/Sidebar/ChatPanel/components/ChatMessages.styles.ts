import styled from 'styled-components';

// 전체 메시지를 감싸는 컨테이너
export const MessagesWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding:${({theme})=>`0 ${theme.spacings.md}`} ;
  height:100%;
`;

export const MessageList = styled.div`
    overflow-y: auto;
    /* Chrome, Safari, Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;

    /* IE, Edge */
    -ms-overflow-style: none;
`;

// 각 메시지를 감싸는 컨테이너
export const MessageContainer = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    margin: ${({theme})=>`${theme.spacings.md} 0`};
    justify-content: ${(props) => (props.isCurrentUser ? 'flex-start' : 'flex-end')};
    flex-direction: ${(props) => (props.isCurrentUser ? 'row-reverse' : 'row')}; 
`;

// 프로필 이미지나 이름을 포함하는 부분
export const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    width:2.95rem;
    height:2.95rem;
    border-radius: ${({theme})=>theme.borders.radius.round};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({theme})=>theme.colors.text.inverse};
    font-weight: ${({theme})=>theme.fontWeights.bold};
`;

// 메시지 내용을 감싸는 부분
export const MessageContent = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
    justify-content: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
    background-color: ${({isCurrentUser,theme}) => (isCurrentUser ? theme.colors.point : theme.colors.background.light)};
    padding: ${({theme})=>theme.spacings.xs};
    margin: 0 ${({theme})=>theme.spacings.md};
    border-radius: ${({theme})=>theme.borders.radius.md};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 이름을 스타일링하는 부분
export const Name = styled.strong`
  font-size: ${({theme})=>theme.fontSizes.xxs};
  color: ${({theme})=>theme.colors.text.muted};
`;

export const MessageText = styled.p`
  font-size: ${({theme})=>theme.fontSizes.xs};
  color: ${({theme})=>theme.colors.text.default};
  margin: 0;
  word-break: break-word;
`;
