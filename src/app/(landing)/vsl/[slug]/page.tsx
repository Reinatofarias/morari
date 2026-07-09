export default function VSLPage() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-3xl text-center space-y-8">
        <p className="text-gold text-xs uppercase tracking-[0.2em]">Video Sales Letter</p>
        <h1 className="font-display font-bold text-ice text-4xl">Estrutura pronta para vídeo de vendas.</h1>
        <div className="aspect-video bg-surface rounded-2xl border border-surface-soft flex items-center justify-center">
          <span className="text-muted">Player de vídeo aqui</span>
        </div>
        <p className="text-muted-light leading-relaxed">Insira seu vídeo e CTA abaixo. Layout minimalista sem distrações.</p>
      </div>
    </section>
  );
}
