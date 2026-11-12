import type { Metadata } from 'next';

// Página exclusiva dos anúncios: fora do Google para não competir com o site principal.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CapturaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
