import { SectionHeader } from './SectionHeader';
import { EditorialImage } from '../ui/EditorialImage';
import type { VisualAsset } from '@/lib/visual-assets';

interface VisualPageIntroProps {
  label: string;
  title: string;
  highlightWord?: string;
  description: string;
  asset: VisualAsset;
}

export function VisualPageIntro({
  label,
  title,
  highlightWord,
  description,
  asset,
}: VisualPageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-blue-dark/20" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader
            label={label}
            title={title}
            highlightWord={highlightWord}
            description={description}
          />
        </div>
        <div className="lg:col-span-5">
          <EditorialImage
            asset={asset}
            aspect="aspect-[16/10] lg:aspect-[4/5]"
            priority
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>
      </div>
    </section>
  );
}

