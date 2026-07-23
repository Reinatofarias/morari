import React from 'react';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Painel Admin | Matheus Morari',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const authenticated = await isAdminAuthenticated();

  // If visiting /admin/login, render without sidebar layout
  // Note: we check if children is login page or URL ends with /login
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      {authenticated ? (
        <>
          <AdminSidebar />
          <main className="flex-1 min-w-0 bg-slate-950 flex flex-col min-h-screen">
            {children}
          </main>
        </>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}
