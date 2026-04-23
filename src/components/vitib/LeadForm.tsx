'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PROFIL_OPTIONS, INTERESTS } from '@/types/index'

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  structure: string
  fonction: string
  profil: string
  interests: string[]
  message: string
  consent: boolean
}

interface Errors {
  [key: string]: string
}

const STEPS = ['Identité', 'Profil', 'Intérêts']

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div style={{ marginBottom: '1.125rem' }}>
      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4375rem' }}>
        {label}{required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`vitib-input${error ? ' has-error' : ''}`}
        autoComplete={name}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}

export default function LeadForm({ quizSessionToken }: { quizSessionToken?: string }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [form, setForm] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    structure: '',
    fonction: '',
    profil: '',
    interests: [],
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})

  function setField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => { const e = { ...prev }; delete e[key]; return e })
  }

  function toggleInterest(slug: string) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(slug)
        ? prev.interests.filter((i) => i !== slug)
        : [...prev.interests, slug],
    }))
    setErrors((prev) => { const e = { ...prev }; delete e.interests; return e })
  }

  function validateStep(s: number): Errors {
    const e: Errors = {}
    if (s === 0) {
      if (!form.prenom.trim() || form.prenom.trim().length < 2)
        e.prenom = 'Le prénom doit avoir au moins 2 caractères'
      if (!form.nom.trim() || form.nom.trim().length < 2)
        e.nom = 'Le nom doit avoir au moins 2 caractères'
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRe.test(form.email)) e.email = "L'adresse email est invalide"
      if (form.telephone.trim().length < 8) e.telephone = 'Numéro de téléphone invalide'
    } else if (s === 1) {
      if (!form.profil) e.profil = 'Veuillez sélectionner un profil'
    } else if (s === 2) {
      if (form.interests.length === 0)
        e.interests = "Sélectionnez au moins un centre d'intérêt"
      if (!form.consent)
        e.consent = 'Vous devez accepter pour continuer'
    }
    return e
  }

  function next() {
    const e = validateStep(step)
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setStep((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function back() {
    setStep((s) => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    const e = validateStep(2)
    if (Object.keys(e).length > 0) { setErrors(e); return }

    setSubmitting(true)
    setServerError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quiz_session_token: quizSessionToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error || 'Une erreur est survenue. Veuillez réessayer.')
        setSubmitting(false)
        return
      }

      router.push('/merci')
    } catch {
      setServerError('Erreur de connexion. Vérifiez votre réseau et réessayez.')
      setSubmitting(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>
            Étape {step + 1} sur {STEPS.length}
          </span>
          <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{STEPS[step]}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 0: Identité */}
      {step === 0 && (
        <div>
          <h2 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
            Votre identité
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Ces informations nous permettront de vous contacter lors du lancement.
          </p>

          <InputField label="Prénom" name="prenom" value={form.prenom} onChange={(v) => setField('prenom', v)} error={errors.prenom} placeholder="Ex : Kouamé" required />
          <InputField label="Nom" name="nom" value={form.nom} onChange={(v) => setField('nom', v)} error={errors.nom} placeholder="Ex : Koné" required />
          <InputField label="Email" name="email" type="email" value={form.email} onChange={(v) => setField('email', v)} error={errors.email} placeholder="votre@email.com" required />
          <InputField label="Téléphone" name="telephone" type="tel" value={form.telephone} onChange={(v) => setField('telephone', v)} error={errors.telephone} placeholder="+225 07 00 00 00 00" required />

          <button onClick={next} className="btn-primary full" style={{ marginTop: '0.5rem' }}>
            Continuer
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Step 1: Profil */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
            Votre profil
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Aidez-nous à adapter nos programmes à votre contexte.
          </p>

          <div style={{ marginBottom: '1.125rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4375rem' }}>
              Structure / Organisation <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 400 }}>(optionnel)</span>
            </label>
            <input
              type="text"
              value={form.structure}
              onChange={(e) => setField('structure', e.target.value)}
              placeholder="Ex : BNETD, Université FHB, Orange CI…"
              className="vitib-input"
            />
          </div>

          <div style={{ marginBottom: '1.125rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4375rem' }}>
              Fonction / Profession <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 400 }}>(optionnel)</span>
            </label>
            <input
              type="text"
              value={form.fonction}
              onChange={(e) => setField('fonction', e.target.value)}
              placeholder="Ex : Ingénieur, Étudiant en Master, DG…"
              className="vitib-input"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4375rem' }}>
              Profil <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <select
              value={form.profil}
              onChange={(e) => setField('profil', e.target.value)}
              className={`vitib-select${errors.profil ? ' has-error' : ''}`}
            >
              {PROFIL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.profil && <p className="field-error">{errors.profil}</p>}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={back} className="btn-ghost" style={{ flex: '0 0 auto' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <button onClick={next} className="btn-primary" style={{ flex: 1 }}>
              Continuer
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Intérêts */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
            Vos centres d'intérêt
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.5 }}>
            Sélectionnez les domaines qui vous intéressent.
          </p>

          {/* Interest tags */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {INTERESTS.map((i) => (
                <button
                  key={i.slug}
                  type="button"
                  onClick={() => toggleInterest(i.slug)}
                  className={`interest-tag${form.interests.includes(i.slug) ? ' active' : ''}`}
                >
                  {i.label}
                </button>
              ))}
            </div>
            {errors.interests && <p className="field-error">{errors.interests}</p>}
          </div>

          {/* Message */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4375rem' }}>
              Message / Besoin spécifique <span style={{ fontSize: '0.8125rem', color: '#94a3b8', fontWeight: 400 }}>(optionnel)</span>
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setField('message', e.target.value)}
              placeholder="Décrivez votre besoin ou vos attentes vis-à-vis des programmes…"
              rows={3}
              className="vitib-input"
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>

          {/* Consent */}
          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              cursor: 'pointer',
              padding: '1rem',
              background: errors.consent ? '#fff1f2' : '#f8fafc',
              borderRadius: '0.875rem',
              border: `1.5px solid ${errors.consent ? '#fca5a5' : '#e2e8f0'}`,
            }}>
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setField('consent', e.target.checked)}
                className="vitib-checkbox"
                style={{ marginTop: '2px' }}
              />
              <span style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.55 }}>
                J'accepte d'être recontacté(e) par le VITIB concernant ses programmes, activités et initiatives liées à la formation numérique.
              </span>
            </label>
            {errors.consent && <p className="field-error">{errors.consent}</p>}
          </div>

          {serverError && (
            <div style={{
              padding: '0.875rem 1rem',
              background: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '0.75rem',
              fontSize: '0.9rem',
              color: '#991b1b',
              marginBottom: '1rem',
            }}>
              {serverError}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={back} className="btn-ghost" style={{ flex: '0 0 auto' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Retour
            </button>
            <button
              onClick={submit}
              disabled={submitting}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              {submitting ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Envoi en cours…
                </>
              ) : (
                <>
                  Valider mon inscription
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
