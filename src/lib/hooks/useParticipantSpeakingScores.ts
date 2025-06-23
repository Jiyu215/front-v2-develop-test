//전체 참가자별 발화 점수 관리
import { useState, useEffect } from 'react';

export function useParticipantSpeakingScores(participants: { [id: string]: MediaStream }) {
  const [scores, setScores] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    const intervals: { [id: string]: any } = {};

    Object.entries(participants).forEach(([id, stream]) => {
      let audioContext = new AudioContext();
      let analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      let score = 0;
      const decayRate = 0.95;
      const increment = 1;

      intervals[id] = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b) / dataArray.length / 255;

        if (avg > 0.05) {
          score = Math.min(score + increment, 100);
        } else {
          score = score * decayRate;
        }

        setScores(prev => ({ ...prev, [id]: Math.round(score) }));
      }, 300);
    });

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [participants]);

  return scores;
}
