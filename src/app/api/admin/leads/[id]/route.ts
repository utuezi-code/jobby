import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { leadStatusSchema, adminNoteSchema } from '@/lib/validations'
import { sanitizeText } from '@/lib/utils'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data, error } = await supabase
    .from('leads')
    .select('*, lead_interests(interests(slug, label)), admin_notes(*), quiz_attempts(*)')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Lead introuvable' }, { status: 404 })
  }

  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await request.json()

  // Update status
  if (body.status !== undefined) {
    const parsed = leadStatusSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
    }

    const { error } = await supabase
      .from('leads')
      .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) return NextResponse.json({ error: 'Mise à jour impossible' }, { status: 500 })

    return NextResponse.json({ success: true })
  }

  // Add note
  if (body.note !== undefined) {
    const parsed = adminNoteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Note invalide' }, { status: 400 })
    }

    const { data: note, error } = await supabase
      .from('admin_notes')
      .insert({
        lead_id: id,
        note: sanitizeText(parsed.data.note),
        author_email: user.email ?? null,
      })
      .select()
      .single()

    if (error || !note) return NextResponse.json({ error: 'Ajout impossible' }, { status: 500 })

    return NextResponse.json({ success: true, note })
  }

  return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
}
