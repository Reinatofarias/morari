import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-muted hover:text-gold transition-colors">
            Início
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-surface-soft" />
            {item.href ? (
              <Link href={item.href} className="text-muted hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ice">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
