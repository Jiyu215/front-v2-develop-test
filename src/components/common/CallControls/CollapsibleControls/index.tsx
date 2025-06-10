import React from 'react';
import {
  Wrapper,
  ToggleTrigger,
  ChevronIcon,
} from './CollapsibleControls.styles';

import { DownIcon, UpIcon } from 'assets/icons/black';

interface CollapsibleControlsProps {
  active?: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const CollapsibleControls: React.FC<CollapsibleControlsProps> = ({ active, isCollapsed, onToggle }) => {

  return (
    <Wrapper>
      <ToggleTrigger 
        onClick={onToggle}
        aria-label={isCollapsed ? 'Show controls' : 'Hide controls'}
        $active={active}>
        <ChevronIcon>
          {isCollapsed ? <UpIcon /> : <DownIcon />}
        </ChevronIcon>
      </ToggleTrigger>
    </Wrapper>
  );
};

export default CollapsibleControls;
