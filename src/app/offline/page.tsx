'use client'

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b1e3e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.25rem',
      textAlign: 'center',
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
      }}>📡</div>

      <div style={{
        width: '44px', height: '44px', borderRadius: '10px',
        background: 'linear-gradient(135deg, #c9a227, #e5c547)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.25rem', fontWeight: 800, color: '#0b1e3e',
        margin: '0 auto 0.75rem',
      }}>V</div>

      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
        Connexion indisponible
      </h1>

      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: '320px', marginBottom: '2rem' }}>
        Vous semblez être hors ligne. Veuillez vous connecter au réseau pour accéder à l'application VITIB.
      </p>

      <div style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '1rem',
        padding: '1.25rem',
        maxWidth: '320px',
        width: '100%',
        marginBottom: '1.5rem',
      }}>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 }}>
          Passez au stand <strong style={{ color: '#e5c547' }}>VITIB</strong> pour enregistrer votre intérêt directement avec notre équipe.
        </p>
      </div>

      <button
        onClick={() => { if (typeof window !== 'undefined') window.location.reload() }}
        style={{
          padding: '0.875rem 2rem',
          background: '#1a56db',
          color: '#fff',
          border: 'none',
          borderRadius: '0.875rem',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          minHeight: '3.25rem',
          touchAction: 'manipulation',
        }}
      >
        Réessayer
      </button>
    </div>
  )
}
