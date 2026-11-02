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
const activeUtterances = new Set<SpeechSynthesisUtterance>();
let activeTimeout: ReturnType<typeof setTimeout> | null = null;

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
      if (activeTimeout) {
        clearTimeout(activeTimeout);
        activeTimeout = null;
      }
      activeUtterances.clear();
      window.speechSynthesis.cancel();
      changeOwner(null);
    }
  }, []);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!canSpeak() || !text.trim()) return;

    if (activeTimeout) {
      clearTimeout(activeTimeout);
      activeTimeout = null;
    }
    activeUtterances.clear();
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const id = idRef.current;
    changeOwner(id);

    const repeatCount = Math.max(1, options.repeat ?? 1);
    const trimmed = text.trim();
    const utteranceText = /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;

    let currentIndex = 0;

    const speakItem = () => {
      if (owner !== id) {
        activeUtterances.clear();
        return;
      }

      if (currentIndex >= repeatCount) {
        activeUtterances.clear();
        changeOwner(null);
        options.onEnd?.();
        return;
      }

      const repNumber = currentIndex + 1;
      const utterance = new SpeechSynthesisUtterance(utteranceText);
      utterance.lang = options.lang ?? 'en-US';
      utterance.rate = options.rate ?? 0.9;
      utterance.pitch = options.pitch ?? 1;
      utterance.volume = options.volume ?? 1;

      activeUtterances.add(utterance);

      utterance.onstart = () => {
        if (owner !== id) return;
        options.onRepetitionStart?.(repNumber, repeatCount);
      };

      utterance.onend = () => {
        activeUtterances.delete(utterance);
        if (owner !== id) {
          activeUtterances.clear();
          return;
        }
        options.onRepetitionEnd?.(repNumber, repeatCount);
        currentIndex++;
        if (currentIndex < repeatCount) {
          activeTimeout = setTimeout(() => {
            activeTimeout = null;
            if (owner === id) {
              speakItem();
            }
          }, 300);
        } else {
          activeUtterances.clear();
          changeOwner(null);
          options.onEnd?.();
        }
      };

      utterance.onerror = (e) => {
        activeUtterances.delete(utterance);
        if (owner !== id) {
          activeUtterances.clear();
          return;
        }
        if (e.error === 'canceled' || e.error === 'interrupted') {
          activeUtterances.clear();
          changeOwner(null);
          return;
        }
        currentIndex++;
        if (currentIndex < repeatCount) {
          activeTimeout = setTimeout(() => {
            activeTimeout = null;
            if (owner === id) speakItem();
          }, 200);
        } else {
          activeUtterances.clear();
          changeOwner(null);
          options.onEnd?.();
        }
      };

      if (options.onBoundary && currentIndex === 0) {
        utterance.onboundary = (e: SpeechSynthesisEvent) => {
          if (owner !== id) return;
          options.onBoundary?.(e);
        };
      }

      window.speechSynthesis.speak(utterance);
    };

    speakItem();
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
