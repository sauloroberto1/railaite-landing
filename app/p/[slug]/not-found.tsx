export default function PerfilNotFound() {
  return (
    <main className="perfil-page">
      <nav className="perfil-nav">
        <a href="https://www.railaite.com.br" className="perfil-nav-brand">
          Railaite
        </a>
      </nav>
      <div className="perfil-container">
        <div className="perfil-card" style={{ gap: '1rem' }}>
          <p style={{ fontSize: '2rem' }}>404</p>
          <h1
            style={{
              fontSize: '1.125rem',
              fontWeight: 500,
              color: 'var(--fg-1)',
            }}
          >
            Perfil não encontrado
          </h1>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--fg-3)',
              textAlign: 'center',
            }}
          >
            Este link pode estar incorreto ou o perfil foi desativado.
          </p>
          <a
            href="https://www.railaite.com.br"
            className="perfil-cta perfil-cta--primary"
            style={{ marginTop: '0.5rem' }}
          >
            Ir para o Railaite
          </a>
        </div>
      </div>
    </main>
  )
}
