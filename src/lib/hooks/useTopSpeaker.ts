//발화자 선정
//점수가 가장 높은 사람이 1 순위
//만약, 여러명이 점수가 같으면 1번으로 말한사람이 1순위
import { useRef, useEffect, useState } from 'react';

export function useTopSpeaker(scores: { [id: string]: number }) {
  const lastTopSpeaker = useRef<{ id: string | null; score: number }>({ id: null, score: -1 });
  const [topSpeaker, setTopSpeaker] = useState<{ id: string | null; score: number }>({ id: null, score: -1 });

  useEffect(() => {
    // 현재 점수가 가장 높은 사람 찾기
    const currentTop = Object.entries(scores).reduce(
      (top, [id, score]) =>
        score > top.score ? { id, score } : top,
      { id: null, score: -1 }
    );

    if (currentTop.score <= 0) {
      // 모두 0 이하일 경우 이전 topSpeaker 유지
      setTopSpeaker(lastTopSpeaker.current);
    } else {
      // 점수 높은 사람이 있으면 업데이트
      setTopSpeaker(currentTop);
      lastTopSpeaker.current = currentTop;
    }
  }, [scores]);

  return topSpeaker;
}
