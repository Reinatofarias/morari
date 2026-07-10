'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS, ATENDIMENTOS_SUB_LINKS } from '@/lib/constants';
import { MobileMenu } from './MobileMenu';
import { ConversionButton } from '../ui/ConversionButton';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-surface-soft/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 lg:h-24 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative block h-14 w-48 shrink-0 overflow-visible sm:h-16 sm:w-60 lg:h-20 lg:w-72 group"
          >
            <Image
              src="/assets/branding/logo-horizontal-nobg.png"
              alt="Dr. Matheus Morari"
              width={520}
              height={293}
              className="absolute left-1/2 top-1/2 h-32 w-auto -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-40 lg:h-44"
              priority
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              if ('hasDropdown' in link && link.hasDropdown) {
                return (
                  <div key={link.href} className="relative group py-2">
                    <button className="flex items-center gap-1 text-muted-light text-sm hover:text-gold transition-colors duration-300 cursor-pointer">
                      {link.label}
                      <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 text-muted" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform scale-95 group-hover:scale-100 z-50">
                      <div className="bg-surface/95 backdrop-blur-xl border border-surface-soft/80 rounded-xl p-3 shadow-2xl shadow-black/80">
                        {ATENDIMENTOS_SUB_LINKS.map((sublink) => (
                          <Link
                            key={sublink.href}
                            href={sublink.href}
                            className="block px-4 py-2.5 rounded-lg text-sm text-muted-light hover:text-gold hover:bg-gold/[0.03] transition-all duration-200"
                          >
                            {sublink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-light text-sm hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <ConversionButton
                label="Caminho de Resolução"
                href="/caminho-de-resolucao"
                variant="primary"
                size="sm"
              />
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Abrir menu"
            >
              <span className="block w-6 h-0.5 bg-ice transition-all" />
              <span className="block w-4 h-0.5 bg-gold transition-all" />
              <span className="block w-6 h-0.5 bg-ice transition-all" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
