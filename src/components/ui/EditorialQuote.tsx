'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface EditorialQuoteProps {
  quote: string;
  author?: string;
  variant?: 'large' | 'inline';
}

export function EditorialQuote({ quote, author, variant = 'large' }: EditorialQuoteProps) {
  if (variant === 'inline') {
    return (
      <motion.blockquote
        {...fadeIn}
        className="border-l-2 border-gold pl-6 py-2"
      >
        <p className="text-ice text-lg font-display italic leading-relaxed">{quote}</p>
        {author && (
          <cite className="block mt-3 text-muted text-sm not-italic">— {author}</cite>
        )}
      </motion.blockquote>
    );
  }

  return (
    <motion.div
      {...fadeIn}
      className="relative py-16 px-8 md:px-16 bg-blue-dark/50 rounded-2xl overflow-hidden"
    >
      {/* Decorative quotes */}
      <span className="absolute top-6 left-8 text-gold/15 text-[120px] font-display leading-none select-none">
        &ldquo;
      </span>
      <blockquote className="relative z-10 text-center">
        <p className="text-ice text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-snug max-w-4xl mx-auto">
          {quote}
        </p>
        {author && (
          <cite className="block mt-6 text-gold text-sm not-italic uppercase tracking-wider">
            — {author}
          </cite>
        )}
      </blockquote>
      <span className="absolute bottom-6 right-8 text-gold/15 text-[120px] font-display leading-none select-none rotate-180">
        &ldquo;
      </span>
    </motion.div>
  );
}
