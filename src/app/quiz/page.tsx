import Link from 'next/link'
import QuizGame from '@/components/vitib/QuizGame'

export const metadata = {
  title: 'Quiz IA — VITIB Digital Academy',
}

export default function QuizPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 1.25rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div className="container-form" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #c9a227, #e5c547)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9375rem',
              fontWeight: 800,
              color: '#0b1e3e',
            }}>V</div>
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0b1e3e' }}>VITIB</span>
          </div>
          <Link href="/" className="btn-ghost" style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem', color: '#64748b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>
      </header>

      {/* Quiz */}
      <main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="container-form">
          <div className="vitib-card" style={{ padding: '1.75rem 1.5rem' }}>
            <QuizGame />
          </div>
        </div>
      </main>
    </div>
  )
}
