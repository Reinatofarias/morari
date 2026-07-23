import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { LiveGoogleView } from '@/components/admin/LiveGoogleView';

export default async function GoogleTrafficPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Tráfego do Google (Ao Vivo)"
        subtitle="Métricas reais do Google Analytics 4, Search Console e Looker Studio."
      />

      <div className="px-8 mt-8">
        <LiveGoogleView />
      </div>
    </div>
  );
}
