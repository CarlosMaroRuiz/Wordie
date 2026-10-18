import { useCallback, useEffect, useRef, useState } from 'react';
import type { SpeechOptions, UseSpeechSynthesisResult } from './types';

export type { SpeechOptions, UseSpeechSynthesisResult } from './types';

type Owner = symbol | null;

/**
 * speechSynthesis es un singleton del navegador: solo puede hablar una voz a la vez.
 * El bus de propiedad global evita que dos hooks queden con estado incoherente cuando
 * otro componente cancela la locucion (cancel() no dispara onend en Chrome).
 */
let owner: Owner = null;
const listeners = new Set<(next: Owner) => void>();

function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function changeOwner(next: Owner): void {
  owner = next;
  listeners.forEach((notify) => notify(next));
}

/**
 * Hook comun para pronunciar texto con la Web Speech API.
 * Una sola locucion global: `speak` cancela la anterior y `toggle` alterna.
 */
export function useSpeechSynthesis(): UseSpeechSynthesisResult {
  const idRef = useRef<symbol>(Symbol('speech'));
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const supported = canSpeak();

  useEffect(() => {
    const id = idRef.current;
    const notify = (next: Owner) => setIsSpeaking(next === id);
    listeners.add(notify);
    return () => {
      listeners.delete(notify);
      if (owner === id && canSpeak()) {
        window.speechSynthesis.cancel();
        changeOwner(null);
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (!canSpeak()) return;
    if (owner === idRef.current || owner === null) {
      window.speechSynthesis.cancel();
      changeOwner(null);
    }
  }, []);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!canSpeak() || !text.trim()) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang ?? 'en-US';
    utterance.rate = options.rate ?? 0.9;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;

    const id = idRef.current;
    utterance.onend = () => {
      if (owner !== id) return;
      changeOwner(null);
      options.onEnd?.();
    };
    utterance.onerror = () => {
      if (owner === id) changeOwner(null);
    };

    changeOwner(id);
    window.speechSynthesis.speak(utterance);
  }, []);

  const toggle = useCallback(
    (text: string, options?: SpeechOptions) => {
      if (owner === idRef.current) stop();
      else speak(text, options);
    },
    [speak, stop],
  );

  return { supported, isSpeaking, speak, stop, toggle };
}
