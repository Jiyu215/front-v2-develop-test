//점수 시스템
//말할 때 증가, 아닐 때 감소
import { useEffect, useRef, useState } from 'react';

export default function useSpeakingScore(
  isSpeaking: boolean,
  {
    increment = 1,
    decayRate = 0.95,
    maxScore = 100,
    intervalMs = 300,
  }: {
    increment?: number;
    decayRate?: number;
    maxScore?: number;
    intervalMs?: number;
  } = {}
) {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scoreRef.current = isSpeaking
        ? Math.min(scoreRef.current + increment, maxScore)
        : scoreRef.current * decayRate;

      setScore(Math.round(scoreRef.current));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  return score;
}
