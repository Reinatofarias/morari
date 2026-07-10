import { Metadata } from 'next';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { WHATSAPP_URL } from '@/lib/constants';
import { portraitAssets } from '@/lib/visual-assets';
import { ClipboardList, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o Dr. Matheus Morari. Agendamento, dúvidas e primeiros passos para seu atendimento.',
};

export default function ContatoPage() {
  return (
    <>
      <VisualPageIntro
        label="Contato"
        title="Se chegou até aqui, seu próximo passo é conversar."
        highlightWord="conversar"
        description="Escolha o canal que fizer mais sentido para você. A equipe responde em até 24 horas úteis."
        asset={portraitAssets.profileDesk}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-surface-soft bg-surface p-8 text-center transition-all hover:border-gold/30"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[#25D366]/10 transition-colors group-hover:bg-[#25D366]/20">
                <MessageCircle size={30} className="text-[#25D366]" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-ice">WhatsApp</h3>
              <p className="mb-4 text-sm text-muted">Mensagem direta. Resposta em até 24h.</p>
              <span className="text-sm font-medium text-gold">Abrir conversa</span>
            </a>

            <a
              href="/caminho-de-resolucao"
              className="group block rounded-lg border border-surface-soft bg-surface p-8 text-center transition-all hover:border-gold/30"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                <ClipboardList size={30} className="text-gold" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-ice">Formulário</h3>
              <p className="mb-4 text-sm text-muted">
                Preencha o Caminho de Resolução para um direcionamento personalizado.
              </p>
              <span className="text-sm font-medium text-gold">Preencher formulário</span>
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted">
              Atendimento online · Horários flexíveis · Sigilo profissional garantido
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="O primeiro passo não precisa ser perfeito. Precisa ser dado."
        primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="default"
      />
    </>
  );
}

