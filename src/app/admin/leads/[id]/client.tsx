'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/types/index'
import { PROFIL_LABELS, STATUS_LABELS } from '@/types/index'

const STATUS_OPTIONS = [
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'a_relancer', label: 'À relancer' },
  { value: 'relance', label: 'Relancé' },
  { value: 'partenaire_potentiel', label: 'Partenaire potentiel' },
  { value: 'prioritaire', label: 'Prioritaire' },
]

const STATUS_CLASS: Record<string, string> = {
  nouveau: 'badge badge-nouveau',
  a_relancer: 'badge badge-a_relancer',
  relance: 'badge badge-relance',
  partenaire_potentiel: 'badge badge-partenaire_potentiel',
  prioritaire: 'badge badge-prioritaire',
}

const INTEREST_LABELS: Record<string, string> = {
  ia: 'Intelligence Artificielle',
  cybersecurite: 'Cybersécurité',
  data: 'Data & Analytique',
  entrepreneuriat: 'Entrepreneuriat',
  innovation: 'Innovation',
  formation: 'Formation continue',
  autre: 'Autre',
}

interface Props {
  lead: Lead
  userEmail: string
  formatDate: (iso: string) => string
}

export default function LeadDetailClient({ lead, userEmail, formatDate }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState(lead.status)
  const [notes, setNotes] = useState(lead.admin_notes ?? [])
  const [newNote, setNewNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [savingNote, setSavingNote] = useState(false)
  const [statusSaved, setStatusSaved] = useState(false)
  const [error, setError] = useState('')

  async function updateStatus(newStatus: string) {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      setStatus(newStatus as any)
      setStatusSaved(true)
      setTimeout(() => setStatusSaved(false), 2000)
    } catch {
      setError('Impossible de mettre à jour le statut.')
    } finally {
      setSaving(false)
    }
  }

  async function addNote() {
    if (!newNote.trim()) return
    setSavingNote(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNote.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error()
      if (data.note) {
        setNotes((prev) => [data.note, ...prev])
        setNewNote('')
      }
    } catch {
      setError('Impossible d\'ajouter la note.')
    } finally {
      setSavingNote(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{ background: '#0b1e3e', padding: '1rem 1.25rem' }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin/dashboard" style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              color: 'rgba(255,255,255,0.65)', fontSize: '0.875rem',
              textDecoration: 'none', padding: '0.375rem 0.75rem',
              borderRadius: '0.5rem', background: 'rgba(255,255,255,0.08)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Dashboard
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <span style={{ fontSize: '0.9375rem', color: '#fff', fontWeight: 600 }}>
              {lead.prenom} {lead.nom}
            </span>
          </div>
          <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>{userEmail}</span>
        </div>
      </header>

      <main style={{ padding: '1.5rem 1.25rem' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', alignItems: 'start' }}>

            {/* Lead info */}
            <div>
              <div className="vitib-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <h1 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                      {lead.prenom} {lead.nom}
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                  <span className={STATUS_CLASS[status] ?? 'badge'}>{STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <InfoRow label="Email" value={lead.email} />
                  <InfoRow label="Téléphone" value={lead.telephone} />
                  {lead.structure && <InfoRow label="Structure" value={lead.structure} />}
                  {lead.fonction && <InfoRow label="Fonction" value={lead.fonction} />}
                  <InfoRow label="Profil" value={PROFIL_LABELS[lead.profil] ?? lead.profil} />
                  <InfoRow label="Source" value={lead.source} />
                </div>

                {lead.message && (
                  <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Message</p>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.55 }}>{lead.message}</p>
                  </div>
                )}
              </div>

              {/* Interests */}
              <div className="vitib-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.875rem' }}>
                  Centres d'intérêt
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {(lead.lead_interests ?? []).map((li) => (
                    <span key={li.interests?.slug} style={{
                      padding: '0.4375rem 0.875rem', background: '#eff6ff', color: '#1d4ed8',
                      borderRadius: '999px', fontSize: '0.875rem', fontWeight: 500,
                      border: '1px solid #bfdbfe',
                    }}>
                      {INTEREST_LABELS[li.interests?.slug ?? ''] ?? li.interests?.slug}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quiz */}
              {(lead.quiz_attempts ?? []).length > 0 && (
                <div className="vitib-card" style={{ padding: '1.25rem' }}>
                  <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.875rem' }}>Quiz IA</h2>
                  {(lead.quiz_attempts ?? []).map((qa) => (
                    <div key={qa.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', color: '#475569' }}>Score :</span>
                      <span style={{ fontSize: '1.125rem', fontWeight: 800, color: '#1a56db' }}>
                        {qa.score} / {qa.total_questions}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status + Notes */}
            <div>
              {/* Status update */}
              <div className="vitib-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.875rem' }}>
                  Statut du lead
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateStatus(opt.value)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '0.75rem',
                        border: `1.5px solid ${status === opt.value ? '#1a56db' : '#e2e8f0'}`,
                        background: status === opt.value ? '#eff6ff' : '#fff',
                        color: status === opt.value ? '#1d4ed8' : '#475569',
                        fontSize: '0.9rem',
                        fontWeight: status === opt.value ? 700 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      {opt.label}
                      {status === opt.value && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                {saving && <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>Enregistrement…</p>}
                {statusSaved && <p style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 600 }}>✓ Statut mis à jour</p>}
              </div>

              {/* Notes */}
              <div className="vitib-card" style={{ padding: '1.25rem' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.875rem' }}>
                  Notes internes
                </h2>

                {/* Add note */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Ajouter une note…"
                    rows={3}
                    className="vitib-input"
                    style={{ resize: 'vertical', marginBottom: '0.75rem' }}
                  />
                  <button
                    onClick={addNote}
                    disabled={savingNote || !newNote.trim()}
                    className="btn-primary full"
                    style={{ fontSize: '0.9375rem' }}
                  >
                    {savingNote ? 'Ajout…' : '+ Ajouter la note'}
                  </button>
                </div>

                {error && (
                  <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '0.625rem', fontSize: '0.875rem', color: '#991b1b', marginBottom: '1rem' }}>
                    {error}
                  </div>
                )}

                {/* Notes list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {notes.length === 0 && (
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', textAlign: 'center', padding: '1rem 0' }}>
                      Aucune note pour ce lead.
                    </p>
                  )}
                  {notes.map((note) => (
                    <div key={note.id} style={{
                      padding: '0.875rem',
                      background: '#f8fafc',
                      borderRadius: '0.75rem',
                      border: '1px solid #e2e8f0',
                    }}>
                      <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.55, marginBottom: '0.375rem' }}>{note.note}</p>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {formatDate(note.created_at)}
                        {note.author_email && ` · ${note.author_email}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8', minWidth: '90px', flexShrink: 0, paddingTop: '1px' }}>{label}</span>
      <span style={{ fontSize: '0.9rem', color: '#334155', wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}
