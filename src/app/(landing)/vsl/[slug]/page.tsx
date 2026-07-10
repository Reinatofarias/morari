import { ConversionButton } from '@/components/ui/ConversionButton';
import { portraitAssets } from '@/lib/visual-assets';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-16">
        <Image
          src={portraitAssets.profileSide.src}
          alt={portraitAssets.profileSide.alt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-20"
          style={{ objectPosition: portraitAssets.profileSide.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />
        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center text-center">
          <h1 className="mb-8 max-w-3xl font-display text-3xl font-bold leading-tight text-ice sm:text-5xl">
            Uma conversa direta para homens que precisam recuperar governo interno.
          </h1>
          <div className="mb-8 flex aspect-video w-full items-center justify-center rounded-lg border border-surface-soft bg-surface/80 shadow-2xl shadow-background/40">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
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
