import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmStagesEditor } from '@/components/admin/crm/CrmStagesEditor';

export const dynamic = 'force-dynamic';

export default async function CrmStagesPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Etapas do Funil" subtitle="Defina as fases pelas quais cada lead passa." />
      <div className="px-8 mt-8">
        <CrmStagesEditor />
      </div>
    </div>
  );
}
