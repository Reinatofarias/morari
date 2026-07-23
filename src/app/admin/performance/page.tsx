import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { LivePerformanceView } from '@/components/admin/LivePerformanceView';

export default async function SitePerformancePage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Performance do Site (Google PageSpeed API Ao Vivo)"
        subtitle="Métricas reais de velocidade, Core Web Vitals e latência consultadas do Google."
      />

      <div className="px-8 mt-8">
        <LivePerformanceView />
      </div>
    </div>
  );
}
