'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { events } from '@/lib/analytics';
import { Loader2 } from 'lucide-react';

const leadSchema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo.'),
  whatsapp: z.string().min(10, 'Informe um WhatsApp válido.'),
  email: z.string().email('Informe um e-mail válido.'),
  dor_principal: z.string().optional(),
  identificacao: z.string().optional(),
  melhor_horario: z.string().optional(),
  consent: z.literal(true, {
    message: 'Você precisa concordar com a política de privacidade.',
  }),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadFormProps {
  redirectTo?: string;
  origem?: string;
}

export function LeadForm({ redirectTo = '/obrigado', origem = 'caminho-de-resolucao' }: LeadFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true);
    setError('');
    events.formSubmit(origem);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, origem }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao enviar.');
      }

      events.formSuccess(origem);
      router.push(redirectTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.');
      events.formError(origem, String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = `w-full bg-background border border-surface-soft rounded-lg px-4 py-3 text-ice text-sm
    placeholder:text-muted focus:border-gold focus:outline-none transition-colors`;

  const errorClasses = 'text-red-accent text-xs mt-1';

  return (
    <motion.form
      {...fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 max-w-lg mx-auto"
      onFocus={() => events.formStart(origem)}
    >
      {/* Nome */}
      <div>
        <label htmlFor="nome" className="block text-ice text-sm font-medium mb-2">
          Nome completo *
        </label>
        <input
          {...register('nome')}
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          className={inputClasses}
        />
        {errors.nome && <p className={errorClasses}>{errors.nome.message}</p>}
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className="block text-ice text-sm font-medium mb-2">
          WhatsApp *
        </label>
        <input
          {...register('whatsapp')}
          id="whatsapp"
          type="tel"
          placeholder="(00) 00000-0000"
          className={inputClasses}
        />
        {errors.whatsapp && <p className={errorClasses}>{errors.whatsapp.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-ice text-sm font-medium mb-2">
          E-mail *
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="seu@email.com"
          className={inputClasses}
        />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>

      {/* Dor principal */}
      <div>
        <label htmlFor="dor_principal" className="block text-ice text-sm font-medium mb-2">
          Qual sua principal dor hoje?
        </label>
        <textarea
          {...register('dor_principal')}
          id="dor_principal"
          rows={3}
          placeholder="Descreva brevemente o que está sentindo..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Identificação */}
      <div>
        <label htmlFor="identificacao" className="block text-ice text-sm font-medium mb-2">
          Você se identifica mais com:
        </label>
        <select
          {...register('identificacao')}
          id="identificacao"
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="">Selecione...</option>
          <option value="ansiedade">Ansiedade</option>
          <option value="esgotamento">Esgotamento</option>
          <option value="familia">Família</option>
          <option value="lideranca">Liderança</option>
          <option value="padroes">Padrões Repetitivos</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      {/* Melhor horário */}
      <div>
        <label htmlFor="melhor_horario" className="block text-ice text-sm font-medium mb-2">
          Melhor horário para contato
        </label>
        <select
          {...register('melhor_horario')}
          id="melhor_horario"
          className={`${inputClasses} appearance-none cursor-pointer`}
        >
          <option value="">Selecione...</option>
          <option value="manha">Manhã (8h-12h)</option>
          <option value="tarde">Tarde (13h-17h)</option>
          <option value="noite">Noite (18h-21h)</option>
        </select>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          {...register('consent')}
          id="consent"
          type="checkbox"
          className="mt-1 accent-gold"
        />
        <label htmlFor="consent" className="text-muted text-xs leading-relaxed">
          Concordo com o tratamento dos meus dados pessoais conforme a Política de Privacidade.
          Entendo que meus dados serão usados exclusivamente para contato profissional e poderei
          solicitar exclusão a qualquer momento.
        </label>
      </div>
      {errors.consent && <p className={errorClasses}>{errors.consent.message}</p>}

      {/* Error */}
      {error && (
        <p className="text-red-accent text-sm text-center bg-red-accent/10 border border-red-accent/20 rounded-lg p-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gold text-background font-semibold py-4 rounded-lg hover:bg-gold/90 
          active:bg-gold/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          shadow-lg shadow-gold/20 text-sm tracking-wide flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Enviando...
          </>
        ) : (
          'Iniciar meu caminho'
        )}
      </button>
    </motion.form>
  );
}
