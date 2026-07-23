import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const supabase = await createClient();

    // Query leads from Supabase
    const { data: leads, error, count } = await supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase leads query error:', error.message);
      return NextResponse.json({
        success: true,
        isConnected: false,
        totalLeads: 0,
        recentLeads: [],
        originBreakdown: {},
        message: 'Tabela de leads vazia ou não configurada.',
      });
    }

    const recentLeads = leads || [];
    const totalLeads = count || recentLeads.length;

    // Calculate origin breakdown
    const originBreakdown: Record<string, number> = {};
    recentLeads.forEach((lead) => {
      const orig = lead.origem || 'direto';
      originBreakdown[orig] = (originBreakdown[orig] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      isConnected: true,
      totalLeads,
      recentLeads: recentLeads.slice(0, 15), // Last 15 leads
      originBreakdown,
    });
  } catch (err) {
    console.error('Error fetching leads:', err);
    return NextResponse.json({
      success: true,
      isConnected: false,
      totalLeads: 0,
      recentLeads: [],
      originBreakdown: {},
      message: 'Supabase não conectado no momento.',
    });
  }
}
