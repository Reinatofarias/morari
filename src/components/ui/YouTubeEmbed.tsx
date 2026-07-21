'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface YouTubeEmbedProps {
  videoId: string;
  thumbnailUrl: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, thumbnailUrl, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-surface-soft bg-black shadow-2xl group">
      {!isPlaying ? (
        <div 
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title || 'Miniatura do vídeo'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/25 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Video Title (Overlay) */}
          {title && (
            <div className="absolute top-6 left-6 right-6 text-left z-10">
              <span className="text-[10px] font-semibold text-gold tracking-wider uppercase px-2.5 py-1 rounded bg-gold/10 border border-gold/20 backdrop-blur-sm">
                Apresentação
              </span>
              <h4 className="font-display font-bold text-ice text-lg sm:text-xl md:text-2xl mt-3 drop-shadow-md">
                {title}
              </h4>
            </div>
          )}

          {/* Premium Glowing Play Button */}
          <div className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold backdrop-blur-sm shadow-xl shadow-background/50 group-hover:border-gold group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
            {/* Animated Pulse Rings */}
            <div className="absolute -inset-2 rounded-full border border-gold/10 animate-ping opacity-75 group-hover:border-gold/20" />
            <Play size={28} className="ml-1 text-gold fill-current md:h-8 md:w-8" />
          </div>

          {/* Bottom Info bar */}
          <div className="absolute bottom-6 left-6 z-10 text-xs text-muted-light font-medium flex items-center gap-1">
            Clique para assistir a esta introdução
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title || 'YouTube video player'}
          className="absolute inset-0 w-full h-full border-0 z-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
