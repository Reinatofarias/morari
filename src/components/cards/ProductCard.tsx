'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  type: string;
  status: 'active' | 'coming_soon' | 'draft';
  price?: string;
  href: string;
  coverImage?: string;
}

export function ProductCard({ title, description, type, status, price, href, coverImage }: ProductCardProps) {
  const typeLabels: Record<string, string> = {
    curso: 'Curso',
    material: 'Material',
    formacao: 'Formação',
    programa: 'Programa',
    mapa: 'Mapa',
    codigo: 'Código',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={href}
        className={`group block rounded-xl bg-surface border border-surface-soft overflow-hidden transition-all duration-300 ${
          status === 'active' ? 'hover:border-gold/30 hover:-translate-y-1' : 'opacity-80'
        }`}
      >
        <div className="h-48 bg-gradient-to-br from-surface-soft to-blue-dark/50 relative overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`Capa de ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-gold/20 font-display text-6xl font-black">
              {title[0]}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-background/25 to-transparent" />
          
          {/* Status badge */}
          {status === 'coming_soon' && (
            <span className="absolute top-4 right-4 text-[11px] text-gold bg-background/80 border border-gold/30 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              Em breve
            </span>
          )}
          
          {/* Type badge */}
          <span className="absolute top-4 left-4 text-[11px] text-muted-light bg-background/80 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {typeLabels[type] || type}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-display font-bold text-ice text-lg mb-2 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="text-muted text-sm leading-relaxed mb-4">{description}</p>
          
          <div className="flex items-center justify-between">
            {price && (
              <span className="text-gold font-display font-bold text-lg">{price}</span>
            )}
            {status === 'active' && (
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                Ver detalhes <ArrowRight size={16} />
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
