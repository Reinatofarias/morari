'use client';

import { motion } from 'framer-motion';
import { goldenReveal } from '@/lib/animations';

interface GoldenDividerProps {
  width?: string;
  alignment?: 'left' | 'center' | 'right';
  animated?: boolean;
  className?: string;
}

export function GoldenDivider({
  width = '120px',
  alignment = 'left',
  animated = true,
  className = '',
}: GoldenDividerProps) {
  const alignmentClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  if (animated) {
    return (
      <motion.div
        {...goldenReveal}
        style={{ maxWidth: width }}
        className={`h-0.5 bg-gradient-to-r from-gold/80 via-gold to-gold/80 rounded-full ${alignmentClasses[alignment]} ${className}`}
      />
    );
  }

  return (
    <div
      style={{ width }}
      className={`h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full ${alignmentClasses[alignment]} ${className}`}
    />
  );
}
