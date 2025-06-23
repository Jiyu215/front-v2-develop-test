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
    width: 100%
    margin: 0;
    flex-direction: ${({isCurrentUser}) => (isCurrentUser ? 'row-reverse' : 'row')};
    justify-content: flex-start; 
    padding:${({theme})=>theme.spacings.sm} 0;
`;

// 프로필 이미지나 이름을 포함하는 부분
export const Profile = styled.div<{ bgColor: string }>`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content:center;
    width:2.95rem;
    height:2.95rem;
    border-radius: ${({theme})=>theme.borders.radius.round};
    background-color: ${({ bgColor }) => bgColor||'gray'};
    color: ${({theme})=>theme.colors.text.inverse};
    font-weight: ${({theme})=>theme.fontWeights.bold};
`;

// 메시지 내용을 감싸는 부분
export const MessageContent = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({isCurrentUser}) => (isCurrentUser ? 'flex-end' : 'flex-start')};
    justify-content: ${({isCurrentUser}) => (isCurrentUser ? 'flex-end' : 'flex-start')};
    margin: 0 ${({theme})=>theme.spacings.md};
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

export const MessageBody = styled.div<{ isCurrentUser: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${({theme})=>theme.spacings.xs};
    padding: ${({theme})=>theme.spacings.xs};
    border-radius: ${({theme})=>theme.borders.radius.md};
    align-items: ${({isCurrentUser}) => (isCurrentUser ? 'flex-end' : 'flex-start')};
    border: 1px solid ${({isCurrentUser, theme}) => (isCurrentUser ? theme.colors.point : theme.colors.background.gray)};
    background-color: ${({isCurrentUser, theme}) => (isCurrentUser ? theme.colors.point : theme.colors.background.light)};
`;

export const MessageMeta = styled.div`
    font-size: ${({theme})=>theme.fontSizes.xxs};
    color: ${({theme})=>theme.colors.text.muted};
    margin-bottom: ${({theme})=>theme.spacings.xs};
`;

export const HighlightText = styled.span`
    color: ${({ theme }) => theme.colors.text.highlight};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
`;