import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { LiveDashboardView } from '@/components/admin/LiveDashboardView';

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader
        title="Visão Geral do Painel (Dados Reais)"
        subtitle="Métricas ao vivo integradas ao banco Supabase e Google PageSpeed API."
      />

      <div className="px-8 mt-8">
        <LiveDashboardView />
      </div>
    </div>
  );
}
