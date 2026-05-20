'use client'

import { useState, useEffect, useRef, ElementType, ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { BrandMark } from '@/components/BrandMark'
import { MockInicio, MockAgenda, MockPacientes, MockSessao, StepVisualAgenda, StepVisualAnotacoes, StepVisualCobranca } from '@/components/mockups'

/* Reveal on scroll */
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

/* Nav */
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
        <div className="nav__links">
          <a href="#produto" className="nav__link">Produto</a>
          <a href="#como-funciona" className="nav__link">Como funciona</a>
          <a href="#para-voce" className="nav__link">Para você</a>
          <a href="#perguntas" className="nav__link">Perguntas</a>
        </div>
        <div className="nav__cta">
          <a href="#comecar" className="btn btn--primary">Lista de acesso</a>
        </div>
      </div>
    </nav>
  )
}

/* Hero */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero__grid">
          <Reveal>
            <span className="hero__eyebrow">
              <span className="dot"></span>
              Lista de acesso aberta · Brasil
            </span>
            <h1>
              Uma forma mais calma<br />
              de gerir sua <span className="hl">clínica particular</span>.
            </h1>
            <p className="lead">
              Agenda, sessões, cobrança Pix integrada e nota fiscal — num só lugar
              organizado, feito para psicólogos e terapeutas.
            </p>
            <div className="hero__ctas">
              <a href="#comecar" className="btn btn--primary btn--lg">
                Entrar na lista de acesso
                <Icon name="arrow-right" size={15} className="arrow" />
              </a>
            </div>
            <div className="hero__meta">
              <span className="dot"></span>
              Sem cartão de crédito · Migração assistida · Suporte em português
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

