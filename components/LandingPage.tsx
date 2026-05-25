'use client'

import { useState, useEffect, useRef, ElementType, ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { BrandMark } from '@/components/BrandMark'
import { MockInicio, MockAgenda, MockPacientes, MockSessao } from '@/components/mockups'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
}

function Reveal({ children, delay = 0, as: As = 'div', className = '' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setVisible(true); return }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          io.disconnect()
        }
      })
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return (
    <As ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </As>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <BrandMark size="sm" />
          <span className="brand-name">Railaite</span>
        </a>
        <div className="nav__cta">
          <a
            href="https://app.railaite.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, color: 'var(--stone-500)', fontWeight: 500, transition: 'color var(--duration-base)', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--stone-800)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--stone-500)')}
          >
            Entrar
          </a>
          <a href="#comecar" className="btn btn--primary">Lista de espera</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <Reveal>
            <h1>
              Uma forma mais <span className="hl">leve</span><br />
              de organizar seus atendimentos.
            </h1>
            <div className="hero__ctas">
              <a href="#comecar" className="btn btn--primary btn--lg">
                Entrar na lista de espera
                <Icon name="arrow-right" size={15} className="arrow" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mock" style={{ borderRadius: 16 }}>
              <div className="mock__chrome">
                <div className="mock__dots">
                  <span className="mock__dot"></span>
                  <span className="mock__dot"></span>
                  <span className="mock__dot"></span>
                </div>
                <div className="mock__url">
                  <Icon name="lock" size={10} />
                  railaite.com.br/app/inicio
                </div>
                <div style={{ width: 36 }}></div>
              </div>
              <div className="mock__body">
                <MockInicio />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = [
    { label: 'NFS-e', icon: 'file-text' },
    { label: 'Pix', icon: 'pix' },
    { label: 'WhatsApp', icon: 'whatsapp' },
    { label: 'Google Calendar', icon: 'calendar' },
    { label: 'Google Drive', icon: 'drive' },
  ]
  return (
    <div className="trust">
      <div className="container">
        <Reveal className="trust__inner">
          <div className="trust__label">Funciona junto com as ferramentas que você já usa.</div>
          <div className="trust__logos">
            {items.map(i => (
              <span key={i.label} className="trust__logo">
                <Icon name={i.icon} size={16} stroke={1.5} />
                {i.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function SellingPoints() {
  const items = [
    {
      icon: 'calendar-days',
      title: 'Agenda e sessões',
      body: 'Sua rotina de atendimentos organizada em uma agenda leve e intuitiva.',
    },
    {
      icon: 'pix',
      title: 'Cobrança Pix',
      body: 'Sua cobrança pronta para enviar pelo WhatsApp.',
    },
    {
      icon: 'receipt',
      title: 'Nota fiscal NFS-e',
      body: 'A emissão de NFS-e, organizada junto dos seus atendimentos.',
    },
  ]
  return (
    <section id="produto">
      <div className="container">
        <div className="s-head" style={{ gridTemplateColumns: '1fr', gap: 0, marginBottom: 24 }}>
          <Reveal>
            <span className="s-eyebrow">O que você ganha</span>
            <h2 className="s-lede s-head__title">
              Cada parte da operação,<br />
              <em>onde precisa estar.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="s-sub">
              Organize atendimentos, pagamentos e registros sem complicação.
            </p>
          </Reveal>
        </div>

        <Reveal className="sp-grid">
          {items.map(item => (
            <div key={item.title} className="sp">
              <div className="sp__glyph">
                <Icon name={item.icon} size={18} stroke={1.6} />
              </div>
              <div className="sp__title">{item.title}</div>
              <div className="sp__body">{item.body}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function ProductPreview() {
  const [tab, setTab] = useState('inicio')
  const tabs = [
    { id: 'inicio', label: 'Início', Comp: MockInicio },
    { id: 'agenda', label: 'Agenda', Comp: MockAgenda },
    { id: 'pacientes', label: 'Pacientes', Comp: MockPacientes },
    { id: 'sessao', label: 'Sessão', Comp: MockSessao },
  ]
  const Current = tabs.find(t => t.id === tab)!.Comp
  return (
    <section className="product-preview">
      <div className="container">
        <div className="s-head" style={{ marginBottom: 32 }}>
          <Reveal>
            <span className="s-eyebrow">Por dentro</span>
            <h2 className="s-lede s-head__title">
              Clareza na operação.<br />
              <em>Calma na rotina clínica.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="s-sub">
              Tudo o que você usa no dia a dia, sem excesso de tela.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="preview-tabs">
            {tabs.map(t => (
              <button key={t.id} className={`preview-tab ${tab === t.id ? 'is-active' : ''}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="preview-card">
            <div className="preview-card__chrome">
              <div className="preview-card__dots">
                <span className="preview-card__dot"></span>
                <span className="preview-card__dot"></span>
                <span className="preview-card__dot"></span>
              </div>
              <div className="mock__url" style={{ height: 26, fontSize: 12 }}>
                <Icon name="lock" size={11} />
                railaite.com.br/app/{tab === 'sessao' ? 'sessao/482' : tab}
              </div>
              <div style={{ width: 36 }}></div>
            </div>
            <div style={{ background: 'var(--bg-page)' }}>
              <Current />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


function FeatureItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-stone-600">
      <span className="text-stone-400 mt-0.5 flex-shrink-0">✓</span>
      {children}
    </li>
  )
}

function Pricing() {
  return (
    <section>
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-3">
            Planos
          </p>
          <h2 className="text-3xl font-medium text-stone-900">
            Simples assim.
          </h2>
        </div>

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-sm text-stone-500 border border-stone-200 rounded-full px-4 py-1.5">
            ✦ 14 dias grátis em qualquer plano · Sem cartão de crédito
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
          <div className="border border-stone-200 rounded-2xl p-7 bg-white flex flex-col">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Essencial</p>
              <p className="text-sm text-stone-500 mt-1 mb-3">Para quem está começando ou não emite nota fiscal.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-stone-900">R$ 49,90</span>
                <span className="text-sm text-stone-400">/mês</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              <FeatureItem>Agenda e sessões ilimitadas</FeatureItem>
              <FeatureItem>Pacientes ilimitados</FeatureItem>
              <FeatureItem>Google Calendar + Meet integrado</FeatureItem>
              <FeatureItem>Anotações via Google Drive</FeatureItem>
              <FeatureItem>Cobrança Pix via WhatsApp</FeatureItem>
              <FeatureItem>Controle financeiro básico</FeatureItem>
            </ul>
            <a
              href="https://app.railaite.com.br/sign-up"
              className="w-full text-center py-3 rounded-xl text-sm font-medium transition-colors mt-auto bg-stone-900 text-stone-50 hover:bg-stone-700"
            >
              Começar grátis por 14 dias
            </a>
            <p className="text-center text-xs text-stone-400 mt-2">Sem cartão de crédito</p>
          </div>

          <div className="border-2 border-stone-700 rounded-2xl p-7 bg-white flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-800 text-stone-100 text-xs font-medium px-3 py-1 rounded-full">
              Mais completo
            </span>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-1">Profissional</p>
              <p className="text-sm text-stone-500 mt-1 mb-3">Para quem tem CNPJ e emite nota fiscal.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-stone-900">R$ 99,90</span>
                <span className="text-sm text-stone-400">/mês</span>
              </div>
            </div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              <li className="flex items-start gap-2.5 text-sm text-stone-400 italic mb-2">
                <span className="mt-0.5 flex-shrink-0">↳</span>
                Tudo do Essencial
              </li>
              <FeatureItem>Emissão de NFS-e integrada</FeatureItem>
              <FeatureItem>Análise automática de NF por IA</FeatureItem>
              <FeatureItem>Dashboard financeiro completo</FeatureItem>
              <FeatureItem>Suporte prioritário</FeatureItem>
            </ul>
            <a
              href="https://app.railaite.com.br/sign-up"
              className="w-full text-center py-3 rounded-xl text-sm font-medium transition-colors mt-auto bg-stone-900 text-stone-50 hover:bg-stone-700"
            >
              Começar grátis por 14 dias
            </a>
            <p className="text-center text-xs text-stone-400 mt-2">Sem cartão de crédito</p>
          </div>
        </div>

        <p className="text-center text-sm text-stone-400 mt-6 max-w-sm mx-auto">
          Emitir uma NF manualmente leva ~20 minutos. Com 20 sessões por semana, são 4 horas por mês. O Profissional custa R$ 99,90 e elimina esse trabalho.
        </p>
      </div>
    </section>
  )
}

function LeadCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/lista-espera', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="comecar">
      <div className="container container--narrow">
        <Reveal className="lead-capture">
          <div className="lead-capture__grid">
            <div>
              <h3>
                Entre na<br />
                <em>lista de espera.</em>
              </h3>
              <p className="blurb">
                Sem cartão de crédito. Você só paga quando faz sentido.
              </p>
              <div className="lead-capture__perks">
                {[
                  'Acesso completo à plataforma',
                  'Migração assistida do seu Google Calendar',
                  'Suporte por WhatsApp em português',
                ].map(p => (
                  <div key={p} className="lead-capture__perk">
                    <Icon name="check" size={16} stroke={2} />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {status === 'done' ? (
              <div className="form__success">
                <Icon name="check-circle" size={28} stroke={1.6} />
                <div>
                  <div className="form__success-title">Tudo certo.</div>
                  <div className="form__success-body">
                    Em breve você recebe um e-mail com seu convite de acesso.
                  </div>
                </div>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="field">
                  <label className="field__label" htmlFor="email">E-mail profissional</label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    required
                    placeholder="voce@consultorio.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                  />
                </div>
                {status === 'error' && (
                  <p style={{ fontSize: 13, color: 'var(--clay-500)' }}>
                    Algo deu errado. Tente novamente.
                  </p>
                )}
                <button type="submit" className="btn btn--primary btn--lg" style={{ marginTop: 6 }} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Enviando…' : 'Entrar na lista de espera'}
                  {status !== 'loading' && <Icon name="arrow-right" size={15} className="arrow" />}
                </button>
                <div className="form__footer">
                  <Icon name="lock" size={12} />
                  Seus dados ficam com você. Nunca compartilhamos.
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-row">
              <BrandMark size="sm" />
              <span className="brand-name">Railaite</span>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Produto</div>
            <div className="footer__list">
              <a href="#produto">Funcionalidades</a>
              <a href="#comecar">Lista de espera</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Empresa</div>
            <div className="footer__list">
              <a href="#">Sobre nós</a>
              <a href="#">Contato</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Suporte</div>
            <div className="footer__list">
              <a href="#">Central de ajuda</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Railaite · São Paulo, Brasil</span>
          <div className="footer__bottom-links">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <SellingPoints />
        <ProductPreview />
        <Pricing />
        <LeadCapture />
      </main>
      <Footer />
    </>
  )
}
