'use client';

import Link from 'next/link';
import { events } from '@/lib/analytics';

interface ConversionButtonProps {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  eventName?: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

export function ConversionButton({
  label,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  eventName,
  fullWidth = false,
  onClick,
}: ConversionButtonProps) {
  const handleClick = () => {
    if (eventName) {
      events.ctaClick(eventName, window.location.pathname);
    } else {
      events.ctaClick(label, window.location.pathname);
    }
    onClick?.();
  };

  const isExternal = href.startsWith('http');

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  const variants = {
    primary:
      'bg-gold text-background font-semibold hover:bg-gold/90 active:bg-gold/80 shadow-lg shadow-gold/20',
    secondary:
      'border-2 border-gold text-gold bg-transparent hover:bg-gold/10 font-semibold',
    tertiary:
      'text-gold hover:text-gold-soft underline underline-offset-4 decoration-gold/50 hover:decoration-gold',
  };

  const className = `
    inline-flex items-center justify-center gap-2 rounded-lg
    transition-all duration-300 tracking-wide
    ${sizes[size]}
    ${variants[variant]}
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {icon}
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {icon}
      {label}
    </Link>
  );
}
