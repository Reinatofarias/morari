import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmLeadDetail } from '@/components/admin/crm/CrmLeadDetail';

export const dynamic = 'force-dynamic';

export default async function CrmLeadPage({ params }: PageProps<'/admin/crm/leads/[id]'>) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
  const { id } = await params;

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Ficha do Lead" subtitle="Dados, etapa do funil e histórico de contatos." />
      <div className="px-8 mt-8">
        <CrmLeadDetail id={id} />
      </div>
    </div>
  );
}
