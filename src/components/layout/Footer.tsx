import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, CRP, NAV_LINKS, WHATSAPP_URL, INSTAGRAM_URL, SERVICES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-soft/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/branding/Logo Horizontal-nobg.png"
                alt="Dr. Matheus Morari"
                width={150}
                height={38}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-muted-light text-sm italic font-display">
              &ldquo;Não é sucesso se você perder sua família.&rdquo;
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-gold transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Atendimentos Column */}
          <div>
            <h4 className="text-ice font-display font-semibold mb-4 text-sm uppercase tracking-wider">
              Atendimentos
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-muted-light text-sm hover:text-gold transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional Column */}
          <div>
            <h4 className="text-ice font-display font-semibold mb-4 text-sm uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-light text-sm hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contato"
                  className="text-muted-light text-sm hover:text-gold transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-ice font-display font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <span className="text-muted text-sm">{CRP}</span>
              </li>
              <li>
                <span className="text-muted text-xs leading-relaxed block">
                  Psicólogo clínico. Atendimento online e presencial.
                  Este site não substitui avaliação ou acompanhamento
                  médico/psiquiátrico quando necessário.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-surface-soft/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} {SITE_NAME}. Todos os direitos reservados.
          </p>
          <p className="text-muted text-xs">
            Desenvolvido com propósito.
          </p>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-surface-soft/50 border-t border-surface-soft">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-muted text-[11px] text-center leading-relaxed">
            Se você está em situação de crise ou risco imediato: CVV — Ligue 188 (24h) | SAMU — Ligue 192 | Busque o pronto-socorro mais próximo.
          </p>
        </div>
      </div>
    </footer>
  );
}
