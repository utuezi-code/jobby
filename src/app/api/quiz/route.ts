import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { quizSubmitSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = quizSubmitSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    const data = parsed.data
    const supabase = await createClient()

    const { data: attempt, error } = await supabase
      .from('quiz_attempts')
      .insert({
        lead_id: data.lead_id ?? null,
        score: data.score,
        total_questions: data.total_questions,
        answers: data.answers,
        session_token: data.session_token ?? null,
        completed: true,
      })
      .select('id')
      .single()

    if (error || !attempt) {
      console.error('Quiz insert error:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    return NextResponse.json({ success: true, attempt_id: attempt.id }, { status: 201 })
  } catch (err) {
    console.error('Quiz POST error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
