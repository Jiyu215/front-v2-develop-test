import React, { useEffect, useState } from 'react';
import { EmojiOverlay, EmojiParticle } from './EmojiEffects.styles';
import emojiList from '../EmojiPicker/emojiList';

interface Particle {
  id: number;
  name: string;
  left: number;
  delay: number;
}

type Props = {
  emojiName?: string;
  maxCount?: number;  // 최대 파티클 개수
};

const EmojiEffects: React.FC<Props> = ({ emojiName, maxCount = 10 }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!emojiName) return;

    const count = Math.floor(Math.random() * maxCount) + 4;

    let timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < count; i++) {
      // 각 파티클을 나타낼 랜덤 딜레이 (0.1 ~ 0.5초 사이)
      const appearDelay = Math.random() * 0.4 + 0.1;

      const timeout = setTimeout(() => {
        const id = Date.now() + Math.random();
        const left = Math.random() * 80 + 10;

        const newParticle: Particle = {
          id,
          name: emojiName,
          left,
          delay: 0, // 애니메이션 지연은 여기선 0으로 둬요
        };

        setParticles((prev) => [...prev, newParticle]);

        // 1.2초 뒤 파티클 제거
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 1200);
      }, appearDelay * 1000 * i); // i에 곱해서 순차적 등장

      timeouts.push(timeout);
    }

    // 컴포넌트 언마운트 시 타임아웃 클리어
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [emojiName, maxCount]);

  return (
    <EmojiOverlay>
      {particles.map(({ id, name, left, delay }) => {
        const match = emojiList.find((e) => e.name === name);
        if (!match) return null;

        const EmojiComp = match.Component;
        return (
          <EmojiParticle key={id} left={left} delay={delay}>
            <EmojiComp />
          </EmojiParticle>
        );
      })}
    </EmojiOverlay>
  );
};

export default EmojiEffects;
