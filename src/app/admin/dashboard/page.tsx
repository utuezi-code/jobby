import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import type { Lead } from '@/types/index'
import { PROFIL_LABELS, STATUS_LABELS } from '@/types/index'
import AdminDashboardClient from './client'

export const metadata = { title: 'Tableau de bord — VITIB Admin' }

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const [
    { data: leads, error: leadsError },
    { count: quizCount },
  ] = await Promise.all([
    supabase
      .from('leads')
      .select('*, lead_interests(interests(slug, label))')
      .order('created_at', { ascending: false })
      .limit(200),
    supabase
      .from('quiz_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('completed', true),
  ])

  if (leadsError) {
    console.error('Dashboard fetch error:', leadsError)
  }

  const allLeads: Lead[] = (leads ?? []) as unknown as Lead[]

  // Stats
  const totalLeads = allLeads.length
  const byProfil = allLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.profil] = (acc[l.profil] ?? 0) + 1
    return acc
  }, {})
  const byStatus = allLeads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})

  const interestCounts: Record<string, number> = {}
  allLeads.forEach((l) => {
    (l.lead_interests ?? []).forEach((li) => {
      const slug = li.interests?.slug ?? ''
      if (slug) interestCounts[slug] = (interestCounts[slug] ?? 0) + 1
    })
  })

  const topInterests = Object.entries(interestCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const stats = {
    totalLeads,
    quizParticipants: quizCount ?? 0,
    byProfil,
    byStatus,
    topInterests,
  }

  return (
    <AdminDashboardClient
      leads={allLeads}
      stats={stats}
      userEmail={user.email ?? ''}
      formatDate={formatDate}
    />
  )
}
