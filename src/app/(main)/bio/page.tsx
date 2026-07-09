import { Metadata } from 'next';
import { ConversionButton } from '@/components/ui/ConversionButton';
import { WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Links — Dr. Matheus Morari',
  description: 'Psicólogo para homens que lideram. Acesse atendimentos, conteúdos e o Caminho de Resolução.',
  robots: { index: false, follow: true },
};

export default function BioPage() {
  const links = [
    { label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao', variant: 'primary' as const },
    { label: 'Conhecer atendimentos', href: '/atendimentos', variant: 'secondary' as const },
    { label: 'Curso sobre ansiedade', href: '/produtos/curso-ansiedade', variant: 'secondary' as const },
    { label: 'Conteúdos para homens que lideram', href: '/conteudos', variant: 'secondary' as const },
    { label: 'Falar no WhatsApp', href: WHATSAPP_URL, variant: 'secondary' as const },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center">
            <span className="font-display text-gold text-3xl font-bold">MM</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-ice text-xl">Dr. Matheus Morari</h1>
            <p className="text-gold text-xs uppercase tracking-[0.15em] mt-1">Psicólogo para homens que lideram</p>
          </div>
        </div>

        {/* Headline */}
        <div>
          <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl leading-tight mb-3">
            Homens fortes também quebram <span className="text-gold">em silêncio.</span>
          </h2>
          <p className="text-muted-light text-sm leading-relaxed">
            Se você lidera, carrega pressão e sente que está perdendo presença, 
            sanidade ou direção, comece por aqui.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => (
            <ConversionButton
              key={link.href}
              label={link.label}
              href={link.href}
              variant={link.variant}
              size="md"
              fullWidth
              eventName={`bio_${link.label}`}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="text-muted text-xs">
          CRP XX/XXXXX • Psicólogo Clínico
        </p>
      </div>
    </div>
  );
}
