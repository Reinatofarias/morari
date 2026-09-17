import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { AgendaLinkButton } from '@/components/agenda/ui';

export const metadata: Metadata = {
  title: 'Agendar horario | Matheus Morari',
  description: 'Agende seu horario com Matheus Morari pelo site oficial.',
};

export default function AgendaHomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <Image
        src="/assets/images/Hero.jpeg"
        alt="Matheus Morari"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,var(--color-background)_34%,rgba(10,10,10,0.86)_50%,rgba(10,10,10,0.35)_78%,rgba(10,10,10,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,0.48),transparent_34%,transparent_72%,rgba(10,10,10,0.28))]" />

      <Image
        src="/assets/branding/Logo Horizontal-nobg.png"
        alt="Matheus Morari"
        width={230}
        height={86}
        className="absolute left-6 top-6 z-20 h-16 w-auto object-contain sm:left-10 sm:h-20 lg:left-16"
        priority
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="step-in w-full max-w-lg">
          <p className="text-[10px] uppercase tracking-[0.32em] text-primary/80">Psicologo · Matheus Morari</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl">
            Agende seu <span className="text-gradient-gold">horario</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Escolha a data, veja os horarios livres e confirme em poucos segundos.
          </p>

          <div className="mt-8">
            <AgendaLinkButton href="/agenda/agendar" className="w-full px-10 sm:w-auto">
              Agendar horario
            </AgendaLinkButton>
          </div>

          <div className="mt-12 max-w-md border-t border-border pt-6">
            <Link
              href="/agenda/login"
              className="soft-transition text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-primary"
            >
              Acesso interno - ver clientes agendados
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
