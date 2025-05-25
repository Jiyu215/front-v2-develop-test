export type EmojiMessage = {
  type: 'private' | 'public';
  from: string;
  to: string;
  emoji: string;
  sessionId: string;
};