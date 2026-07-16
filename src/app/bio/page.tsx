import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { matheusProducts, BioProduct } from '@/data/matheusBio';
import { CRP } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Links e Vitrine | Dr. Matheus Morari',
  description: 'Acesse atendimentos, programas de desenvolvimento e materiais para homens que lideram.',
  robots: { index: false, follow: true },
};

export default function BioLandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      {/* Background Cinematic Glows */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-dark/20 rounded-full blur-[165px] pointer-events-none -z-10" />

      {/* Main Container - Framed on desktop as a premium floating glass panel */}
      <div className="max-w-lg w-full space-y-10 z-10 flex flex-col items-center bg-surface/5 backdrop-blur-lg border border-surface-soft/40 p-6 sm:p-10 rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
        
        {/* 1. HERO PRINCIPAL */}
        <BioHero />

        {/* Links Úteis Header Divider */}
        <div className="w-full flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-surface-soft/40" />
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.25em]">Links Úteis</span>
          <div className="h-px flex-1 bg-surface-soft/40" />
        </div>

        {/* 2. BANNER DE ATENDIMENTO (Destaque Principal) */}
        <div className="w-full">
          <Link
            href="/atendimentos"
            className="w-full block relative overflow-hidden group rounded-2xl border border-surface-soft/60 group-hover:border-gold/30 transition-all duration-300 shadow-xl cursor-pointer"
          >
            {/* Diagonal glass sheen reflection animation */}
            <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 z-20 pointer-events-none" />
            
            <Image
              src="/assets/images/Atendimentos.png"
              alt="Atendimentos Clínicos"
              width={800}
              height={360}
              className="w-full h-auto rounded-2xl group-hover:border-gold/40 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300"
            />
          </Link>
        </div>

        {/* 3. SEÇÃO DE PRODUTOS */}
        <div className="w-full space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-display font-bold text-ice text-lg sm:text-xl tracking-tight">Produtos e Materiais</h3>
            <p className="text-muted text-xs leading-relaxed max-w-xs mx-auto">
              Caminhos práticos para homens que querem entender o que carregam antes que o peso cobres caro demais.
            </p>
          </div>
          
          <ProductGrid products={matheusProducts} />
        </div>

        {/* 4. FOOTER MINIMAL */}
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
    <div className="w-full flex justify-center group relative overflow-hidden rounded-2xl">
      {/* Subtle glass reflection overlay on Hero header */}
      <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -skew-x-12 z-20 pointer-events-none" />
      
      <Image
        src="/assets/images/Hero.png"
        alt="Dr. Matheus Morari — Psicólogo Sistêmico"
        width={800}
        height={320}
        className="w-full h-auto select-none rounded-2xl"
        priority
      />
    </div>
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
    <div className="flex flex-col gap-5 w-full">
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
        className="w-full block relative overflow-hidden group rounded-2xl shadow-xl transition-all duration-300"
      >
        {/* Diagonal glass sheen reflection animation */}
        <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 z-20 pointer-events-none" />

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

  // Fallback layout if product is not a full-image banner
  return (
    <Link
      href={product.href}
      className="w-full relative rounded-2xl border border-surface-soft/60 bg-surface/30 backdrop-blur-md overflow-hidden group hover:border-gold/30 hover:bg-surface/50 hover:shadow-2xl hover:shadow-gold/[0.01] hover:scale-[1.01] transition-all duration-300 flex items-stretch min-h-[140px] cursor-pointer"
    >
      {/* Diagonal sheen on fallback banners */}
      <div className="absolute inset-0 w-[200%] h-full -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -skew-x-12 z-30 pointer-events-none" />

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
      <div className="relative z-20 p-5 flex flex-col justify-between items-start space-y-3 max-w-[65%] md:max-w-[70%] text-left">
        <div className="space-y-1">
          <span className="inline-block rounded-md bg-gold/10 border border-gold/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-gold uppercase">
            {product.badge}
          </span>
          <h4 className="font-display font-black text-ice text-base leading-tight tracking-wide group-hover:text-gold transition-colors">
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
    <div className="w-full text-center space-y-2 pt-4 text-[10px] text-muted tracking-wide max-w-sm">
      <p className="uppercase tracking-[0.1em]">
        Dr. Matheus Morari • {CRP} • Psicólogo Clínico
      </p>
      <p className="leading-relaxed leading-normal text-muted-dark">
        Este site e os materiais associados não substituem avaliação clínica ou acompanhamento médico/psiquiátrico especializado.
      </p>
    </div>
  );
}
