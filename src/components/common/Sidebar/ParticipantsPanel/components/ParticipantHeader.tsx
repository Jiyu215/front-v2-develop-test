import React from 'react';
import { HeaderWrapper } from './ParticipantHeader.styles';

interface Props {
  count: number;
}

const ParticipantHeader: React.FC<Props> = ({count}) => {
  return (
    <HeaderWrapper>
      Participants ({count})
    </HeaderWrapper>
  );
};

export default ParticipantHeader;