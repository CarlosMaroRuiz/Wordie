export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
}

export interface UseSpeechSynthesisResult {
  supported: boolean;
  isSpeaking: boolean;
  speak: (text: string, options?: SpeechOptions) => void;
  stop: () => void;
  toggle: (text: string, options?: SpeechOptions) => void;
}
