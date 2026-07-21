'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface YouTubePlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoTitle?: string;
  videoDescription?: string;
}

export function YouTubePlayerModal({
  isOpen,
  onClose,
  videoId,
  videoTitle,
  videoDescription,
}: YouTubePlayerModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-surface-soft bg-surface shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface-soft/60 px-5 py-4">
              <div>
                <h3 className="font-display font-bold text-ice text-base sm:text-lg">
                  {videoTitle || 'Apresentação'}
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
            <div className="relative w-full aspect-video bg-black">
              {isOpen && (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={videoTitle || 'YouTube video player'}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
