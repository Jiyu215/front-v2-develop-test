import { useTheme } from 'styled-components';

export const useReversedIconSet = () => {
  const theme = useTheme();
  return theme.mode === 'dark'
    ? require('assets/icons/black') // 반전
    : require('assets/icons/white');
};
