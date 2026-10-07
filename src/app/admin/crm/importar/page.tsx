import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmImportView } from '@/components/admin/crm/CrmImportView';

export const dynamic = 'force-dynamic';

export default async function CrmImportPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Importar Lista" subtitle="Traga leads de uma planilha do Excel ou CSV direto para o funil." />
      <div className="px-8 mt-8">
        <CrmImportView />
      </div>
    </div>
  );
}
