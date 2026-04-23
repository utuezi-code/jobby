import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { leadSchema } from '@/lib/validations'
import { sanitizeText } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate with Zod
    const parsed = leadSchema.safeParse(body)
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0]
      return NextResponse.json(
        { error: firstError ?? 'Données invalides' },
        { status: 400 },
      )
    }

    const data = parsed.data
    const supabase = await createClient()

    // Duplicate check: same email in last 24h
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', data.email.toLowerCase())
      .gte('created_at', new Date(Date.now() - 86400000).toISOString())
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Cette adresse email a déjà été enregistrée. Merci pour votre intérêt !' },
        { status: 409 },
      )
    }

    // Insert lead
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        prenom: sanitizeText(data.prenom),
        nom: sanitizeText(data.nom),
        email: data.email.toLowerCase().trim(),
        telephone: sanitizeText(data.telephone),
        structure: data.structure ? sanitizeText(data.structure) : null,
        fonction: data.fonction ? sanitizeText(data.fonction) : null,
        profil: data.profil,
        message: data.message ? sanitizeText(data.message) : null,
        consent: data.consent,
        source: 'FEMUA 2026',
        status: 'nouveau',
      })
      .select('id')
      .single()

    if (insertError || !lead) {
      console.error('Lead insert error:', insertError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement. Veuillez réessayer.' },
        { status: 500 },
      )
    }

    // Insert interests
    if (data.interests.length > 0) {
      const { data: interests } = await supabase
        .from('interests')
        .select('id, slug')
        .in('slug', data.interests)

      if (interests && interests.length > 0) {
        await supabase.from('lead_interests').insert(
          interests.map((i) => ({ lead_id: lead.id, interest_id: i.id })),
        )
      }
    }

    // Link quiz attempt if session token provided
    if (data.quiz_session_token) {
      await supabase
        .from('quiz_attempts')
        .update({ lead_id: lead.id })
        .eq('session_token', data.quiz_session_token)
        .is('lead_id', null)
    }

    return NextResponse.json({ success: true, lead_id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('Lead POST error:', err)
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 },
    )
  }
}
