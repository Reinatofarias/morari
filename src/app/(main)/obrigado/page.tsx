import { Metadata } from 'next';
import { ConversionButton } from '@/components/ui/ConversionButton';
import { INSTAGRAM_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Obrigado',
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-xl text-center space-y-8">
        {/* Check icon */}
        <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto">
          <span className="text-gold text-4xl">✓</span>
        </div>

        <div>
          <h1 className="font-display font-bold text-ice text-3xl mb-4">
            Recebemos suas informações.{' '}
            <span className="text-gold">O próximo passo é nosso.</span>
          </h1>
          <p className="text-muted-light leading-relaxed">
            A equipe vai analisar suas respostas e entrar em contato no horário que você indicou.
            Em até 24 horas úteis, você receberá uma mensagem.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-surface-soft text-left space-y-3">
          <h2 className="font-display font-semibold text-ice text-lg">O que acontece agora:</h2>
          <ul className="space-y-2 text-muted-light text-sm">
            <li>1. A equipe analisa suas informações</li>
            <li>2. Entramos em contato pelo WhatsApp no horário indicado</li>
            <li>3. Conversamos sobre o melhor caminho para você</li>
            <li>4. Sem pressão, sem compromisso</li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-muted text-sm">Enquanto espera:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ConversionButton label="Ver conteúdos" href="/conteudos" variant="secondary" size="md" />
            <ConversionButton label="Seguir no Instagram" href={INSTAGRAM_URL} variant="tertiary" size="md" />
          </div>
        </div>
      </div>
    </section>
  );
}
