'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Lead } from '@/types/index'
import { PROFIL_LABELS, STATUS_LABELS } from '@/types/index'

interface Stats {
  totalLeads: number
  quizParticipants: number
  byProfil: Record<string, number>
  byStatus: Record<string, number>
  topInterests: [string, number][]
}

interface Props {
  leads: Lead[]
  stats: Stats
  userEmail: string
  formatDate: (iso: string) => string
}

const STATUS_CLASS: Record<string, string> = {
  nouveau: 'badge badge-nouveau',
  a_relancer: 'badge badge-a_relancer',
  relance: 'badge badge-relance',
  partenaire_potentiel: 'badge badge-partenaire_potentiel',
  prioritaire: 'badge badge-prioritaire',
}

const INTEREST_LABELS: Record<string, string> = {
  ia: 'IA',
  cybersecurite: 'Cybersécurité',
  data: 'Data',
  entrepreneuriat: 'Entrepreneuriat',
  innovation: 'Innovation',
  formation: 'Formation',
  autre: 'Autre',
}

export default function AdminDashboardClient({ leads, stats, userEmail, formatDate }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [filterProfil, setFilterProfil] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [exportLoading, setExportLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  async function logout() {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  async function exportCSV() {
    setExportLoading(true)
    try {
      const res = await fetch('/api/admin/export')
      if (!res.ok) { setExportLoading(false); return }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `vitib-leads-${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)
    } catch {}
    setExportLoading(false)
  }

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      l.nom.toLowerCase().includes(q) ||
      l.prenom.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.structure ?? '').toLowerCase().includes(q)
    const matchProfil = !filterProfil || l.profil === filterProfil
    const matchStatus = !filterStatus || l.status === filterStatus
    return matchSearch && matchProfil && matchStatus
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{ background: '#0b1e3e', padding: '1rem 1.25rem' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #c9a227, #e5c547)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 800, color: '#0b1e3e',
            }}>V</div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>VITIB Admin</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{userEmail}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={exportCSV} disabled={exportLoading} style={{
              padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)',
              color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0.625rem', fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', transition: 'background 0.15s',
            }}>
              {exportLoading ? '…' : '⬇ Export CSV'}
            </button>
            <button onClick={logout} disabled={loggingOut} style={{
              padding: '0.5rem 1rem', background: 'transparent',
              color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '0.625rem', fontSize: '0.875rem', fontWeight: 500,
              cursor: 'pointer',
            }}>
              {loggingOut ? '…' : 'Déconnexion'}
            </button>
          </div>
        </div>
      </header>

      <main style={{ padding: '1.5rem 1.25rem' }}>
        <div className="container-wide">

          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard label="Total leads" value={stats.totalLeads} color="#1a56db" />
            <StatCard label="Quiz complétés" value={stats.quizParticipants} color="#059669" />
            <StatCard label="Prioritaires" value={stats.byStatus.prioritaire ?? 0} color="#dc2626" />
            <StatCard label="Partenaires pot." value={stats.byStatus.partenaire_potentiel ?? 0} color="#7c3aed" />
          </div>

          {/* Two-column stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {/* By profil */}
            <div className="vitib-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Par profil</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Object.entries(stats.byProfil).sort((a, b) => b[1] - a[1]).map(([profil, count]) => (
                  <div key={profil} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, fontSize: '0.875rem', color: '#475569' }}>{PROFIL_LABELS[profil] ?? profil}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', minWidth: '28px', textAlign: 'right' }}>{count}</div>
                    <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(count / stats.totalLeads) * 100}%`, background: '#1a56db', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top interests */}
            <div className="vitib-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Top intérêts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {stats.topInterests.map(([slug, count]) => (
                  <div key={slug} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ flex: 1, fontSize: '0.875rem', color: '#475569' }}>{INTEREST_LABELS[slug] ?? slug}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', minWidth: '28px', textAlign: 'right' }}>{count}</div>
                    <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${stats.topInterests[0] ? (count / stats.topInterests[0][1]) * 100 : 0}%`, background: '#c9a227', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search + filters */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un lead…"
              className="vitib-input"
              style={{ flex: '1 1 200px', maxWidth: '340px' }}
            />
            <select value={filterProfil} onChange={(e) => setFilterProfil(e.target.value)} className="vitib-select" style={{ flex: '0 0 auto', width: 'auto', minWidth: '180px' }}>
              <option value="">Tous les profils</option>
              {Object.entries(PROFIL_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="vitib-select" style={{ flex: '0 0 auto', width: 'auto', minWidth: '180px' }}>
              <option value="">Tous les statuts</option>
              {Object.entries(STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <span style={{ fontSize: '0.875rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Leads table */}
          <div className="vitib-card" style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['Nom', 'Email', 'Profil', 'Intérêts', 'Statut', 'Date', ''].map((h) => (
                      <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: '3rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                        Aucun lead trouvé.
                      </td>
                    </tr>
                  )}
                  {filtered.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = '')}>
                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{lead.prenom} {lead.nom}</div>
                        {lead.structure && <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{lead.structure}</div>}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', color: '#475569', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {lead.email}
                      </td>
                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap', color: '#475569' }}>
                        {PROFIL_LABELS[lead.profil] ?? lead.profil}
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', maxWidth: '200px' }}>
                          {(lead.lead_interests ?? []).slice(0, 3).map((li) => (
                            <span key={li.interests?.slug} style={{
                              padding: '0.2rem 0.5rem', background: '#eff6ff', color: '#1d4ed8',
                              borderRadius: '999px', fontSize: '0.75rem', fontWeight: 500,
                            }}>{INTEREST_LABELS[li.interests?.slug ?? ''] ?? li.interests?.slug}</span>
                          ))}
                          {(lead.lead_interests ?? []).length > 3 && (
                            <span style={{ padding: '0.2rem 0.5rem', background: '#f1f5f9', color: '#94a3b8', borderRadius: '999px', fontSize: '0.75rem' }}>
                              +{(lead.lead_interests ?? []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                        <span className={STATUS_CLASS[lead.status] ?? 'badge'}>{STATUS_LABELS[lead.status] ?? lead.status}</span>
                      </td>
                      <td style={{ padding: '0.875rem 1rem', color: '#94a3b8', whiteSpace: 'nowrap', fontSize: '0.8125rem' }}>
                        {formatDate(lead.created_at)}
                      </td>
                      <td style={{ padding: '0.875rem 1rem' }}>
                        <Link href={`/admin/leads/${lead.id}`} style={{
                          padding: '0.375rem 0.75rem',
                          background: '#f1f5f9',
                          color: '#475569',
                          borderRadius: '0.5rem',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          transition: 'background 0.15s',
                        }}>
                          Voir →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="vitib-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '2rem', fontWeight: 800, color, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.375rem' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>{label}</div>
    </div>
  )
}
