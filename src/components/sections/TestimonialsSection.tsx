'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { VideoPlayerModal } from '../ui/VideoPlayerModal';
import { ConversionButton } from '../ui/ConversionButton';

interface TestimonialVideo {
  id: string;
  src: string;
  title: string;
  description: string;
  tags: string[];
}

const TESTIMONIALS: TestimonialVideo[] = [
  {
    id: 't3',
    src: '/assets/videos/t3.mp4',
    title: 'Superação de Esgotamento',
    description: 'Empresário do ramo comercial relata como recuperou sua disposição e sanidade sob pressão.',
    tags: ['Esgotamento', 'Pressão', 'Empresário'],
  },
  {
    id: 't4',
    src: '/assets/videos/t4.mp4',
    title: 'Presença Familiar Reconstruída',
    description: 'Relato de retorno à presença em casa, equilíbrio emocional e foco na relação familiar.',
    tags: ['Família', 'Presença', 'Equilíbrio'],
  },
  {
    id: 't5',
    src: '/assets/videos/t5.mp4',
    title: 'Controle de Ansiedade Crônica',
    description: 'Como a hipnoterapia e a terapia sistêmica ajudaram a desarmar os gatilhos mentais diários.',
    tags: ['Ansiedade', 'Hipnoterapia', 'Foco'],
  },
  {
    id: 't6',
    src: '/assets/videos/t6.mp4',
    title: 'Resolução de Padrões Repetitivos',
    description: 'Como o mapeamento das reações automáticas destravou novos níveis de liderança corporativa.',
    tags: ['Padrões', 'Liderança', 'Corporativo'],
  },
  {
    id: 't7',
    src: '/assets/videos/t7.mp4',
    title: 'Autodomínio e Tomada de Decisão',
    description: 'Gestor de alta responsabilidade conta sua evolução na gestão de equipes sem reações impulsivas.',
    tags: ['Autodomínio', 'Gestão', 'Decisões'],
  },
  {
    id: 't8',
    src: '/assets/videos/t8.mp4',
    title: 'Governo Emocional na Prática',
    description: 'Reorganização pessoal para gerenciar conflitos internos e aliviar o cansaço constante.',
    tags: ['Governo', 'Cansaço', 'Processo'],
  },
  {
    id: 't9',
    src: '/assets/videos/t9.mp4',
    title: 'Saída do Piloto Automático',
    description: 'Empresário compartilha como começou a separar a identidade pessoal do papel profissional.',
    tags: ['Identidade', 'Clareza', 'Empresário'],
  },
  {
    id: 't10',
    src: '/assets/videos/t10.mp4',
    title: 'Gestão da Ansiedade no Topo',
    description: 'Como administrar a solidão do topo e as responsabilidades sem sobrecarga mental.',
    tags: ['Ansiedade', 'Sobrecarga', 'Liderança'],
  },
  {
    id: 't11',
    src: '/assets/videos/t11.mp4',
    title: 'Restabelecimento do Governo Interno',
    description: 'História de restauração da saúde e autogoverno para liderar e viver com presença real.',
    tags: ['Governo', 'Saúde Mental', 'Presença'],
  },
];

interface TestimonialsSectionProps {
  limit?: number;
  title?: string;
  subtitle?: string;
}

export function TestimonialsSection({
  limit = 3,
  title = 'Histórias de Transformação e Governo Interno',
  subtitle = 'Relatos reais de homens que decidiram organizar a própria mente, assumir responsabilidade e recuperar a presença na liderança e em casa.',
}: TestimonialsSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<TestimonialVideo | null>(null);
  const [visibleCount, setVisibleCount] = useState(limit);

  const displayTestimonials = TESTIMONIALS.slice(0, visibleCount);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Background gradients for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.01] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          label="Depoimentos"
          title={title}
          highlightWord="Governo Interno"
          description={subtitle}
          alignment="center"
        />

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              onClick={() => setSelectedVideo(testimonial)}
            />
          ))}
        </div>

        {/* Action / Show More Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          {visibleCount < TESTIMONIALS.length && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 3, TESTIMONIALS.length))}
              className="px-6 py-3 rounded-lg border border-gold/30 bg-gold/5 text-gold text-sm font-medium hover:bg-gold/10 hover:border-gold/50 transition-all cursor-pointer flex items-center gap-2"
            >
              Ver mais relatos
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoSrc={selectedVideo?.src || ''}
        videoTitle={selectedVideo?.title}
        videoDescription={selectedVideo?.description}
      />
    </section>
  );
}

// Subcomponent: Card with hover behavior
interface TestimonialCardProps {
  testimonial: TestimonialVideo;
  index: number;
  onClick: () => void;
}

function TestimonialCard({ testimonial, onClick }: TestimonialCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleMouseEnter = () => {
    setIsPlayingPreview(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        // Safe check for browser auto-play blocks
        console.log('Hover preview blocked', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsPlayingPreview(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-surface-soft bg-surface/50 transition-all duration-300 hover:border-gold/30 hover:bg-surface"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Aspect ratio frame for video (9:16 portrait style or clean square/aspect) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/60 cursor-pointer">
        <video
          ref={videoRef}
          src={testimonial.src}
          preload="metadata"
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover / Play Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-10" />

        {/* Centered play icon & sound note */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold group-hover:bg-gold/25 group-hover:scale-110 transition-all duration-300">
            <Play size={24} className="ml-1 text-gold fill-current" />
          </div>
        </div>

        {/* Silent preview indicator */}
        {isPlayingPreview && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-gold backdrop-blur-md border border-gold/20">
            <Volume2 size={10} className="animate-pulse" />
            <span>Sem som</span>
          </div>
        )}

        {/* Bottom tags on image */}
        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5">
          {testimonial.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-soft/80 border border-surface-soft/50 px-2 py-0.5 text-[10px] font-medium text-muted-light backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Info details */}
      <div className="flex flex-col p-5 space-y-2 flex-grow">
        <h4 className="font-display font-bold text-ice group-hover:text-gold transition-colors text-base">
          {testimonial.title}
        </h4>
        <p className="text-muted-light text-xs sm:text-sm leading-relaxed flex-grow">
          {testimonial.description}
        </p>
        <div className="pt-2 flex items-center text-xs font-semibold text-gold gap-1 cursor-pointer">
          Assista ao relato completo
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
