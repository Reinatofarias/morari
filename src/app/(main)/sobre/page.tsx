import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CTASection } from '@/components/sections/CTASection';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { GoldenDivider } from '@/components/ui/GoldenDivider';
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
                Sou o filho mais novo de um casal oriundo do interior de São Paulo, filho de um policial e de uma professora. Cresci em uma família que valoriza profundamente a ordem, o estudo, a conduta, a disciplina e a busca constante por entregar mais do que se espera.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Como filho, busco honrar minha origem; como marido, levo meu casamento e minha mulher com total seriedade; e como pai, priorizo a educação do meu filho pelo exemplo real. Minha fé católica é o centro da minha vida, consagrado a Nossa Senhora, servindo como canal para apaziguar corações em conflito.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                No âmbito pessoal e físico, sou um homem de 1,90m, com mais de 100kg, cabelos pretos, barba e óculos. Pratico Jiu-jitsu (faixa preta), toco saxofone, gosto de cozinhar e sou neurodivergente (diagnósticos de autismo, TDAH e Altas Habilidades / Superdotação - AH/SD). Esse conjunto de características me permite pensar fora da caixa, gerenciar crises e desenhar soluções com alta conscienciosidade e assertividade técnica.
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
                No final do ensino médio, meu caminho parecia definido. Eu possuo uma forte característica de antecipação e busca de cenários, de forma que não sofria com crises vocacionais. Desde criança meu sonho era fazer Medicina Veterinária e toda a minha família concordava com a escolha de estudar na UNIR, em Rolim de Moura.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                No entanto, durante as férias do meio do ano, ocorreu uma reviravolta. Em uma tarde, enquanto confeccionava terços e rezava em meu quarto, veio um clarão em minha mente com a palavra **PSICOLOGIA**. Questionando aquela mudança repentina, senti um chamado direto: *&ldquo;Quero você cuidando de gente, dos meus filhos, e não de animais.&rdquo;*
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Compreendi aquilo como uma missão. O significado de psicologia (&ldquo;estudo da alma&rdquo;) encaixava-se perfeitamente na minha atuação de escuta, orientação e acolhimento com amigos e jovens da igreja. Assumi a responsabilidade pelo chamado. Corri — e corro até hoje — atrás da melhor técnica e do aperfeiçoamento constante para cumprir essa missão de ajudar pessoas a se encontrarem de dentro para fora.
              </p>
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* 3. Por que trabalho com homens que lideram (Pilar Familiar) */}
          <div className="bg-surface/40 p-8 sm:p-10 rounded-2xl border border-surface-soft space-y-6">
            <SectionHeader label="Foco Clínico" title="Por que trabalho com homens que lideram" />
            <div className="space-y-4 text-muted-light leading-relaxed text-sm sm:text-base">
              <p>
                Homens em posição de liderança — empresários, diretores, gestores — são treinados a vida toda para resolver problemas, tomar decisões rápidas, suportar pressão e performar. Mas raramente alguém os ensina a governar o que sentem. E quando o peso interno acumulado ultrapassa o limite físico e emocional, o colapso não avisa. Ele simplesmente cobra.
              </p>
              <p className="border-l-2 border-gold pl-4 italic text-ice">
                &ldquo;Creio que o homem é o pilar da casa, a força de sustentação, de provisão e de proteção. Só que essa força não pode ser de fachada — parecer bem visto de fora, mas por dentro oco e quebrando. A verdadeira força é construída de dentro para fora. Quando o homem cai, não cai sozinho: toda a sua família paga o preço e é danificada. Fortifico homens para que possam reparar e proteger suas famílias (esposas e filhos) e, de forma saudável, os seus negócios.&rdquo;
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
