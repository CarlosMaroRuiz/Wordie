import type { BannerProps } from './type';
import { motion } from 'motion/react';
export const Banner = ({ title, category, level, explanation, formula, formulas }: BannerProps) => {

    return (
        <>
            <div className="flex justify-between items-center">
                <span className="inline-block bg-primary-light text-primary rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {category}
                </span>
                <span className="text-sm font-bold text-text-main">Nivel {level}</span>
            </div>

            <div>
                <h2 className="text-3xl font-extrabold text-text-main mb-3">{title}</h2>
                <p className="text-text-main text-base leading-relaxed">
                    {explanation}
                </p>
            </div>

            <div className="mt-6">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-3">
                    ESTRUCTURA GRAMATICAL
                </span>
                
                {formulas && formulas.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {formulas.map((f, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ x: 6, scale: 1.01 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                className="bg-primary-light/40 text-primary font-mono text-sm p-4 rounded-xl border border-primary-light flex flex-col md:flex-row md:items-center gap-2 cursor-default hover:bg-primary-light/60 hover:shadow-sm"
                            >
                                <span className="font-bold uppercase text-[11px] tracking-widest opacity-80 md:w-32 shrink-0">{f.label}</span>
                                <strong>{f.value}</strong>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        whileHover={{ x: 6, scale: 1.01 }}
                        className="bg-primary-light/40 text-primary font-mono text-sm p-4 rounded-xl border border-primary-light cursor-default hover:bg-primary-light/60 hover:shadow-sm"
                    >
                        <strong>{formula}</strong>
                    </motion.div>
                )}
            </div>
        </>
    )
}