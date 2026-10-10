import { SpeakerHigh } from '@phosphor-icons/react';
import { Button } from '@common/Button';
import { motion } from 'motion/react';
import type { ExampleProps } from './types';

export const Example = ({ en, es }: ExampleProps) => {
    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(en);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    return (
        <motion.div 
            whileHover={{ scale: 1.01, x: 4 }}
            className="bg-bg-page p-5 rounded-xl border border-border-subtle flex justify-between items-start mb-3 hover:border-primary/40 hover:shadow-sm transition-colors"
        >
            <div className="flex flex-col gap-2">
                <span className="font-bold text-text-main text-[17px]">
                    {en}
                </span>
                <span className="text-text-secondary text-[15px]">
                    {es}
                </span>
            </div>
            <Button variant="icon" size="sm" aria-label={`Pronunciar: ${en}`} onClick={speak}>
                <SpeakerHigh size={20} weight="bold" />
            </Button>
        </motion.div>
    );
};
