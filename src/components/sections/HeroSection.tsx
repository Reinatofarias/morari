'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, scaleIn } from '@/lib/animations';
import { GoldenDivider } from '../ui/GoldenDivider';
import { ConversionButton } from '../ui/ConversionButton';
import Image from 'next/image';

interface HeroSectionProps {
  headline: string;
  highlightWord?: string;
  subheadline: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'home' | 'page' | 'minimal';
  image?: string;
}

export function HeroSection({
  headline,
  highlightWord,
  subheadline,
  primaryCTA,
  secondaryCTA,
  variant = 'home',
  image,
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
    <section className={`relative ${heights[variant]} flex items-center justify-center overflow-hidden bg-background`}>
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-blue-dark/20 z-0" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[130px] z-0" />
      <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-dark/20 rounded-full blur-[110px] z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 md:py-36">
        {image ? (
          /* Split Layout with Image */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gold text-xs uppercase tracking-[0.2em] font-medium"
              >
                Dr. Matheus Morari — Psicólogo
              </motion.p>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display font-bold text-ice leading-[1.1] tracking-tight
                  text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
              >
                {renderHeadline()}
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <GoldenDivider width="80px" alignment="left" />
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-muted-light text-base sm:text-lg max-w-2xl leading-relaxed"
              >
                {subheadline}
              </motion.p>

              {/* CTAs */}
              {(primaryCTA || secondaryCTA) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
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

            {/* Image Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              {/* Background circular subtle glow behind headshot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold/[0.04] rounded-full blur-[60px] z-0" />
              
              <motion.div
                {...scaleIn}
                className="relative w-full max-w-[420px] aspect-[4/5] z-10"
              >
                <Image
                  src={image}
                  alt="Dr. Matheus Morari"
                  fill
                  priority
                  className="object-contain object-bottom select-none"
                  sizes="(max-w-768px) 100vw, 420px"
                />
                {/* Dark vignette blending bottom of cut-out into the background */}
                <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
              </motion.div>
            </div>
          </div>
        ) : (
          /* Centered Layout */
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold text-xs uppercase tracking-[0.2em] font-medium"
            >
              Dr. Matheus Morari — Psicólogo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display font-bold text-ice leading-[1.1] tracking-tight
                text-3xl sm:text-4xl md:text-5xl lg:text-display-xl"
            >
              {renderHeadline()}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center"
            >
              <GoldenDivider width="80px" alignment="center" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-light text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {(primaryCTA || secondaryCTA) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
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
        )}
      </div>

      {/* Bottom fade */}
      {variant === 'home' && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      )}
    </section>
  );
}
