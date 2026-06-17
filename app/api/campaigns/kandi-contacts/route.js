import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

/** GET — liste des contacts Kandi de l'utilisateur */
export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('kandi_contacts')
      .select('id, full_name, email, role, company_name, city, country, sector, source, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      if (error.message?.includes('kandi_contacts') || error.code === '42P01') {
        return NextResponse.json({
          error:
            'Table kandi_contacts absente. Exécutez supabase-migrations/campaigns_kandi.sql dans Supabase.',
          contacts: [],
        }, { status: 500 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contacts: data ?? [] })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

/** POST — ajouter un contact */
export async function POST(request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const email = (body.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email valide requis' }, { status: 400 })
    }

    const row = {
      user_id: session.user.id,
      email,
      full_name: (body.full_name || '').trim() || null,
      role: (body.role || '').trim() || null,
      company_name: (body.company_name || '').trim() || null,
      city: (body.city || '').trim() || null,
      country: (body.country || '').trim() || null,
      sector: (body.sector || '').trim() || null,
      source: (body.source || 'manual').trim() || 'manual',
    }

    const { data, error } = await supabase
      .from('kandi_contacts')
      .insert(row)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Ce contact existe déjà pour votre compte.' }, { status: 409 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ contact: data })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
