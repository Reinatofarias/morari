'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { GoldenDivider } from '../ui/GoldenDivider';

interface SectionHeaderProps {
  label?: string;
  title: string;
  highlightWord?: string;
  description?: string;
  alignment?: 'left' | 'center';
}

export function SectionHeader({
  title,
  highlightWord,
  description,
  alignment = 'left',
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-gold">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      {...fadeInUp}
      className={`mb-12 ${alignment === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl md:text-display-sm leading-tight mb-4">
        {renderTitle()}
      </h2>
      <GoldenDivider
        width="80px"
        alignment={alignment}
        className="mb-4"
      />
      {description && (
        <p className={`text-muted-light text-base sm:text-lg leading-relaxed ${
          alignment === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
