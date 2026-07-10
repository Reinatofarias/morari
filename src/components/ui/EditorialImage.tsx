import Image from 'next/image';
import type { VisualAsset } from '@/lib/visual-assets';

interface EditorialImageProps {
  asset: VisualAsset;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}

export function EditorialImage({
  asset,
  aspect = 'aspect-[4/5]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 420px',
  className = '',
  caption,
}: EditorialImageProps) {
  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden rounded-lg border border-surface-soft bg-surface ${aspect}`}>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          loading={priority ? 'eager' : undefined}
          sizes={sizes}
          className="object-cover select-none"
          style={{ objectPosition: asset.position ?? 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-gold/10" />
      </div>
      <div className="absolute -bottom-3 -right-3 -z-10 h-20 w-20 rounded-lg border-2 border-gold/20" />
      {caption && (
        <figcaption className="mt-4 text-xs leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