/* Trust strip */
function TrustStrip() {
  const items = [
    { label: 'NFS-e', icon: 'file-text' },
    { label: 'Pix', icon: 'pix' },
    { label: 'WhatsApp', icon: 'whatsapp' },
    { label: 'Google Calendar', icon: 'calendar' },
    { label: 'Google Drive', icon: 'drive' },
    { label: 'Focus NFE', icon: 'receipt' },
  ]
  return (
    <div className="trust">
      <div className="container">
        <Reveal className="trust__inner">
          <div className="trust__label">Integra com</div>
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

/* Selling points */
function SellingPoints() {
  const items = [
    {
      icon: 'calendar-days',
      title: 'Agenda e sessões',
      body: 'Visão mensal e semanal, agendamento em dois cliques e sincronia com o Google Calendar.',
    },
    {
      icon: 'pix',
      title: 'Cobrança Pix integrada',
      body: 'Gere o link de cobrança com um clique e envie por WhatsApp. Quando pago, a sessão atualiza automaticamente.',
    },
    {
      icon: 'receipt',
      title: 'Emissão de nota fiscal',
      body: 'NFS-e emitida após o pagamento, via Focus NFE. Sem planilhas, sem dor de cabeça.',
    },
    {
      icon: 'highlighter',
      title: 'Anotações via Google Drive',
      body: 'Histórico organizado por sessão. O conteúdo nunca passa pelo servidor — fica direto no seu Drive.',
    },
    {
      icon: 'wallet',
      title: 'Controle financeiro',
      body: 'Dashboard com recebidos, a receber e sessões realizadas. Visão clara do mês sem planilhas.',
    },
    {
      icon: 'shield',
      title: 'Privacidade no centro',
      body: 'Dados sensíveis mascarados por padrão. LGPD-friendly. Você decide o que aparece em cada tela.',
    },
    {
      icon: 'bell',
      title: 'Lembretes automáticos',
      body: 'Lembretes de sessão enviados automaticamente por WhatsApp, sem nenhuma ação manual.',
      soon: true,
    },
    {
      icon: 'sparkles',
      title: 'Resumos com IA',
      body: 'Resumos de sessão gerados automaticamente para apoiar sua documentação clínica.',
      soon: true,
    },
  ]
  return (
    <section id="produto">
      <div className="container">
        <div className="s-head">
          <Reveal>
            <span className="s-eyebrow">O que você ganha</span>
            <h2 className="s-lede s-head__title">
              Cada parte da operação,<br />
              <em>onde precisa estar.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="s-sub">
              Construído ao redor do dia-a-dia clínico — não em cima de um CRM genérico
              adaptado. Cada decisão de design começa numa pergunta simples: o que o terapeuta
              precisa ver, agora?
            </p>
          </Reveal>
        </div>

        <Reveal className="sp-grid">
          {items.map(item => (
            <div key={item.title} className="sp">
              <div className="sp__glyph">
                <Icon name={item.icon} size={18} stroke={1.6} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="sp__title">{item.title}</div>
                {item.soon && (
                  <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 9999, background: 'var(--lavender-50)', color: 'var(--lavender-600)', border: '1px solid var(--lavender-100)', whiteSpace: 'nowrap' }}>Em breve</span>
                )}
              </div>
              <div className="sp__body">{item.body}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* How it works */
function HowItWorks() {
  return (
    <section id="como-funciona" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="s-head">
          <Reveal>
            <span className="s-eyebrow">Como funciona</span>
            <h2 className="s-lede s-head__title">
              Três passos<br />
              <em>silenciosos.</em>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="s-sub">
              Do agendamento à nota fiscal, o sistema cuida do que é repetitivo —
              e fica fora do seu caminho no que é clínico.
            </p>
          </Reveal>
        </div>

        <div className="steps">
          <Reveal as="div" className="step">
            <div className="step__title">Organize sua agenda</div>
            <div className="step__body">
              Importe seus pacientes do Google Calendar ou cadastre em segundos. A agenda mensal e
              semanal já vêm prontas, em pt-BR.
            </div>
            <div className="step__visual">
              <StepVisualAgenda />
            </div>
          </Reveal>

          <Reveal as="div" className="step" delay={120}>
            <div className="step__title">Atenda seus pacientes</div>
            <div className="step__body">
              Anotações por sessão com destaques e histórico visual. Salvo diretamente no seu
              Google Drive — o conteúdo nunca passa pelo servidor.
            </div>
            <div className="step__visual">
              <StepVisualAnotacoes />
            </div>
          </Reveal>

          <Reveal as="div" className="step" delay={240}>
            <div className="step__title">Simplifique cobrança e notas</div>
            <div className="step__body">
              Link Pix gerado e enviado por WhatsApp com um clique. Quando o paciente paga,
              a NF é emitida automaticamente.
            </div>
            <div className="step__visual">
              <StepVisualCobranca />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* Product preview */
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
              Quatro telas que cobrem 90% do seu dia. Construídas em pt-BR, com tipografia
              tabular para o que importa: nomes, datas e valores.
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

/* Emotional */
function Emotional() {
  return (
    <section id="para-voce" className="section--lg">
      <div className="container container--narrow emotional">
        <Reveal>
          <span className="s-eyebrow s-eyebrow--center">Para o profissional clínico</span>
        </Reveal>
        <Reveal delay={80}>
          <h2>
            Menos operação.<br />
            <em>Mais presença clínica.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="s-sub" style={{ margin: '24px auto 0', textAlign: 'center', maxWidth: '52ch', fontSize: 17 }}>
            O trabalho clínico não cabe em planilhas, lembretes manuais ou em três aplicativos abertos
            ao mesmo tempo. Railaite carrega o operacional, em silêncio, para você voltar a fazer
            terapia — não administração.
          </p>
        </Reveal>

        <Reveal className="quote" delay={240}>
          <p>
            &ldquo;Eu não percebi mais o sistema, depois do segundo dia.
            Ele só funcionou. Voltei a chegar nas sessões com a cabeça leve.&rdquo;
          </p>
          <cite>Dra. Ana S. — psicóloga clínica, São Paulo</cite>
        </Reveal>
      </div>
    </section>
  )
}

/* Lead capture */
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
                Entre na lista de<br />
                <em>acesso antecipado.</em>
              </h3>
              <p className="blurb">
                Configuramos seu espaço com você em uma chamada de 20 minutos.
                Sem cartão de crédito — você só paga quando faz sentido.
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
                  {status === 'loading' ? 'Enviando…' : 'Entrar na lista de acesso'}
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

/* FAQ */
function FAQ() {
  const items = [
    {
      q: 'Preciso emitir nota fiscal?',
      a: 'Depende do seu município e do seu regime. Para a maioria dos psicólogos autônomos, sim — e o Railaite emite automaticamente via Focus NFE depois que a sessão é paga. Se você ainda não tem certificado digital, ajudamos no setup.',
    },
    {
      q: 'Funciona para psicólogos e outros terapeutas?',
      a: 'Foi pensado para psicólogos, psicanalistas e terapeutas em geral. Os modelos de sessão, anotações sob sigilo e o vocabulário do produto (paciente, sessão, agendada/realizada) refletem o dia clínico — não um CRM de vendas.',
    },
    {
      q: 'Tem integração com Google Calendar?',
      a: 'Sim, bidirecional. Você pode continuar usando o Google Calendar como antes — sessões agendadas no Railaite aparecem lá, e eventos do Google que você marcar como sessão aparecem aqui.',
    },
    {
      q: 'Como funciona a cobrança via Pix?',
      a: 'Você conecta uma conta Pix. Cada sessão gera um link de cobrança que você envia por WhatsApp com um clique. Quando o paciente paga, a sessão é marcada como paga e a nota fiscal é emitida automaticamente.',
    },
    {
      q: 'Quais são os planos e preços?',
      a: 'Plano Essencial: R$ 49,90/mês — agenda, sessões, anotações via Drive e controle financeiro. Plano Profissional: R$ 99,90/mês — tudo do Essencial mais cobrança Pix integrada e emissão de NFS-e.',
    },
    {
      q: 'Preciso instalar algo?',
      a: 'Não. Railaite roda 100% no navegador, no notebook, no tablet ou no celular. Seus dados ficam criptografados em servidores no Brasil.',
    },
  ]
  const [open, setOpen] = useState(0)
  return (
    <section id="perguntas">
      <div className="container container--narrow">
        <div className="s-head" style={{ gridTemplateColumns: '1fr', marginBottom: 32 }}>
          <Reveal>
            <span className="s-eyebrow">Perguntas frequentes</span>
            <h2 className="s-lede s-head__title">
              Tudo que costumam<br />
              <em>perguntar antes.</em>
            </h2>
          </Reveal>
        </div>

        <Reveal className="faq">
          {items.map((it, i) => (
            <div key={i} className={`faq__item ${open === i ? 'is-open' : ''}`}>
              <button className="faq__btn" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {it.q}
                <span className="faq__icon"><Icon name="plus" size={14} stroke={2} /></span>
              </button>
              <div className="faq__panel">
                <div className="faq__answer">{it.a}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* Final CTA */
function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container container--narrow">
        <Reveal>
          <div className="final-cta__mark">
            <BrandMark size="lg" />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2>
            A gestão do consultório,<br />
            <em>com a calma que a clínica merece.</em>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p>
            Comece em 5 minutos. Sem cartão. Sem fricção.
            Seu próximo paciente entra mais leve — e você também.
          </p>
        </Reveal>
        <Reveal delay={240} className="final-cta__ctas">
          <a href="#comecar" className="btn btn--primary btn--lg">
            Entrar na lista de acesso
            <Icon name="arrow-right" size={15} className="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* Footer */
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
            <p className="footer__about">
              Uma forma mais calma de gerir um consultório particular.
              Feito no Brasil, em português, para o dia-a-dia clínico.
            </p>
          </div>
          <div>
            <div className="footer__col-title">Produto</div>
            <div className="footer__list">
              <a href="#produto">Funcionalidades</a>
              <a href="#como-funciona">Como funciona</a>
              <a href="#perguntas">Perguntas</a>
              <a href="#comecar">Lista de acesso</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Empresa</div>
            <div className="footer__list">
              <a href="#">Sobre nós</a>
              <a href="#">Blog</a>
              <a href="#">Contato</a>
            </div>
          </div>
          <div>
            <div className="footer__col-title">Suporte</div>
            <div className="footer__list">
              <a href="#">Central de ajuda</a>
              <a href="#">Segurança</a>
              <a href="#">LGPD</a>
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

/* Root */
export function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <SellingPoints />
        <HowItWorks />
        <ProductPreview />
        <Emotional />
        <LeadCapture />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
