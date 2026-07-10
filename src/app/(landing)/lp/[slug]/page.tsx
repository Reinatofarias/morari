import { ConversionButton } from '@/components/ui/ConversionButton';
import { portraitAssets } from '@/lib/visual-assets';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen overflow-hidden px-6 py-20">
        <Image
          src={portraitAssets.heroConcept.src}
          alt={portraitAssets.heroConcept.alt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-35"
          style={{ objectPosition: portraitAssets.heroConcept.position }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/45" />
        <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Campanha
            </p>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-ice sm:text-5xl md:text-6xl">
              Antes de tentar aguentar mais uma fase sozinho, entenda o que está acontecendo.
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-light">
              Estrutura de landing page pronta para campanhas de identificação, diagnóstico e conversão ética para o Caminho de Resolução.
            </p>
            <ConversionButton
              label="Iniciar Caminho de Resolução"
              href="/caminho-de-resolucao"
              size="lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
