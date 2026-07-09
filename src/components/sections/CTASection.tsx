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
    default: 'bg-surface',
    dark: 'bg-blue-dark/50',
    gold: 'bg-surface border border-gold/20',
  };

  return (
    <section className={`py-20 ${variants[variant]}`}>
      <motion.div
        {...fadeInUp}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
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
