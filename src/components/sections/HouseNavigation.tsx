'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerItem } from '@/lib/animations';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { roomVisuals } from '@/lib/visual-assets';

interface HouseRoom {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface HouseNavigationProps {
  rooms: readonly HouseRoom[] | HouseRoom[];
}

export function HouseNavigation({ rooms }: HouseNavigationProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room, index) => {
        const icons = LucideIcons as unknown as Record<string, LucideIcon>;
        const IconComponent = icons[room.icon] || LucideIcons.ArrowRight;
        
        return (
          <motion.div
            key={room.href}
            variants={staggerItem}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={room.href}
              className="group relative block min-h-[180px] overflow-hidden rounded-lg bg-surface border border-surface-soft hover:border-gold/30 transition-all duration-300"
            >
              {roomVisuals[room.href] && (
                <Image
                  src={roomVisuals[room.href].src}
                  alt={roomVisuals[room.href].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover opacity-25 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-35"
                  style={{ objectPosition: roomVisuals[room.href].position ?? 'center' }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-surface/90 to-surface/30" />
              <div className="relative flex h-full min-h-[180px] items-end gap-4 p-6">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <IconComponent size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-ice text-lg group-hover:text-gold transition-colors">
                    {room.title}
                  </h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
