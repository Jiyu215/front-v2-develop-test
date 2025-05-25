import {
  LaughingFace,
  Heart,
  CryingFace,
  ClappingHands,
  RaisingHands,
  AstonishedFace,
} from 'assets/images/emojis';

import { FC, SVGProps } from 'react';

type EmojiItem = {
  name: string;
  Component: FC<SVGProps<SVGSVGElement>>;
};

const emojiList: EmojiItem[] = [
  { name: 'Laughing_Face', Component: LaughingFace },
  { name: 'Heart', Component: Heart },
  { name: 'Crying_Face', Component: CryingFace },
  { name: 'Clapping_Hands', Component: ClappingHands },
  { name: 'Raising_Hands', Component: RaisingHands },
  { name: 'Astonished_Face', Component: AstonishedFace },
];

export default emojiList;
