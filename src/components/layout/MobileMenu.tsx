'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { NAV_LINKS, ATENDIMENTOS_SUB_LINKS } from '@/lib/constants';
import { ConversionButton } from '../ui/ConversionButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [atendimentosOpen, setAtendimentosOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      setAtendimentosOpen(false); // Reset accordion on close
    }
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-background/[0.98] backdrop-blur-xl flex flex-col overflow-y-auto"
        >
          {/* Close button */}
          <div className="flex justify-end p-6 shrink-0">
            <button
              onClick={onClose}
              className="p-2 text-ice hover:text-gold transition-colors"
              aria-label="Fechar menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 py-8 px-6">
            {NAV_LINKS.map((link, i) => {
              if ('hasDropdown' in link && link.hasDropdown) {
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <button
                      onClick={() => setAtendimentosOpen(!atendimentosOpen)}
                      className="text-ice text-2xl font-display font-semibold hover:text-gold transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 ${
                          atendimentosOpen ? 'rotate-180 text-gold' : 'text-muted'
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {atendimentosOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden flex flex-col items-center gap-3.5 mt-3 bg-surface/30 p-4 rounded-xl border border-surface-soft/40 w-64"
                        >
                          {ATENDIMENTOS_SUB_LINKS.map((sublink) => (
                            <Link
                              key={sublink.href}
                              href={sublink.href}
                              onClick={onClose}
                              className="text-muted-light text-lg hover:text-gold transition-colors text-center"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-ice text-2xl font-display font-semibold hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="p-6 pb-10 shrink-0"
          >
            <ConversionButton
              label="Iniciar Caminho de Resolução"
              href="/caminho-de-resolucao"
              variant="primary"
              size="lg"
              fullWidth
              onClick={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
