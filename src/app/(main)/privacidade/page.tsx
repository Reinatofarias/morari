import { Metadata } from 'next';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { portraitAssets } from '@/lib/visual-assets';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como os dados pessoais são tratados no site do Dr. Matheus Morari.',
};

const sections = [
  {
    title: 'Dados coletados',
    text: 'Coletamos apenas os dados necessários para contato profissional e organização de agenda: nome, WhatsApp, e-mail quando informado, tipo de encontro, data, horário e observações opcionais enviadas voluntariamente nos formulários do site.',
  },
  {
    title: 'Finalidade',
    text: 'Os dados são usados exclusivamente para responder solicitações, direcionar o primeiro contato, organizar atendimentos, confirmar horários e manter o histórico administrativo necessário para a prestação do serviço solicitado.',
  },
  {
    title: 'Base legal',
    text: 'O tratamento ocorre mediante consentimento informado no formulário e também para execução de procedimentos preliminares relacionados ao atendimento solicitado, conforme a Lei Geral de Proteção de Dados.',
  },
  {
    title: 'Uso do Google Calendar',
    text: 'A agenda do site pode se integrar ao Google Calendar para criar, consultar e evitar conflitos em eventos relacionados aos horários solicitados. Quando essa integração é usada, o aplicativo acessa apenas dados de calendário necessários para verificar disponibilidade e registrar o agendamento: título do evento, data, horário, descrição do atendimento, nome, WhatsApp e observações fornecidas pelo usuário.',
  },
  {
    title: 'Dados do Google e escopos OAuth',
    text: 'O aplicativo solicita permissões do Google apenas para funcionalidades de agenda. Os dados recebidos das APIs do Google Calendar não são usados para publicidade, venda de dados, treinamento de modelos de inteligência artificial ou qualquer finalidade diferente de criar, consultar e administrar os eventos de agenda exibidos ou gerados pelo próprio sistema.',
  },
  {
    title: 'Armazenamento e compartilhamento',
    text: 'As informações de agendamento podem ser armazenadas em banco de dados seguro e no Google Calendar autorizado para permitir controle administrativo dos horários. Esses dados não são vendidos. O compartilhamento ocorre apenas quando necessário para executar o serviço solicitado, cumprir obrigações legais ou operar ferramentas técnicas essenciais ao funcionamento do site.',
  },
  {
    title: 'Retenção',
    text: 'Os dados são mantidos pelo tempo necessário para organizar o atendimento, registrar histórico operacional e atender obrigações legais ou profissionais aplicáveis. Quando não forem mais necessários, poderão ser excluídos ou anonimizados.',
  },
  {
    title: 'Direitos do titular',
    text: 'Você pode solicitar acesso, correção, atualização, portabilidade, revogação de consentimento ou exclusão dos seus dados a qualquer momento pelos canais oficiais de contato. Também pode revogar permissões concedidas ao Google nas configurações da sua Conta Google.',
  },
  {
    title: 'Cookies e analytics',
    text: 'Ferramentas de análise e marketing podem ser usadas para medir desempenho do site e campanhas, respeitando as configurações de consentimento aplicáveis. Essas ferramentas não alteram a finalidade dos dados enviados para agendamento.',
  },
  {
    title: 'Contato',
    text: 'Para dúvidas sobre privacidade, tratamento de dados ou uso da integração com Google Calendar, entre em contato pelos canais oficiais informados no site matheusmorari.com.br.',
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <VisualPageIntro
        label="LGPD"
        title="Política de Privacidade"
        description="Transparência sobre os dados enviados pelo site e a finalidade do contato profissional."
        asset={portraitAssets.profileDesk}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-5">
            {sections.map((section) => (
              <div key={section.title} className="rounded-lg border border-surface-soft bg-surface p-6">
                <h2 className="mb-2 font-display text-xl font-semibold text-ice">{section.title}</h2>
                <p className="text-sm leading-relaxed text-muted-light">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
