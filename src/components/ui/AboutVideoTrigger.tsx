'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { YouTubePlayerModal } from './YouTubePlayerModal';

interface AboutVideoTriggerProps {
  imageSrc: string;
  imageAlt: string;
  videoId: string;
  videoTitle: string;
}

export function AboutVideoTrigger({
  imageSrc,
  imageAlt,
  videoId,
  videoTitle,
}: AboutVideoTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-surface-soft bg-black cursor-pointer group shadow-xl"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top select-none transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 450px"
        />
        
        {/* Dark gold overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold group-hover:bg-gold/25 group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play size={24} className="ml-1 text-gold fill-current" />
          </div>
          <span className="text-[11px] font-semibold tracking-wider text-ice bg-background/60 backdrop-blur-sm px-3 py-1 rounded-full border border-surface-soft opacity-90 group-hover:opacity-100 transition-opacity">
            Assistir Apresentação
          </span>
        </div>
      </div>
      
      {/* Background Accent Frame */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-2xl -z-10 group-hover:border-gold/40 transition-colors duration-300" />

      {/* YouTube Modal */}
      <YouTubePlayerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoId={videoId}
        videoTitle={videoTitle}
      />
    </>
  );
}
