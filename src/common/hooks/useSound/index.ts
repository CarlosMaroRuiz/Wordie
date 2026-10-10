import { useCallback, useRef } from 'react';

export const useSound = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    } else {
      audioRef.current.currentTime = 0;
    }

    audioRef.current.play().catch(() => {
    });
  }, [src]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};
