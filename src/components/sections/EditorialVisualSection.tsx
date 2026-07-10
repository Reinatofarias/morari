import { SectionHeader } from './SectionHeader';
import { EditorialImage } from '../ui/EditorialImage';
import type { VisualAsset } from '@/lib/visual-assets';

interface EditorialVisualSectionProps {
  label: string;
  title: string;
  highlightWord?: string;
  description?: string;
  asset: VisualAsset;
  children?: React.ReactNode;
  reverse?: boolean;
}

export function EditorialVisualSection({
  label,
  title,
  highlightWord,
  description,
  asset,
  children,
  reverse = false,
}: EditorialVisualSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-14">
        <div className={reverse ? 'lg:order-2 lg:col-span-7' : 'lg:col-span-7'}>
          <SectionHeader
            label={label}
            title={title}
            highlightWord={highlightWord}
            description={description}
          />
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className={reverse ? 'lg:order-1 lg:col-span-5' : 'lg:col-span-5'}>
          <EditorialImage asset={asset} aspect="aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 420px" />
        </div>
      </div>
    </section>
  );
}

