import { useTheme } from 'styled-components';

export const useIconSet = () => {
  const theme = useTheme();
  const isDarkMode = theme.mode === 'dark';

  return isDarkMode ? require('assets/icons/white') : require('assets/icons/black');
};