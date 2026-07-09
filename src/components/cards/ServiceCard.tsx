'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  tags?: readonly string[] | string[];
}

export function ServiceCard({ title, description, href, icon, tags }: ServiceCardProps) {
  const IconComponent = icon
    ? (LucideIcons as any)[icon] || LucideIcons.Briefcase
    : LucideIcons.Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className="group block p-6 sm:p-8 rounded-xl bg-surface border border-surface-soft hover:border-gold/30 hover:-translate-y-1 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
          <IconComponent size={24} className="text-gold" />
        </div>

        <h3 className="font-display font-bold text-ice text-xl mb-3 group-hover:text-gold transition-colors">
          {title}
        </h3>

        <p className="text-muted-light text-sm leading-relaxed mb-4">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-gold/80 bg-gold/10 px-2.5 py-1 rounded-full uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
          Saiba mais <ArrowRight size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
