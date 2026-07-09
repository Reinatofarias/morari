import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Conteúdo', robots: { index: false } };

export default function ConteudoSlugPage() {
  // In production, this would fetch from Supabase by slug
  // For now, show a placeholder
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-gold text-xs uppercase tracking-[0.2em] font-medium mb-4">Conteúdo</p>
        <h1 className="font-display font-bold text-ice text-3xl mb-6">Artigo em preparação</h1>
        <p className="text-muted-light leading-relaxed mb-8">
          Este conteúdo está sendo preparado. Em breve estará disponível.
        </p>
        <a href="/conteudos" className="text-gold text-sm font-medium underline underline-offset-4">
          ← Voltar para conteúdos
        </a>
      </div>
    </section>
  );
}
