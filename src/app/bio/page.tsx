import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { matheusProducts, BioProduct } from '@/data/matheusBio';
import { CRP } from '@/lib/constants';
import { portraitAssets } from '@/lib/visual-assets';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Links e Vitrine | Dr. Matheus Morari',
  description: 'Acesse atendimentos, programas de desenvolvimento e materiais para homens que lideram.',
  robots: { index: false, follow: true },
};

export default function BioLandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center py-12 px-4 sm:px-6">
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-dark/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-3xl w-full space-y-12 z-10 flex flex-col items-center">
        
        {/* 1. HERO PRINCIPAL */}
        <BioHero />

        {/* Links Úteis Header Divider */}
        <div className="w-full flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-surface-soft/60" />
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em]">Links Úteis</span>
          <div className="h-px flex-1 bg-surface-soft/60" />
        </div>

        {/* 2. BANNER DE ATENDIMENTO */}
        <div className="w-full">
          <Link
            href="/atendimentos"
            className="w-full block relative overflow-hidden group hover:scale-[1.01] transition-all duration-300 rounded-2xl shadow-xl"
          >
            <Image
              src="/assets/images/Atendimentos.png"
              alt="Atendimentos Clínicos"
              width={800}
              height={360}
              className="w-full h-auto rounded-2xl border border-surface-soft/60 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
            />
          </Link>
        </div>

        {/* 3. BANNER PRINCIPAL (DIAGNÓSTICO) */}
        <MainBanner />

        {/* 4. SEÇÃO DE PRODUTOS */}
        <div className="w-full space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="font-display font-bold text-ice text-xl sm:text-2xl tracking-tight">Produtos e Materiais</h3>
            <p className="text-muted text-xs sm:text-sm leading-relaxed">
              Caminhos práticos para homens que querem entender o que carregam antes que o peso cobres caro demais.
            </p>
          </div>
          
          <ProductGrid products={matheusProducts} />
        </div>

        {/* 5. FOOTER MINIMAL */}
        <FooterMinimal />

      </div>
    </main>
  );
}

/* ==================================================
   SUBCOMPONENT: BIO HERO
   ================================================== */
function BioHero() {
  return (
    <div className="flex flex-col items-center text-center space-y-4 max-w-md">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gold/30 bg-surface shadow-2xl">
        <Image
          src={portraitAssets.profileDesk.src}
          alt="Dr. Matheus Morari"
          fill
          priority
          sizes="112px"
          className="object-cover object-top select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
      </div>
      <div className="space-y-1">
        <h1 className="font-display font-black text-ice text-2xl tracking-tight uppercase">Matheus Morari</h1>
        <p className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">Psicólogo Sistêmico</p>
      </div>
      <div className="space-y-2 pt-2">
        <h2 className="font-display font-bold text-ice text-lg leading-snug">
          Psicologia para homens que lideram.
        </h2>
        <p className="text-muted-light text-xs leading-relaxed max-w-xs mx-auto">
          Autodomínio, sanidade e presença para homens que carregam pressão em silêncio.
        </p>
      </div>
    </div>
  );
}

/* ==================================================
   SUBCOMPONENT: MAIN BANNER
   ================================================== */
function MainBanner() {
  return (
    <Link
      href="/caminho-de-resolucao"
      className="w-full relative rounded-2xl border border-gold/20 bg-surface overflow-hidden group hover:border-gold/40 transition-all duration-300 shadow-2xl flex flex-col md:flex-row items-stretch min-h-[160px] cursor-pointer"
    >
      {/* Background Graphic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none" />
      
      {/* Background image source (cinematic feel) */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 h-full z-0 opacity-40 md:opacity-60 transition-transform duration-500 group-hover:scale-102">
        <Image
          src={portraitAssets.profileSide.src}
          alt="Diagnóstico de Sobrecarga"
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Text Info */}
      <div className="relative z-20 p-6 flex flex-col justify-between items-start space-y-4 md:max-w-[70%]">
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-gold/10 border border-gold/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-gold uppercase">
            Diagnóstico
          </span>
          <h2 className="font-display font-black text-ice text-lg sm:text-xl leading-tight tracking-wide">
            VOCÊ NÃO ESTÁ CANSADO.<br />
            VOCÊ ESTÁ CARREGANDO DEMAIS.
          </h2>
          <p className="text-muted-light text-xs">
            Faça o diagnóstico do homem sobrecarregado.
          </p>
        </div>

        <div className="flex items-center gap-1 text-gold text-xs font-semibold uppercase group-hover:translate-x-1 transition-all">
          <span>Abrir diagnóstico</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

/* ==================================================
   SUBCOMPONENT: PRODUCT GRID & CARD
   ================================================== */
interface ProductGridProps {
  products: BioProduct[];
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="flex flex-col gap-5 w-full mt-4">
      {products.map((product) => (
        <ProductBannerCard key={product.href} product={product} />
      ))}
    </div>
  );
}

interface ProductBannerCardProps {
  product: BioProduct;
}

function ProductBannerCard({ product }: ProductBannerCardProps) {
  const isCustomGraphic = product.image.toLowerCase().endsWith('.png');

  if (isCustomGraphic) {
    return (
      <Link
        href={product.href}
        className="w-full block relative overflow-hidden group hover:scale-[1.01] transition-all duration-300 rounded-2xl shadow-xl"
      >
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={360}
          className="w-full h-auto rounded-2xl border border-surface-soft/60 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
          priority={product.highlight}
        />
      </Link>
    );
  }

  return (
    <Link
      href={product.href}
      className="w-full relative rounded-2xl border border-surface-soft bg-surface/40 overflow-hidden group hover:border-gold/30 hover:bg-surface hover:shadow-2xl hover:shadow-gold/[0.01] hover:scale-[1.01] transition-all duration-300 flex items-stretch min-h-[150px] cursor-pointer"
    >
      {/* Gradient overlay to blend image on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10 pointer-events-none" />

      {/* Product Image peeking on the right */}
      <div className="absolute right-0 top-0 bottom-0 w-[40%] md:w-1/2 h-full z-0 opacity-40 md:opacity-60 transition-transform duration-500 group-hover:scale-102">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 150px, 400px"
        />
      </div>

      {/* Info details on the left */}
      <div className="relative z-20 p-6 flex flex-col justify-between items-start space-y-4 max-w-[65%] md:max-w-[70%] text-left">
        <div className="space-y-2">
          <span className="inline-block rounded-md bg-gold/10 border border-gold/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-gold uppercase">
            {product.badge}
          </span>
          <h4 className="font-display font-black text-ice text-base sm:text-lg leading-tight tracking-wide group-hover:text-gold transition-colors">
            {product.title}
          </h4>
          <p className="text-muted text-xs leading-relaxed line-clamp-2 md:line-clamp-none">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-start text-gold text-xs font-semibold uppercase gap-1 group-hover:translate-x-1 transition-all">
          <span>{product.ctaLabel}</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}



/* ==================================================
   SUBCOMPONENT: FOOTER MINIMAL
   ================================================== */
function FooterMinimal() {
  return (
    <div className="w-full text-center space-y-2 pt-6 text-[10px] text-muted tracking-wide max-w-sm">
      <p className="uppercase tracking-[0.1em]">
        Dr. Matheus Morari • {CRP} • Psicólogo Clínico
      </p>
      <p className="leading-relaxed leading-normal text-muted-dark">
        Este site e os materiais associados não substituem avaliação clínica ou acompanhamento médico/psiquiátrico especializado.
      </p>
    </div>
  );
}
