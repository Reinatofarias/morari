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
                Quem sou eu sou uma pergunta comum, mas responder não é simples, e podemos ter vários óticas e áreas diferente para essa resposta. Sou o filho mais novo de um casal ainda casado, oriundo do interior de São Paulo, filho de um policial e uma professora, em uma família que valoriza ordem, estudo, conduta e disciplina, busca por resolução e entregar mais do que se espera. Também sou neto de uma policial e dona de casa, e de um policial/advogado e costureira/professora, influenciado por essas figuras em minha personalidade.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Assumo papéis importantes: como filho, busco honrar minha origem; como marido, levo a sério meu casamento e minha mulher; como pai, priorizo a educação pelo exemplo. Profissionalmente, sou apaixonado, buscando me destacar e ajudar os outros. Sou um amigo presente, embora às vezes não envie muitas mensagens. A fé católica é central em minha vida, assim como minha prática de jiu-jitsu(Faixa preta) e meus valores de família, honra, estudo, honestidade, religiosidade e integridade de uma entrega resolutiva.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Meu comportamento é ser comunicativo, paciente, assertivo, ativo e bem equilibrado emocionalmente. Temperamento sanguíneo, perfil dominante estável, personalidade de baixo neuroticismo e alta conscienciosidade. Neurodivergente autista, TDAH, AH/SD
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Fisicamente, sou um homem branco de 1,90m, 100+kg, com barba, cabelos pretos e óculos. Possuo habilidades como cozinhar, lutar, comunicar-me, tocar saxofone, resolver problemas, lidar com crise, pensar fora da caixa.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                No entanto, reconheço que tenho meu lado ruim, conhecido apenas por aqueles que convivem comigo. Mas, acima de tudo, sou um filho de Deus, consagrado a Nossa Senhora, e minha missão é ser um canal de amor para apaziguar corações em conflito e promover a cura.
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
                Não sei você mais eu gosto de história, e vou revelar agora a minha história que me fez chegar aqui, o que me fez escolher psicologia. E me torno o profissional que sou hoje, e essa história norteia todo a minha atuação. Presta atenção.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Eu estava no 3° ano do ensino médio, estudando na escola de manhã e a tarde.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                No início do ano, tudo estava definido, como sempre, tenho a característica de antecipação, de buscar vivenciar as situações antes que elas ocorram, por isso não estava em crise vocacional, sofrendo para escolher qual curso fazer.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Seria aquele que desde criança já dizia, que seria e brincava como tal, seria medicina veterinária. Como morava em Rolim seria na UNIR. E todos na família já sabiam e concordavam.
              </p>
              <p className="font-display font-semibold text-gold text-base sm:text-lg">
                Porém ocorreu uma reviravolta
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Durante o período de férias no meio do ano, tudo mudou.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Em um dia de tarde, enquanto estava confeccionando terços, e ao mesmo tempo rezando em meu quarto, me veio como um estalar de dedos, um &ldquo;clarão&rdquo;, a palavra **PSIOCOLOGIA**, como se alguém falace comigo, na mesma hora tive dúvida, pois não gosto de ficar mudando de opinião e dificilmente volto atrás de algo que já disse, ainda mais se disse pra todo mundo.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Me questionei, mas psicologia? E fui rebatido na mesma hora, Deus respondeu, quero você cuidando de gente, dos meus filhos, e não de animais.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Com isso entendi que seria uma missão, e isso me trouxe um conforto e aceitação imediata, como se sempre tivesse sido minha opção. E tudo fez sentido, pois a palavra psicologia significa estudo da alma. Isso também fortaleceu meu momento atual que estava muito ativo na igreja com os jovens e amigos próximos da escola os quais muitos eu orientava e acolhia suas questões, e me sentia no dever de ajuda-los a serem melhores.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                A partir desse dia iniciou minha formação, pois eu deveria ser o melhor possível, dar tudo de mim, pois foi um chamado de Deus, então comecei a estudar sobre psicologia e me integrar sobre esse universo, para honrar minha missão e saber unir todos os dons que Deus me deu, com a ciência e o profissional.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Me inscrevi para participar de um evento acadêmico, que o curso de psicologia, que tinha cidade está organizando, fui me impetiquei e tudo ficou calado. Já comecei a estuda o que eu podia e conseguia referente a essas áreas de atuação.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base">
                Muitos estranharam, alguns não apoiaram de início, mas continuei mesmo assim pois essa vocação foi plantada e cultivado, por Deus e assim continua. Tomei posse, me responsabilizei e corri e corro até hoje atrás da técnica e de todo aperfeiçoamento possível, para ser o melhor.
              </p>
              <p className="text-muted-light leading-relaxed text-sm sm:text-base font-medium text-ice">
                E hoje posso ajudar as pessoas a ter uma vida melhor e a elevar suas potencialidades, a se encontrarem consigo, tendo mais saúde, qualidade de vida, melhores relacionamentos, sendo mais plenas, capacitadas e felizes, como psicólogo clínico, prestando serviço de psicoterapia e de muitas outras formas, de atuar, ajudando as pessoas a transformas suas vidas de dentro para fora.
              </p>
            </div>
          </div>

          <GoldenDivider width="100%" alignment="center" animated={false} />

          {/* 3. Por que trabalho com homens que lideram (Pilar Familiar) */}
          <div className="bg-surface/40 p-8 sm:p-10 rounded-2xl border border-surface-soft space-y-6">
            <SectionHeader label="Foco Clínico" title="Por que trabalho com homens que lideram" />
            <div className="space-y-4 text-muted-light leading-relaxed text-sm sm:text-base">
              <p>
                Porque homens em posição de liderança são treinados para resolver, decidir, aguentar e performar. Mas ninguém os ensina a governar o que sentem. E quando o peso interno ultrapassa a capacidade de suportar, o colapso não avisa. Ele simplesmente cobra.
              </p>
              <p>
                Eu escolhi trabalhar com esses homens porque sei que, por trás da fachada de controle, existe alguém que precisa de um espaço onde não precise performar. Onde possa ser honesto. Onde possa começar a reconstruir.
              </p>
              <p className="border-l-2 border-gold pl-4 italic text-ice">
                [Creio que o homem é  o pilar da casa, é a força de  sustentação, de provisão e proteção, só que essa força não pode ser de fachada, parecer bem visto de fora, mas por dentro oco quebrando, a verdadeira força é de dentro para fora, quando o homem cai, não é só ele mas  toda sua família paga  o preço e é danificada, fortifico homens para buscar reparar e proteger famílias (filhos e esposas) e também o negócio)]
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
