import { ConversionButton } from '@/components/ui/ConversionButton';
import { Play } from 'lucide-react';

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-16 flex items-center justify-center">
        {/* Glow effects for premium dark mood */}
        <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-gold/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-dark/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
          <h1 className="mb-8 max-w-3xl font-display text-3xl font-bold leading-tight text-ice sm:text-5xl">
            Uma conversa direta para homens que precisam recuperar governo interno.
          </h1>
          
          <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-lg border border-surface-soft bg-surface/80 shadow-2xl shadow-background/40 group hover:border-gold/30 transition-all duration-300 cursor-pointer">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10 group-hover:bg-gold/20 group-hover:scale-105 transition-all duration-300">
              <Play size={34} className="ml-1 text-gold" />
            </div>
          </div>
          
          <p className="mb-8 max-w-2xl text-muted-light">
            Template minimalista para inserir o vídeo principal e manter uma única ação abaixo do player.
          </p>
          
          <ConversionButton
            label="Iniciar Caminho de Resolução"
            href="/caminho-de-resolucao"
            size="lg"
          />
        </div>
      </section>
    </main>
  );
}
