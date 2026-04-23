import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*, lead_interests(interests(slug, label))')
    .order('created_at', { ascending: false })

  if (error || !leads) {
    return NextResponse.json({ error: 'Erreur export' }, { status: 500 })
  }

  const rows = leads.map((l: any) => {
    const interestSlugs = (l.lead_interests ?? [])
      .map((li: any) => li.interests?.slug ?? '')
      .filter(Boolean)
      .join('|')

    return {
      id: l.id,
      prenom: l.prenom,
      nom: l.nom,
      email: l.email,
      telephone: l.telephone,
      structure: l.structure ?? '',
      fonction: l.fonction ?? '',
      profil: l.profil,
      interets: interestSlugs,
      message: l.message ?? '',
      statut: l.status,
      source: l.source,
      date: l.created_at,
    }
  })

  const columns = [
    'id', 'prenom', 'nom', 'email', 'telephone',
    'structure', 'fonction', 'profil', 'interets',
    'message', 'statut', 'source', 'date',
  ]

  const header = columns.join(',')
  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const val = (row as Record<string, unknown>)[col]
          if (val === null || val === undefined) return ''
          const str = String(val).replace(/"/g, '""')
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str}"`
            : str
        })
        .join(','),
    )
    .join('\n')

  const csv = `${header}\n${body}`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="vitib-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
