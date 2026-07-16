'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoTitle?: string;
  videoDescription?: string;
}

export function VideoPlayerModal({
  isOpen,
  onClose,
  videoSrc,
  videoTitle,
  videoDescription,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Autoplay video when opened
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay blocked or video error:', err);
      });
    }
  }, [isOpen, videoSrc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-surface-soft bg-surface shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface-soft/60 px-5 py-4">
              <div>
                <h3 className="font-display font-bold text-ice text-lg">
                  {videoTitle || 'Depoimento'}
                </h3>
                {videoDescription && (
                  <p className="text-xs text-muted-light mt-0.5">{videoDescription}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-muted hover:text-gold hover:bg-surface-soft transition-all cursor-pointer"
                aria-label="Fechar vídeo"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Content */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] overflow-hidden">
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                playsInline
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
