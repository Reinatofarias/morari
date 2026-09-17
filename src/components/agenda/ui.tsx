'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { BRAZIL_ZONES, useTimezone } from '@/lib/agenda/timezone';

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function AgendaButton({
  className,
  variant = 'primary',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'danger' | 'ghost' }) {
  return (
    <button
      className={cn(
        'soft-transition inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary' && 'bg-primary text-primary-foreground hover:brightness-110',
        variant === 'outline' && 'border border-border text-foreground hover:border-primary/50 hover:text-primary',
        variant === 'danger' && 'border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20',
        variant === 'ghost' && 'text-muted-foreground hover:text-primary',
        className,
      )}
      {...props}
    />
  );
}

export function AgendaLinkButton({
  href,
  children,
  className,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
}) {
  return (
    <Link
      href={href}
      className={cn(
        'soft-transition inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold',
        variant === 'primary' && 'bg-primary text-primary-foreground hover:brightness-110',
        variant === 'outline' && 'border border-border text-foreground hover:border-primary/50 hover:text-primary',
        variant === 'ghost' && 'text-muted-foreground hover:text-primary',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function AgendaInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function AgendaTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export function AgendaLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </label>
  );
}

export function AgendaBrand({ subtitle }: { subtitle?: string }) {
  return (
    <Link href="/agenda" className="flex items-center gap-3">
      <Image
        src="/assets/branding/Logo Horizontal-nobg.png"
        alt="Matheus Morari"
        width={190}
        height={70}
        className="h-12 w-auto object-contain"
        priority
      />
      {subtitle ? <span className="border-l border-border pl-3 text-sm text-muted-foreground">{subtitle}</span> : null}
    </Link>
  );
}

export function TimezonePicker({ className }: { className?: string }) {
  const { zone, manual, setZone, resetZone } = useTimezone();

  return (
    <div className={cn('flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs', className)}>
      <span className="text-muted-foreground">Fuso</span>
      <select
        value={zone}
        onChange={(event) => setZone(event.target.value)}
        className="rounded-md border border-input bg-background px-2 py-1 text-foreground"
        aria-label="Fuso horario"
      >
        {BRAZIL_ZONES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      {manual ? (
        <button type="button" onClick={resetZone} className="text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
          detectar automaticamente
        </button>
      ) : null}
    </div>
  );
}

export function Message({ type = 'info', children }: { type?: 'info' | 'error' | 'success'; children: ReactNode }) {
  return (
    <p
      className={cn(
        'rounded-lg border p-3 text-sm',
        type === 'info' && 'border-border bg-card text-muted-foreground',
        type === 'error' && 'border-red-500/40 bg-red-500/10 text-red-200',
        type === 'success' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
      )}
    >
      {children}
    </p>
  );
}
