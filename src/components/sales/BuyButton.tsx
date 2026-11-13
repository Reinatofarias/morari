'use client';

import { ArrowRight } from 'lucide-react';
import { events } from '@/lib/analytics';

type Props = {
  href: string;
  label: string;
  slug: string;
  position: string;
  className?: string;
  darkText?: boolean;
};

// Botão de compra das páginas de venda. id e data-gtm fixos por posição para o GTM.
export function BuyButton({ href, label, slug, position, className = '', darkText = false }: Props) {
  return (
    <a
      id={`lp-buy-${position}`}
      href={href}
      data-gtm="lp-buy"
      data-product={slug}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={() => events.ctaClick(`lp_${slug}_buy_${position}`, window.location.pathname)}
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold ${darkText ? 'text-[#111]' : 'text-white'} shadow-[0_10px_40px_-10px_var(--accent)] transition hover:brightness-110 active:scale-[0.99] ${className}`}
    >
      {label}
      <ArrowRight size={18} />
    </a>
  );
}
