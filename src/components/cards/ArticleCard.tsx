'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  slug: string;
  coverImage?: string;
  publishedAt?: string;
}

export function ArticleCard({ title, description, category, slug, coverImage, publishedAt }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/conteudos/${slug}`}
        className="group block rounded-xl bg-surface border border-surface-soft overflow-hidden hover:border-gold/30 transition-all duration-300"
      >
        <div className="h-44 bg-gradient-to-br from-blue-dark/50 to-surface-soft relative overflow-hidden">
          {coverImage && (
            <Image
              src={coverImage}
              alt={`Capa do artigo: ${title}`}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-background/30 to-transparent" />
          <span className="absolute bottom-4 left-4 text-[11px] text-gold bg-background/80 border border-gold/20 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-display font-semibold text-ice text-lg mb-2 group-hover:text-gold transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3">{description}</p>
          {publishedAt && (
            <time className="text-muted text-xs">{publishedAt}</time>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
