'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { ConversionButton } from '../ui/ConversionButton';

interface CTASectionProps {
  headline: string;
  description?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'default' | 'dark' | 'gold';
}

export function CTASection({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
}: CTASectionProps) {
  const variants = {
    default: 'bg-surface border-y border-surface-soft/40 relative overflow-hidden',
    dark: 'bg-gradient-to-b from-surface via-background to-background border-t border-surface-soft/40 relative overflow-hidden',
    gold: 'bg-surface border border-gold/20 relative overflow-hidden rounded-2xl max-w-5xl mx-auto my-16',
  };

  return (
    <section className={`py-20 md:py-28 relative ${variants[variant]}`}>
      {/* Visual background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/[0.02] rounded-full blur-[120px] pointer-events-none -z-10" />
      {variant === 'gold' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.01] to-transparent pointer-events-none" />
      )}
      
      <motion.div
        {...fadeInUp}
        className="max-w-3xl mx-auto px-6 text-center relative z-10"
      >
        <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl md:text-display-sm leading-[1.2] mb-6">
          {headline}
        </h2>
        {description && (
          <p className="text-muted-light text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ConversionButton
            label={primaryCTA.label}
            href={primaryCTA.href}
            variant="primary"
            size="lg"
          />
          {secondaryCTA && (
            <ConversionButton
              label={secondaryCTA.label}
              href={secondaryCTA.href}
              variant="secondary"
              size="lg"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}
