const COLORS: readonly string[] = [
  '#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D',
  '#FF6F91', '#845EC2', '#2C73D2', '#00C9A7',
  '#F9A826', '#8A2BE2', '#FF8C00', '#20B2AA',
];

const hashColorFromId = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
};

export const getUserColor = (id: string): string => {
  return hashColorFromId(id);
};
