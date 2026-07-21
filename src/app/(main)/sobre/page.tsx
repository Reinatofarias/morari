import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed';
import { portraitAssets } from '@/lib/visual-assets';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça o Dr. Matheus Morari. Psicólogo especializado em saúde emocional masculina, liderança e autodomínio.',
};

export default function SobrePage() {
  return (
    <>
      <HeroSection
        headline="Eu não ajudo homens a parecerem fortes. Eu os ajudo a voltarem a ter governo."
        highlightWord="ter governo"
        subheadline="Psicólogo clínico com formação em psicologia sistêmica e hipnoterapia. Trabalho com homens que lideram — e que precisam de mais que resiliência."
        variant="page"
        image={portraitAssets.profileDesk.src}
        imageAlt={portraitAssets.profileDesk.alt}
        imagePosition={portraitAssets.profileDesk.position}
        imagePresentation="editorial"
      />

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          
          {/* 1. Quem Sou */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-7 space-y-4">
              <SectionHeader label="Quem sou" title="Matheus Morari" />
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Responder a &ldquo;Quem sou eu&rdquo; exige olhar por múltiplos ângulos. Sou o filho mais novo de um casal oriundo do interior de São Paulo — de um pai policial e uma mãe professora. Cresci sob a influência de figuras fortes de ordem, disciplina, conduta ética e a busca constante por entregar mais do que o esperado.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Levo meus papéis com máxima seriedade: como filho, honro minhas origens; como marido, zelo pelo meu casamento; como pai, educo pelo exemplo diário. Minha fé católica e consagração a Nossa Senhora são a base da minha missão de vida, assim como a disciplina do jiu-jitsu, esporte no qual sou faixa preta.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                No aspecto prático, sou um homem de 1,90m e mais de 100kg, com barba, cabelos pretos e óculos. O fato de ser neurodivergente (diagnósticos de autismo, TDAH e AH/SD — Altas Habilidades / Superdotação) molda a minha forma de pensar: confere-me a capacidade de gerenciar crises, resolver problemas complexos com assertividade e pensar fora da caixa. Reúno dons práticos que vão da comunicação estratégica e da música (saxofone) à habilidade de lidar com momentos de forte pressão emocional, mantendo o autodomínio para apaziguar corações em conflito e promover a cura.
              </p>
            </div>
            <div className="md:col-span-5 relative flex justify-center mt-6 md:mt-0">
              <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-surface-soft relative">
                <Image
                  src={portraitAssets.profileSide.src}
                  alt={portraitAssets.profileSide.alt}
                  fill
                  className="object-cover object-top select-none"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 md:-right-4 w-20 h-20 border-2 border-gold/20 rounded-2xl -z-10" />
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* Vídeo de Apresentação */}
          <div className="space-y-8 py-4">
            <SectionHeader 
              label="Apresentação" 
              title="O que eu entrego, como atendo e o que eu espero de Você" 
              alignment="center"
            />
            <div className="max-w-3xl mx-auto w-full">
              <YouTubeEmbed 
                videoId="4IUCI-JB4nY" 
                thumbnailUrl={portraitAssets.profileDesk.src}
                title="O que eu entrego, como atendo e o que eu espero de Você"
              />
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* 2. Minha História (Vocação) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 relative flex justify-center order-last md:order-first">
              <div className="w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-surface-soft relative">
                <Image
                  src={portraitAssets.library.src}
                  alt={portraitAssets.library.alt}
                  fill
                  className="object-cover object-top select-none"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
              </div>
              <div className="absolute -top-3 -left-3 md:-left-4 w-20 h-20 border-2 border-gold/20 rounded-2xl -z-10" />
            </div>
            
            <div className="md:col-span-7 space-y-4">
              <SectionHeader label="Vocação" title="Como me tornei psicólogo" />
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Não há como compreender meu trabalho sem conhecer a história da minha escolha profissional. No terceiro ano do ensino médio, eu já me preparava para cursar Medicina Veterinária na UNIR em Rolim de Moura, seguindo um sonho de infância que contava com o apoio de toda a família.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                A reviravolta aconteceu nas férias do meio do ano. Em uma tarde, enquanto confeccionava terços e rezava em meu quarto, veio um clarão em minha mente com a palavra **Psicologia**. Sendo alguém com forte perfil de antecipação e de opiniões firmes, questionei aquela mudança súbita. A resposta que se fez presente em meu íntimo foi clara: o chamado divino era para cuidar de pessoas, *&ldquo;cuidar de gente e dos filhos de Deus&rdquo;*, e não de animais.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Aquilo ressoou imediatamente como uma missão de vida. O significado da psicologia (&ldquo;o estudo da alma&rdquo;) traduzia a inclinação que eu já tinha de orientar, ouvir e acolher os jovens da igreja e meus colegas de escola. Desde então, tomei posse dessa vocação. Busquei a melhor técnica, me responsabilizei e corro atrás do aperfeiçoamento contínuo para unir dons pessoais, rigor científico e ética clínica, ajudando pessoas a se reconstruírem de dentro para fora.
              </p>
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* 3. Por que trabalho com homens que lideram (Pilar Familiar) */}
          <div className="bg-surface/40 p-8 sm:p-10 rounded-2xl border border-surface-soft space-y-6">
            <SectionHeader label="Foco Clínico" title="Por que trabalho com homens que lideram" />
            <div className="space-y-4 text-muted-light leading-relaxed text-sm sm:text-base">
              <p>
                Homens em posição de liderança — empresários, diretores, gestores — são condicionados a resolver, decidir, aguentar pressões e performar o tempo todo. Mas raramente alguém os ensina a governar suas próprias emoções. Quando o peso interno acumulado ultrapassa os limites suportáveis, o colapso não avisa; ele simplesmente cobra o seu preço.
              </p>
              <p className="border-l-2 border-gold pl-4 italic text-ice bg-background/30 py-4 pr-4">
                &ldquo;Creio que o homem é o pilar da casa, a força de sustentação, de provisão e proteção. Só que essa força não pode ser de fachada — parecer bem visto de fora, mas por dentro oco e quebrando. A verdadeira força é construída de dentro para fora. Quando o homem cai, não cai sozinho: toda a sua família paga o preço e é danificada. Fortifico homens para buscar reparar e proteger suas famílias (filhos e esposas) e também os seus negócios.&rdquo;
              </p>
              <p>
                Por trás da fachada de controle inabalável, existe alguém que precisa de um espaço seguro onde não precise performar ou fingir. Onde possa ser honesto com as próprias falhas e dores, para então começar a reconstruir com fundamento real.
              </p>
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* 4. Princípios */}
          <div>
            <SectionHeader label="Princípios" title="O que eu acredito" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Verdade', desc: 'O trabalho começa quando o homem para de mentir para si mesmo e assume a realidade.' },
                { title: 'Responsabilidade', desc: 'Você não é vítima das circunstâncias. Você é o agente de mudança de sua própria história.' },
                { title: 'Profundidade', desc: 'Não existem atalhos ou fórmulas mágicas para a saúde emocional. Existe processo e técnica.' },
                { title: 'Governo', desc: 'Liderar equipes, empresas e famílias começa obrigatoriamente por governar a si mesmo.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-surface border border-surface-soft">
                  <h3 className="font-display font-semibold text-gold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CTASection
        headline="Se a sua fachada de força começou a cobrar o preço em casa ou no negócio, converse comigo."
        primaryCTA={{ label: 'Conhecer atendimentos', href: '/atendimentos' }}
        secondaryCTA={{ label: 'Iniciar Caminho de Resolução', href: '/caminho-de-resolucao' }}
        variant="dark"
      />
    </>
  );
}
