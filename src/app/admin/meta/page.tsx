import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { LiveMetaView } from '@/components/admin/LiveMetaView';

export default async function MetaTrafficPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Relatório de Tráfego do Meta (Instagram & Facebook Ao Vivo)"
        subtitle="Métricas reais do Meta Pixel, eventos de conversão e relatórios de anúncios."
      />

      <div className="px-8 mt-8">
        <LiveMetaView />
      </div>
    </div>
  );
}
