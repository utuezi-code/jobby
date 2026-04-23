'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { QUIZ_QUESTIONS } from '@/types/index'
import { generateSessionToken } from '@/lib/utils'

type GameState = 'welcome' | 'playing' | 'answered' | 'results'

interface Answer {
  question_id: number
  answer: 'mythe' | 'realite'
  correct: boolean
}

export default function QuizGame() {
  const router = useRouter()
  const [state, setState] = useState<GameState>('welcome')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selected, setSelected] = useState<'mythe' | 'realite' | null>(null)
  const [sessionToken] = useState(generateSessionToken)
  const [saving, setSaving] = useState(false)

  const question = QUIZ_QUESTIONS[current]
  const score = answers.filter((a) => a.correct).length
  const isCorrect = selected !== null && selected === question?.answer

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('quiz_session_token', sessionToken)
    }
  }, [sessionToken])

  function answer(choice: 'mythe' | 'realite') {
    if (state !== 'playing') return
    const correct = choice === question.answer
    setSelected(choice)
    setAnswers((prev) => [
      ...prev,
      { question_id: question.id, answer: choice, correct },
    ])
    setState('answered')
  }

  async function next() {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setState('playing')
    } else {
      setState('results')
      setSaving(true)
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            score: score + (isCorrect ? 1 : 0),
            total_questions: QUIZ_QUESTIONS.length,
            answers: [
              ...answers,
              { question_id: question.id, answer: selected, correct: isCorrect },
            ],
            session_token: sessionToken,
          }),
        })
      } catch {
        // Non-blocking
      } finally {
        setSaving(false)
      }
    }
  }

  function goToForm() {
    router.push(`/interet`)
  }

  const finalScore = answers.filter((a) => a.correct).length
  const pct = Math.round((finalScore / QUIZ_QUESTIONS.length) * 100)

  /* ── Welcome ── */
  if (state === 'welcome') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0b1e3e, #1b2d50)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 1.5rem',
        }}>🧠</div>

        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Mythe ou Réalité ?
        </h2>
        <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
          5 affirmations sur l'Intelligence Artificielle. Avez-vous les bons réflexes ?
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          {[['5', 'questions'], ['2 min', 'environ'], ['Score', 'immédiat']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0b1e3e' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        <button onClick={() => setState('playing')} className="btn-primary full">
          Commencer le quiz
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }

  /* ── Results ── */
  if (state === 'results') {
    const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📚' : '🌱'
    const message =
      pct >= 80
        ? 'Excellent ! Vous avez de solides connaissances en IA.'
        : pct >= 60
        ? 'Très bien ! Vous avez de bonnes bases à approfondir.'
        : pct >= 40
        ? 'Pas mal ! Il reste encore de belles découvertes à faire.'
        : "C'est un début ! L'IA n'a pas encore tous ses secrets pour vous."

    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{emoji}</div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          {finalScore} / {QUIZ_QUESTIONS.length}
        </h2>
        <p style={{ fontSize: '0.9375rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {message}
        </p>

        {/* Score bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="progress-track" style={{ height: '8px', marginBottom: '0.5rem' }}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span style={{ fontSize: '0.875rem', color: '#1a56db', fontWeight: 600 }}>{pct}% de bonnes réponses</span>
        </div>

        {/* Answer recap */}
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          {QUIZ_QUESTIONS.map((q, i) => {
            const ans = answers[i]
            return (
              <div key={q.id} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                padding: '0.75rem 0',
                borderBottom: i < QUIZ_QUESTIONS.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>
                  {ans?.correct ? '✅' : '❌'}
                </span>
                <div>
                  <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.4, marginBottom: '0.25rem' }}>
                    {q.statement}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
                    Réponse : <strong style={{ color: '#1a56db' }}>{q.answer === 'mythe' ? 'MYTHE' : 'RÉALITÉ'}</strong>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #0b1e3e, #1b2d50)',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginBottom: '1.25rem',
          textAlign: 'left',
        }}>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Découvrez les formations VITIB pour approfondir vos connaissances en IA et numérique.
          </p>
          <button onClick={goToForm} className="btn-primary full" style={{ background: '#c9a227', color: '#0b1e3e' }}>
            {saving ? 'Enregistrement…' : "Je m'inscris à la liste prioritaire →"}
          </button>
        </div>

        <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setState('welcome') }} className="btn-ghost full">
          Rejouer
        </button>
      </div>
    )
  }

  /* ── Playing / Answered ── */
  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b' }}>
            Question {current + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <span style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            {answers.filter((a) => a.correct).length} correctes
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((current + (state === 'answered' ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div style={{
        background: '#f8fafc',
        border: '1.5px solid #e2e8f0',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.75rem',
        minHeight: '100px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.45, letterSpacing: '-0.01em', textAlign: 'center', width: '100%' }}>
          &ldquo;{question.statement}&rdquo;
        </p>
      </div>

      {/* Answer buttons */}
      {state === 'playing' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => answer('mythe')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              border: '2px solid #e2e8f0',
              background: '#fff',
              fontSize: '1.0625rem',
              fontWeight: 800,
              color: '#dc2626',
              cursor: 'pointer',
              transition: 'all 0.15s',
              minHeight: '4.5rem',
              touchAction: 'manipulation',
            }}
          >
            🚫 MYTHE
          </button>
          <button
            onClick={() => answer('realite')}
            style={{
              padding: '1.25rem 1rem',
              borderRadius: '1rem',
              border: '2px solid #e2e8f0',
              background: '#fff',
              fontSize: '1.0625rem',
              fontWeight: 800,
              color: '#059669',
              cursor: 'pointer',
              transition: 'all 0.15s',
              minHeight: '4.5rem',
              touchAction: 'manipulation',
            }}
          >
            ✅ RÉALITÉ
          </button>
        </div>
      )}

      {/* Feedback */}
      {state === 'answered' && selected && (
        <div>
          <div style={{
            padding: '1.125rem',
            borderRadius: '1rem',
            background: isCorrect ? '#ecfdf5' : '#fff1f2',
            border: `1.5px solid ${isCorrect ? '#6ee7b7' : '#fca5a5'}`,
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.375rem', flexShrink: 0 }}>{isCorrect ? '✅' : '❌'}</span>
              <div>
                <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '0.375rem' }}>
                  {isCorrect ? 'Bonne réponse !' : `C'est ${question.answer === 'mythe' ? 'un MYTHE' : 'une RÉALITÉ'}`}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55 }}>
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>

          <button onClick={next} className="btn-primary full">
            {current < QUIZ_QUESTIONS.length - 1 ? 'Question suivante →' : 'Voir mes résultats →'}
          </button>
        </div>
      )}
    </div>
  )
}
