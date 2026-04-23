import Link from 'next/link'

export const metadata = {
  title: 'Merci — VITIB Digital Academy',
}

export default function MerciPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      <div className="container-form" style={{ maxWidth: '440px' }}>
        <div className="vitib-card" style={{ padding: '2.5rem 1.75rem', textAlign: 'center' }}>
          {/* Success icon */}
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
            border: '2px solid #6ee7b7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2rem',
          }}>
            ✅
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Merci pour votre intérêt !
          </h1>

          <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: 1.65, marginBottom: '2rem' }}>
            Votre demande a bien été enregistrée. Vous serez parmi les <strong style={{ color: '#0f172a' }}>premiers informés</strong> du lancement des programmes VITIB Digital Academy.
          </p>

          {/* What happens next */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '2rem',
            textAlign: 'left',
          }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#334155', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Prochaines étapes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { num: '1', text: 'Nous finalisons le contenu et le calendrier des formations' },
                { num: '2', text: 'Vous recevrez une notification dès l\'ouverture des inscriptions' },
                { num: '3', text: 'Les inscrits en liste prioritaire bénéficient de conditions spéciales' },
              ].map(({ num, text }) => (
                <div key={num} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '22px', height: '22px',
                    borderRadius: '50%',
                    background: '#1a56db',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>{num}</span>
                  <span style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz CTA (if not done) */}
          <div style={{
            background: 'linear-gradient(135deg, #0b1e3e, #1b2d50)',
            borderRadius: '1rem',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', marginBottom: '0.875rem', lineHeight: 1.5 }}>
              En attendant, testez vos connaissances en IA !
            </p>
            <Link href="/quiz" className="btn-secondary" style={{
              width: '100%',
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.3)',
              color: '#fff',
              fontSize: '0.9375rem',
            }}>
              🧠 Quiz Mythe ou Réalité
            </Link>
          </div>

          <Link href="/" className="btn-ghost" style={{ width: '100%', color: '#64748b', justifyContent: 'center' }}>
            Retour à l'accueil
          </Link>
        </div>

        {/* VITIB branding */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            VITIB Digital Academy · FEMUA 2026
          </div>
        </div>
      </div>
    </div>
  )
}
