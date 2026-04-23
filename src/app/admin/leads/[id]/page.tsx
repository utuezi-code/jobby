import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { PROFIL_LABELS, STATUS_LABELS } from '@/types/index'
import LeadDetailClient from './client'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Fiche lead — VITIB Admin' }

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: lead, error } = await supabase
    .from('leads')
    .select(`
      *,
      lead_interests ( interests ( id, slug, label ) ),
      admin_notes ( * ),
      quiz_attempts ( id, score, total_questions, completed, created_at )
    `)
    .eq('id', id)
    .single()

  if (error || !lead) notFound()

  return (
    <LeadDetailClient
      lead={lead as any}
      userEmail={user.email ?? ''}
      formatDate={formatDate}
    />
  )
}
