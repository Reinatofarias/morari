'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { GoldenDivider } from '../ui/GoldenDivider';
import { ConversionButton } from '../ui/ConversionButton';

interface HeroSectionProps {
  headline: string;
  highlightWord?: string;
  subheadline: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'home' | 'page' | 'minimal';
}

export function HeroSection({
  headline,
  highlightWord,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = 'home',
}: HeroSectionProps) {
  const renderHeadline = () => {
    if (!highlightWord) {
      return headline;
    }
    const parts = headline.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-gold">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  const heights = {
    home: 'min-h-screen',
    page: 'min-h-[70vh]',
    minimal: 'min-h-[50vh]',
  };

  return (
    <section className={`relative ${heights[variant]} flex items-center justify-center overflow-hidden`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-blue-dark/30" />
      
      {/* Subtle golden light effect */}
      <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-dark/30 rounded-full blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gold text-xs uppercase tracking-[0.2em] font-medium mb-6"
        >
          Dr. Matheus Morari — Psicólogo
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-ice leading-[1.1] tracking-tight mb-6
            text-3xl sm:text-4xl md:text-5xl lg:text-display-xl"
        >
          {renderHeadline()}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-6"
        >
          <GoldenDivider width="80px" alignment="center" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryCTA && (
              <ConversionButton
                label={primaryCTA.label}
                href={primaryCTA.href}
                variant="primary"
                size="lg"
              />
            )}
            {secondaryCTA && (
              <ConversionButton
                label={secondaryCTA.label}
                href={secondaryCTA.href}
                variant="secondary"
                size="lg"
              />
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      {variant === 'home' && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      )}
    </section>
  );
}
