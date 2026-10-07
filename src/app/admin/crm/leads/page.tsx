import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmLeadsTable } from '@/components/admin/crm/CrmLeadsTable';

export const dynamic = 'force-dynamic';

export default async function CrmLeadsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Leads" subtitle="Todos os contatos, com filtros, ações em massa e exportação." />
      <div className="px-8 mt-8">
        <CrmLeadsTable />
      </div>
    </div>
  );
}
