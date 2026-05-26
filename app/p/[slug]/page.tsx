import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Perfil {
  nome: string
  crp: string | null
  municipio: string | null
  bioPublica: string | null
  especialidades: string[]
  formatoAtendimento: string | null
  publicoAtendido: string[]
  duracaoSessaoMin: number | null
  exibirValorSessao: boolean
  valorSessao: number | null
  whatsappContato: string | null
  fotoPerfil: string | null
  aceitaAgendamentoOnline: boolean
}

async function getPerfil(slug: string): Promise<Perfil | null> {
  try {
    const res = await fetch(
      `${process.env.APP_URL ?? 'https://app.railaite.com.br'}/api/public/perfil/${slug}`,
      {
        headers: {
          'x-public-api-key': process.env.PUBLIC_API_KEY ?? '',
        },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) return null
    const json = (await res.json()) as { data: Perfil }
    return json.data
  } catch {
    return null
  }
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const perfil = await getPerfil(slug)
  if (!perfil) return { title: 'Perfil não encontrado — Railaite' }
  return {
    title: `${perfil.nome} — Railaite`,
    description:
      perfil.bioPublica ?? `Conheça o perfil de ${perfil.nome} no Railaite.`,
    openGraph: {
      title: `${perfil.nome} — Railaite`,
      description: perfil.bioPublica ?? '',
      images: perfil.fotoPerfil ? [perfil.fotoPerfil] : [],
    },
  }
}

const formatoLabel: Record<string, string> = {
  presencial: 'Presencial',
  online: 'Online',
  hibrido: 'Presencial e Online',
}

export default async function PerfilPage({ params }: Props) {
  const { slug } = await params
  const perfil = await getPerfil(slug)
  if (!perfil) notFound()

  const whatsappHref = perfil.whatsappContato
    ? `https://wa.me/55${perfil.whatsappContato.replace(/\D/g, '')}`
    : null

  const localStr = [
    perfil.municipio,
    perfil.formatoAtendimento ? formatoLabel[perfil.formatoAtendimento] : null,
  ]
    .filter(Boolean)
    .join(' · ')

  const temInfosSessao =
    perfil.publicoAtendido.length > 0 ||
    !!perfil.duracaoSessaoMin ||
    (perfil.exibirValorSessao && !!perfil.valorSessao)

  return (
    <main className="perfil-page">
      <nav className="perfil-nav">
        <a href="https://www.railaite.com.br" className="perfil-nav-brand">
          Railaite
        </a>
      </nav>

      <div className="perfil-container">
        <div className="perfil-card">
          {/* Avatar */}
          <div className="perfil-avatar">
            {perfil.fotoPerfil ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={perfil.fotoPerfil}
                alt={perfil.nome}
                className="perfil-avatar-img"
              />
            ) : (
              <div className="perfil-avatar-initials">
                {perfil.nome
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </div>
            )}
          </div>

          {/* Nome e CRP */}
          <h1 className="perfil-nome">{perfil.nome}</h1>
          {perfil.crp && <p className="perfil-crp">CRP {perfil.crp}</p>}

          {/* Local e formato */}
          {localStr && <p className="perfil-local">{localStr}</p>}

          {/* Bio */}
          {perfil.bioPublica && (
            <p className="perfil-bio">{perfil.bioPublica}</p>
          )}

          {/* Especialidades */}
          {perfil.especialidades.length > 0 && (
            <div className="perfil-tags">
              {perfil.especialidades.map((esp) => (
                <span key={esp} className="perfil-tag">
                  {esp}
                </span>
              ))}
            </div>
          )}

          {/* Infos da sessão */}
          {temInfosSessao && (
            <div className="perfil-infos">
              {perfil.publicoAtendido.length > 0 && (
                <div className="perfil-info-row">
                  <span className="perfil-info-label">Atende</span>
                  <span className="perfil-info-value">
                    {perfil.publicoAtendido.join(', ')}
                  </span>
                </div>
              )}
              {perfil.duracaoSessaoMin && (
                <div className="perfil-info-row">
                  <span className="perfil-info-label">Duração</span>
                  <span className="perfil-info-value">
                    {perfil.duracaoSessaoMin} minutos
                  </span>
                </div>
              )}
              {perfil.exibirValorSessao && perfil.valorSessao && (
                <div className="perfil-info-row">
                  <span className="perfil-info-label">Valor</span>
                  <span className="perfil-info-value">
                    R${' '}
                    {Number(perfil.valorSessao)
                      .toFixed(2)
                      .replace('.', ',')}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTAs */}
          <div className="perfil-ctas">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="perfil-cta perfil-cta--primary"
              >
                Entrar em contato
              </a>
            )}
            <button disabled className="perfil-cta perfil-cta--secondary">
              Agendar sessão
              <span className="perfil-em-breve">Em breve</span>
            </button>
          </div>
        </div>

        <p className="perfil-footer">
          Agenda gerenciada pelo{' '}
          <a href="https://www.railaite.com.br">Railaite</a>
        </p>
      </div>
    </main>
  )
}
