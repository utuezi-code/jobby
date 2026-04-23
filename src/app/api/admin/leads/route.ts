import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') ?? ''
  const profil = searchParams.get('profil') ?? ''
  const status = searchParams.get('status') ?? ''
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '50', 10)
  const offset = (page - 1) * limit

  let query = supabase
    .from('leads')
    .select('*, lead_interests(interests(slug, label))', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (profil) query = query.eq('profil', profil)
  if (status) query = query.eq('status', status)
  if (search) {
    query = query.or(
      `nom.ilike.%${search}%,prenom.ilike.%${search}%,email.ilike.%${search}%`,
    )
  }

  const { data, count, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Erreur de lecture' }, { status: 500 })
  }

  return NextResponse.json({ leads: data, total: count, page, limit })
}
