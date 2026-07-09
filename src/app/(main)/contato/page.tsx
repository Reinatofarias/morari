import { Metadata } from 'next';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CTASection } from '@/components/sections/CTASection';
import { WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o Dr. Matheus Morari. Agendamento, dúvidas e primeiros passos para seu atendimento.',
};

export default function ContatoPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader
            label="Contato"
            title="Se chegou até aqui, seu próximo passo é conversar."
            highlightWord="conversar"
            description="Escolha o canal que fizer mais sentido para você. A equipe responde em até 24 horas úteis."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 rounded-xl bg-surface border border-surface-soft hover:border-gold/30 transition-all text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-display font-semibold text-ice text-xl mb-2">WhatsApp</h3>
              <p className="text-muted text-sm mb-4">Mensagem direta. Resposta em até 24h.</p>
              <span className="text-gold text-sm font-medium">Abrir conversa →</span>
            </a>

            {/* Caminho de Resolução */}
            <a
              href="/caminho-de-resolucao"
              className="group block p-8 rounded-xl bg-surface border border-surface-soft hover:border-gold/30 transition-all text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-display font-semibold text-ice text-xl mb-2">Formulário</h3>
              <p className="text-muted text-sm mb-4">Preencha o Caminho de Resolução para um direcionamento personalizado.</p>
              <span className="text-gold text-sm font-medium">Preencher formulário →</span>
            </a>
          </div>

          {/* Info */}
          <div className="mt-12 text-center">
            <p className="text-muted text-sm">
              Atendimento online • Horários flexíveis • Sigilo profissional garantido
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
