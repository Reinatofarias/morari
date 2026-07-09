export default function ProductSlugPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-gold text-xs uppercase tracking-[0.2em] font-medium mb-4">Produto</p>
        <h1 className="font-display font-bold text-ice text-3xl mb-6">Produto em preparação</h1>
        <p className="text-muted-light leading-relaxed mb-8">Este produto está sendo desenvolvido. Em breve estará disponível.</p>
        <a href="/produtos" className="text-gold text-sm font-medium underline underline-offset-4">← Voltar para produtos</a>
      </div>
    </section>
  );
}
