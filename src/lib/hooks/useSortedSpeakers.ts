

import { useState, useEffect } from 'react';

interface SpeakerScores {
  [sessionId: string]: number;
}

interface FirstSpokenTimestamps {
  [sessionId: string]: number;}



export function useSortedSpeakers(
  scores: SpeakerScores,
  timestamps: FirstSpokenTimestamps
): string[] {
  const [prevOrder, setPrevOrder] = useState<string[]>([]);

  useEffect(() => {
    // 새로 정렬한 배열
    const newOrder = Object.entries(scores)
      .sort(([idA, scoreA], [idB, scoreB]) => {
        const timeA = timestamps[idA] ?? Infinity;
        const timeB = timestamps[idB] ?? Infinity;

        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        if (scoreA === 0 && scoreB === 0) {
          // 0점 동점인 경우엔 기존 순서 우선
          const indexA = prevOrder.indexOf(idA);
          const indexB = prevOrder.indexOf(idB);
          if (indexA === -1 || indexB === -1) {
            // 기존 순서에 없으면 timestamp 순서 사용
            return timeB - timeA;
          }
          return indexA - indexB; // 기존 순서 기준 유지
        }

        return timeA - timeB;
      })
      .map(([id]) => id);

    setPrevOrder(newOrder);
  }, [scores, timestamps]);

  return prevOrder;
}
