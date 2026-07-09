'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface PathCardProps {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export function PathCard({ step, title, description, icon }: PathCardProps) {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      className="relative p-6 rounded-xl bg-surface border border-surface-soft group hover:border-gold/30 transition-all duration-300"
    >
      {/* Step number */}
      <span className="absolute -top-3 -left-1 text-gold/20 text-6xl font-display font-black select-none">
        {step}
      </span>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
          <IconComponent size={24} className="text-gold" />
        </div>
        <h3 className="font-display font-bold text-ice text-xl mb-2">{title}</h3>
        <p className="text-muted-light text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
