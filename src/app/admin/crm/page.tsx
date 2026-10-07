import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmPipelineView } from '@/components/admin/crm/CrmPipelineView';

export const dynamic = 'force-dynamic';

export default async function CrmPipelinePage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Funil de Vendas" subtitle="Arraste os leads entre as etapas. Clique no nome para abrir a ficha completa." />
      <div className="px-8 mt-8">
        <CrmPipelineView />
      </div>
    </div>
  );
}
