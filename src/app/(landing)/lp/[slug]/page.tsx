import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, X, ShieldCheck, Lock, Smartphone } from 'lucide-react';
import { CRP, WHATSAPP_NUMBER } from '@/lib/constants';
import { getProduct, PRODUCTS } from '@/lib/products';
import { SALES_PAGES } from '@/lib/product-sales';
import { portraitAssets } from '@/lib/visual-assets';
import { BuyButton } from '@/components/sales/BuyButton';

type Props = {
  params: Promise<{ slug: string }>;
};

// Arte de cada produto (mockups 16:9 na pasta public/assets/images).
const MOCKUPS: Record<string, string> = {
  'codigo-da-paz-conjugal': '/assets/images/Código da Paz Conjugal.png',
  'programa-de-inteligencia-emocional-para-homens': '/assets/images/Programa de Inteligencia Emocional masculina.png',
  'mapa-da-ansiedade-masculina': '/assets/images/Mapa de Ansiedade.png',
  'engrenagem-fantasma': '/assets/images/Engrenagem Fantasma.png',
  'codigo-h': '/assets/images/Código H.png',
  'mini-curso-de-saude-mental': '/assets/images/Mini curso de Saúde Mental.png',
};

function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: 'Produto não encontrado', robots: { index: false } };
  }

  const sales = SALES_PAGES[product.slug];
  return {
    title: `${product.title} | Dr. Matheus Morari`,
    description: sales.subheadline,
    robots: { index: false },
    openGraph: {
      title: product.title,
      description: sales.subheadline,
      images: [MOCKUPS[product.slug] ?? product.coverImage],
      type: 'website',
    },
  };
}

export default async function ProductSalesPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const sales = SALES_PAGES[product.slug];
  const mockup = MOCKUPS[product.slug] ?? product.coverImage;
  const buyHref =
    sales.checkoutUrl ||
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Olá, Dr. Matheus! Tenho interesse no produto "${product.title}". Como faço para adquirir?`
    )}`;
  const buyLabel = sales.checkoutUrl ? 'Quero começar agora' : 'Quero este produto';
  const darkText = isLight(sales.accent);
  const style = { '--accent': sales.accent } as CSSProperties;

  return (
    <main style={style} className="min-h-screen bg-[#0B0B0C] text-[#F5F0EB]">
      {/* Barra superior mínima */}
      <header className="border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="relative h-9 w-40">
            <Image
              src="/assets/branding/logo-horizontal-nobg-cropped.png"
              alt="Dr. Matheus Morari"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <span className="hidden items-center gap-2 text-xs text-white/50 sm:flex">
            <Lock size={12} /> Compra segura
          </span>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,var(--accent)_0%,transparent_65%)] opacity-[0.18]" />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-14 text-center md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">{sales.format}</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-[2.1rem] font-bold leading-[1.08] sm:text-5xl md:text-6xl">
            {sales.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{sales.subheadline}</p>

          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_40px_120px_-30px_var(--accent)]">
            <Image
              src={mockup}
              alt={product.title}
              width={1672}
              height={941}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <BuyButton href={buyHref} label={buyLabel} slug={product.slug} position="hero" darkText={darkText} />
            {sales.price && <p className="text-sm text-white/60">{sales.price}</p>}
            <p className="flex items-center gap-2 text-xs text-white/40">
              <Smartphone size={12} /> Acesso online · Garantia de 7 dias
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dor (papel claro) */}
      <section className="bg-[#F3EEE6] text-[#1A1A1A]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Talvez você se reconheça aqui.</h2>
          <ul className="mt-10 space-y-5">
            {sales.pains.map((pain) => (
              <li key={pain} className="flex gap-4 text-lg leading-relaxed">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                {pain}
              </li>
            ))}
          </ul>
          <p className="mt-12 border-l-4 border-[var(--accent)] pl-5 font-display text-xl leading-snug sm:text-2xl">
            Se pelo menos uma dessas frases é sua, este material foi feito para você.
          </p>
        </div>
      </section>

      {/* 3. O que você vai trabalhar */}
      <section className="bg-[#F3EEE6] text-[#1A1A1A]">
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">O que você vai trabalhar</h2>
          <ol className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {sales.topics.map((topic, i) => (
              <li key={topic.title} className="flex gap-5 border-t border-black/10 py-6">
                <span className="font-display text-3xl leading-none text-[var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold">{topic.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-black/65">{topic.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Para quem é / não é */}
      <section>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">É para você se…</h2>
            <ul className="mt-6 space-y-4">
              {sales.forWhom.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/80">
                  <Check size={20} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Não é para…</h2>
            <ul className="mt-6 space-y-4">
              {sales.notFor.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed text-white/60">
                  <X size={20} className="mt-0.5 shrink-0 text-white/35" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Quem conduz */}
      <section className="border-y border-white/5 bg-[#111113]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl md:col-span-5">
            <Image
              src={portraitAssets.profileDesk.src}
              alt="Dr. Matheus Morari"
              fill
              sizes="300px"
              className="object-cover object-top"
            />
          </div>
          <div className="md:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Quem conduz</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Dr. Matheus Morari</h2>
            <p className="mt-1 text-sm text-white/50">Psicólogo clínico · {CRP}</p>
            <p className="mt-5 leading-relaxed text-white/75">
              Psicólogo com formação em psicologia sistêmica e hipnoterapia. Atende homens que lideram (empresários,
              gestores, profissionais liberais) e que carregam pressão em silêncio. O trabalho dele é técnico, direto e
              sem autoajuda.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Garantia + dúvidas */}
      <section className="bg-[#F3EEE6] text-[#1A1A1A]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-black/10 bg-white/60 p-7 sm:flex-row">
            <ShieldCheck size={40} className="shrink-0 text-[var(--accent)]" />
            <div>
              <h2 className="font-display text-2xl font-bold">Garantia de 7 dias</h2>
              <p className="mt-2 leading-relaxed text-black/70">
                Se não fizer sentido para você, peça o reembolso em até 7 dias pela própria plataforma de pagamento.
                Sem burocracia e sem precisar explicar.
              </p>
            </div>
          </div>

          <h2 className="mt-16 font-display text-3xl font-bold">Dúvidas frequentes</h2>
          <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
            {[
              {
                q: 'Como recebo o acesso?',
                a: 'Logo após a confirmação do pagamento, você recebe o acesso por e-mail e pode consumir pelo celular ou computador.',
              },
              {
                q: 'Isso substitui terapia?',
                a: 'Não. É um material de autoconhecimento e direção. Se você perceber que precisa de acompanhamento individual, o Dr. Matheus também atende em consultório online.',
              },
              {
                q: 'É seguro comprar?',
                a: 'Sim. O pagamento é processado por uma plataforma especializada em produtos digitais, com cartão, Pix ou boleto.',
              },
              {
                q: 'E se eu tiver outra dúvida?',
                a: 'Fale direto no WhatsApp antes de comprar. A resposta vem da equipe do Dr. Matheus.',
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  {item.q}
                  <span className="text-xl text-[var(--accent)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-black/70">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Chamada final */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,var(--accent)_0%,transparent_65%)] opacity-[0.16]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{sales.closing}</h2>
          <div className="mt-10 flex flex-col items-center gap-3">
            <BuyButton href={buyHref} label={buyLabel} slug={product.slug} position="final" darkText={darkText} />
            {sales.price && <p className="text-sm text-white/60">{sales.price}</p>}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
        Dr. Matheus Morari · Psicólogo · {CRP}
        <br />
        Em crise ou risco imediato: CVV 188 (24h) · SAMU 192.
      </footer>
    </main>
  );
}
