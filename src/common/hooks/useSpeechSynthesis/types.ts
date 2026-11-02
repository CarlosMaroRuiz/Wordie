export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  repeat?: number;
  onRepetitionStart?: (current: number, total: number) => void;
  onRepetitionEnd?: (current: number, total: number) => void;
  onEnd?: () => void;
  onBoundary?: (event: SpeechSynthesisEvent) => void;
}

export interface UseSpeechSynthesisResult {
  supported: boolean;
  isSpeaking: boolean;
  speak: (text: string, options?: SpeechOptions) => void;
  stop: () => void;
  toggle: (text: string, options?: SpeechOptions) => void;
}
