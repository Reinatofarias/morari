import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nome, whatsapp, email, dor_principal, identificacao, melhor_horario, origem } = body;

    // Basic validation
    if (!nome || !whatsapp || !email) {
      return NextResponse.json(
        { error: 'Nome, WhatsApp e e-mail são obrigatórios.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'E-mail inválido.' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from('leads').insert({
      nome,
      whatsapp,
      email,
      dor_principal: dor_principal || null,
      identificacao: identificacao || null,
      melhor_horario: melhor_horario || null,
      origem: origem || 'caminho-de-resolucao',
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erro ao salvar dados. Tente novamente.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Lead salvo com sucesso.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
