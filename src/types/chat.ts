export type ChatMessage = {
  type: 'public' | 'private';
  from: string;
  to: string;
  content: string;
  sessionId: string;
};

export type ChatMessageInput = {
  to: string;
  content: string;
  isPrivate: boolean;
};