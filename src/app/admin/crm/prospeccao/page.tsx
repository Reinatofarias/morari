import React from 'react';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CrmProspectingView } from '@/components/admin/crm/CrmProspectingView';

export const dynamic = 'force-dynamic';

export default async function CrmProspectingPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="flex-1 pb-12">
      <AdminHeader title="CRM · Prospecção" subtitle="Sua fila de contatos do dia: follow-ups atrasados, de hoje e leads ainda não abordados." />
      <div className="px-8 mt-8">
        <CrmProspectingView />
      </div>
    </div>
  );
}
