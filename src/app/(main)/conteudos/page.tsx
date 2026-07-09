import { Metadata } from 'next';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Conteúdos',
  description: 'Artigos sobre ansiedade, esgotamento, liderança, família e autodomínio. Conteúdo profundo para homens que lideram.',
};

// Sample articles (would come from Supabase in production)
const sampleArticles = [
  { title: 'Ansiedade em homens: os sinais que você ignora', description: 'A ansiedade masculina tem rosto diferente. Ela se disfarça de produtividade, controle e irritabilidade.', category: 'Ansiedade', slug: 'ansiedade-em-homens', publishedAt: 'Em breve' },
  { title: 'Esgotamento emocional: quando o corpo avisa e você não ouve', description: 'O esgotamento não é preguiça. É o resultado de carregar mais do que qualquer homem deveria carregar sozinho.', category: 'Esgotamento', slug: 'esgotamento-emocional', publishedAt: 'Em breve' },
  { title: 'Burnout em líderes: o preço silencioso do sucesso', description: 'O burnout não escolhe hora. Ele cobra quando você menos espera — e sempre na área que mais importa.', category: 'Liderança', slug: 'burnout-em-lideres', publishedAt: 'Em breve' },
  { title: 'Padrões familiares: você está repetindo o que jurou não repetir?', description: 'Muitos homens descobrem, no auge da carreira, que estão vivendo a mesma história que juraram nunca viver.', category: 'Padrões', slug: 'padroes-familiares', publishedAt: 'Em breve' },
  { title: 'Por que homens evitam terapia (e o preço que isso cobra)', description: 'A resistência à terapia não é força. É um padrão que custa caro — no casamento, na saúde e na sanidade.', category: 'Mentalidade', slug: 'homens-evitam-terapia', publishedAt: 'Em breve' },
  { title: 'Autodomínio emocional: o que separa líderes de controladores', description: 'Controlar tudo não é liderança. É sobrevivência. Autodomínio é outra coisa — e começa por dentro.', category: 'Autodomínio', slug: 'autodominio-emocional', publishedAt: 'Em breve' },
];

export default function ConteudosPage() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader
            label="Conteúdos"
            title="Conteúdos para homens que lideram e precisam de clareza."
            highlightWord="clareza"
            description="Artigos profundos sobre ansiedade, esgotamento, liderança, família e autodomínio. Sem superficialidade."
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {sampleArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>
      <CTASection headline="Ler é o primeiro passo. Agir é o que muda." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
