import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-6 border-b border-surface-soft/20 mb-8">
      <ol className="flex flex-wrap items-center gap-2.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-light">
        <li>
          <Link href="/" className="hover:text-gold transition-colors duration-300">
            Início
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2.5">
            <span className="text-muted/40 font-light select-none">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-gold transition-colors duration-300">
                {item.label}
              </Link>
            ) : (
              <span className="text-ice tracking-normal font-semibold normal-case select-text">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
