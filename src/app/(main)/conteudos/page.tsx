import { Metadata } from 'next';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { CTASection } from '@/components/sections/CTASection';
import { VisualPageIntro } from '@/components/sections/VisualPageIntro';
import { articleCovers, portraitAssets } from '@/lib/visual-assets';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';

export const metadata: Metadata = {
  title: 'Conteúdos',
  description: 'Artigos sobre ansiedade, esgotamento, liderança, família e autodomínio. Conteúdo profundo para homens que lideram.',
};

// Sample articles (would come from Supabase in production)
const sampleArticles = [
  { title: 'Ansiedade em homens: os sinais que você ignora', description: 'A ansiedade masculina tem rosto diferente. Ela se disfarça de produtividade, controle e irritabilidade.', category: 'Ansiedade', slug: 'ansiedade-em-homens', coverImage: articleCovers.ansiedade.src, publishedAt: 'Em breve' },
  { title: 'Esgotamento emocional: quando o corpo avisa e você não ouve', description: 'O esgotamento não é preguiça. É o resultado de carregar mais do que qualquer homem deveria carregar sozinho.', category: 'Esgotamento', slug: 'esgotamento-emocional', coverImage: articleCovers.esgotamento.src, publishedAt: 'Em breve' },
  { title: 'Burnout em líderes: o preço silencioso do sucesso', description: 'O burnout não escolhe hora. Ele cobra quando você menos espera — e sempre na área que mais importa.', category: 'Liderança', slug: 'burnout-em-lideres', coverImage: articleCovers.lideranca.src, publishedAt: 'Em breve' },
  { title: 'Padrões familiares: você está repetindo o que jurou não repetir?', description: 'Muitos homens descobrem, no auge da carreira, que estão vivendo a mesma história que juraram nunca viver.', category: 'Padrões', slug: 'padroes-familiares', coverImage: articleCovers.padroes.src, publishedAt: 'Em breve' },
  { title: 'Por que homens evitam terapia (e o preço que isso cobra)', description: 'A resistência à terapia não é força. É um padrão que custa caro — no casamento, na saúde e na sanidade.', category: 'Mentalidade', slug: 'homens-evitam-terapia', coverImage: articleCovers.mentalidade.src, publishedAt: 'Em breve' },
  { title: 'Autodomínio emocional: o que separa líderes de controladores', description: 'Controlar tudo não é liderança. É sobrevivência. Autodomínio é outra coisa — e começa por dentro.', category: 'Autodomínio', slug: 'autodominio-emocional', coverImage: articleCovers.autodominio.src, publishedAt: 'Em breve' },
];

export default function ConteudosPage() {
  return (
    <>
      <VisualPageIntro
        label="Conteúdos"
        title="Conteúdos para homens que lideram e precisam de clareza."
        highlightWord="clareza"
        description="Artigos profundos sobre ansiedade, esgotamento, liderança, família e autodomínio. Sem superficialidade."
        asset={portraitAssets.library}
      />

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Vídeos do YouTube */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-t border-surface-soft/50 pt-16">
            <div>
              <span className="text-[10px] font-semibold text-gold tracking-wider uppercase px-2.5 py-1 rounded bg-gold/10 border border-gold/20 backdrop-blur-sm">
                YouTube
              </span>
              <h2 className="font-display font-bold text-ice text-2xl sm:text-3xl mt-3">
                Aulas e Lives no YouTube
              </h2>
              <p className="text-muted-light text-sm sm:text-base mt-2 max-w-2xl">
                Assista a conteúdos profundos sobre estresse, esgotamento, liderança e comportamento humano gravados pelo Matheus.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@MatheusMorariPsi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gold/30 bg-gold/5 text-gold text-sm font-medium hover:bg-gold/10 hover:border-gold/50 transition-all cursor-pointer whitespace-nowrap self-start md:self-end"
            >
              Acessar canal completo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'uCBQTnbPHtQ',
                title: 'LIVE#03 - Você não está estressado — você está em modo de sobrevivência há anos',
                thumbnail: 'https://img.youtube.com/vi/uCBQTnbPHtQ/hqdefault.jpg',
              },
              {
                id: 'PiYxLtOzhIw',
                title: 'LIVE#02 - Por que você é uma pessoa no trabalho e outra em casa (e o custo disso)',
                thumbnail: 'https://img.youtube.com/vi/PiYxLtOzhIw/hqdefault.jpg',
              },
              {
                id: 'Hdsp9tFaEL4',
                title: 'Personalidade: o que todo mundo deveria saber',
                thumbnail: 'https://img.youtube.com/vi/Hdsp9tFaEL4/hqdefault.jpg',
              },
            ].map((video) => (
              <div key={video.id} className="space-y-4">
                <YouTubeEmbed 
                  videoId={video.id} 
                  thumbnailUrl={video.thumbnail} 
                  title={video.title} 
                />
                <h4 className="font-display font-semibold text-ice text-sm sm:text-base line-clamp-2 px-1">
                  {video.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection headline="Ler é o primeiro passo. Agir é o que muda." primaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }} variant="dark" />
    </>
  );
}
