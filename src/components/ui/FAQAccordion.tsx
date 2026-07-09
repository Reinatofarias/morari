'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { events } from '@/lib/analytics';

interface FAQAccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
      events.faqOpen(items[index].question);
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl border transition-all duration-300 ${
            openIndex === index
              ? 'border-gold/30 bg-surface'
              : 'border-surface-soft bg-surface/50 hover:border-surface-soft/80'
          }`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-5 text-left gap-4"
            aria-expanded={openIndex === index}
          >
            <span className={`font-display font-semibold transition-colors ${
              openIndex === index ? 'text-gold' : 'text-ice'
            }`}>
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`shrink-0 text-gold transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-muted-light leading-relaxed text-sm">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
