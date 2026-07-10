'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PainCardProps {
  icon: string;
  title: string;
  description?: string;
}

export function PainCard({ icon, title, description }: PainCardProps) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const IconComponent = icons[icon] || LucideIcons.AlertCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5 }}
      className="group p-6 rounded-xl bg-surface border border-surface-soft/80 hover:border-gold/30 hover:bg-surface/80 hover:shadow-[0_0_30px_rgba(201,168,76,0.03)] transition-all duration-500"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-red-accent/10 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-all duration-300">
          <IconComponent 
            size={20} 
            className="text-red-accent/70 group-hover:text-gold group-hover:scale-110 transition-all duration-300" 
          />
        </div>
        <div>
          <h3 className="font-display font-semibold text-ice text-base group-hover:text-gold transition-colors duration-300">{title}</h3>
          {description && (
            <p className="text-muted text-sm mt-1 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
