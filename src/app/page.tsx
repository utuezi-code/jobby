import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="vitib-gradient" style={{ padding: '1.5rem 1.25rem 2.5rem' }}>
        <div className="container-form">
          {/* Event badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(201, 162, 39, 0.15)',
            border: '1px solid rgba(201, 162, 39, 0.4)',
            borderRadius: '999px',
            padding: '0.375rem 0.875rem',
            marginBottom: '1.75rem',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a227', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#e5c547', letterSpacing: '0.04em' }}>
              FEMUA 2026 · Grand-Bassam
            </span>
          </div>

          {/* Logo */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #c9a227, #e5c547)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0b1e3e',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}>V</div>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>VITIB</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>
                  Village des Technologies de l'Information
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}>
            VITIB<br />
            <span className="vitib-gold-text">Digital Academy</span>
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6,
            maxWidth: '400px',
            marginBottom: '2rem',
          }}>
            Rejoignez l'académie numérique du futur et formez-vous aux métiers de l'IA, la cybersécurité et la data.
          </p>

          {/* Primary CTA */}
          <Link href="/interet" className="btn-primary full" style={{ fontSize: '1.0625rem', maxWidth: '380px' }}>
            Je manifeste mon intérêt
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, paddingTop: '2.5rem', paddingBottom: '3rem' }}>
        <div className="container-form">

          {/* About section */}
          <section style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1rem' }}>
              Le <strong style={{ color: '#0f172a' }}>VITIB</strong> développe un programme de formation d'excellence aux standards internationaux, ancré dans les réalités et besoins du marché africain.
            </p>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.65 }}>
              Laissez vos coordonnées pour être parmi les <strong style={{ color: '#0f172a' }}>premiers informés</strong> du lancement des programmes et bénéficier d'un accès prioritaire.
            </p>
          </section>

          {/* Value propositions */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Pourquoi s'inscrire ?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: '🎓', text: 'Formations aux standards internationaux' },
                { icon: '🌍', text: 'Focus sur les réalités et opportunités africaines' },
                { icon: '🤝', text: "Réseau d'experts, de partenaires et d'entreprises" },
                { icon: '📜', text: 'Certifications reconnues et valorisées' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.875rem 1rem',
                  background: '#fff',
                  borderRadius: '0.875rem',
                  border: '1px solid #f1f5f9',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: '0.9375rem', color: '#334155', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Domains */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Domaines de formation
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Intelligence Artificielle', 'Cybersécurité', 'Data & Cloud', 'Entrepreneuriat Digital', 'Innovation', 'Management Tech'].map((d) => (
                <span key={d} style={{
                  padding: '0.4375rem 0.875rem',
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  borderRadius: '999px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: '1px solid #bfdbfe',
                }}>{d}</span>
              ))}
            </div>
          </section>

          {/* Quiz CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #0b1e3e 0%, #1b2d50 100%)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            marginBottom: '2.5rem',
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🧠</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.375rem' }}>
                Testez vos connaissances en IA
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                5 questions · 2 minutes · Mythe ou Réalité
              </p>
            </div>
            <Link href="/quiz" className="btn-secondary" style={{
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.35)',
              color: '#fff',
              fontSize: '0.9375rem',
            }}>
              Lancer le quiz
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </section>

          {/* Final CTA */}
          <Link href="/interet" className="btn-primary full" style={{ fontSize: '1.0625rem' }}>
            Enregistrer mon intérêt →
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: '#0b1e3e',
        padding: '1.5rem 1.25rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.25rem' }}>VITIB — Digital Academy</div>
          <div>FEMUA 2026 · Côte d'Ivoire</div>
          <div style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © 2026 VITIB. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
