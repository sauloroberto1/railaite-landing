import { Icon } from '@/components/Icon'
import { BrandMark } from '@/components/BrandMark'

function MockMiniSidebar({ active = 'inicio' }: { active?: string }) {
  const items = [
    { id: 'inicio', label: 'Início', icon: 'home' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { id: 'pacientes', label: 'Pacientes', icon: 'users' },
    { id: 'config', label: 'Configurações', icon: 'settings' },
  ]
  return (
    <aside className="app-mini__side">
      <div className="app-mini__brand">
        <BrandMark size="xs" />
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: 'var(--fg-1)', letterSpacing: '-0.005em' }}>Railaite</span>
      </div>
      <div className="app-mini__nav">
        {items.map(item => (
          <div key={item.id} className={`mini-nav ${active === item.id ? 'is-active' : ''}`}>
            <Icon name={item.icon} size={13} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}

export function MockInicio() {
  return (
    <div className="app-mini">
      <MockMiniSidebar active="inicio" />
      <div className="app-mini__main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div className="app-mini__title">Bom dia, Ana.</div>
            <div className="app-mini__sub">Quinta, 12 de mar. — você tem 3 sessões hoje.</div>
          </div>
          <button style={{ height: 28, padding: '0 10px', borderRadius: 7, background: 'var(--sage-500)', color: 'white', border: 0, fontSize: 11, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon name="plus" size={11} />
            Nova sessão
          </button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-1)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
          <span>Hoje</span>
          <span style={{ color: 'var(--fg-4)', fontWeight: 400 }}>3 sessões</span>
        </div>

        <div className="today-list">
          {[
            { initials: 'JB', name: 'Júlia B.', time: '14:30', meta: 'Online · R$ 280,00', status: 'Agendada' },
            { initials: 'CR', name: 'Camila R.', time: '16:00', meta: 'Presencial · R$ 250,00', status: 'Agendada' },
            { initials: 'HB', name: 'Helena B.', time: '18:30', meta: 'Presencial · R$ 260,00', status: 'Agendada' },
          ].map(p => (
            <div key={p.initials} className="today-row">
              <div className="today-row__time">{p.time}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="today-row__name">{p.name}</div>
                <div className="today-row__meta">{p.meta}</div>
              </div>
              <div className="today-row__badge">{p.status}</div>
            </div>
          ))}
        </div>

        <div className="mini-stats">
          <div className="mini-stat">
            <div className="mini-stat__label">Recebido no mês</div>
            <div className="mini-stat__value mini-stat__value--display">R$ 1.280</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat__label">A receber</div>
            <div className="mini-stat__value">R$ 530</div>
          </div>
          <div className="mini-stat">
            <div className="mini-stat__label">Sessões</div>
            <div className="mini-stat__value">7</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MockAgenda() {
  const weeks = [
    [{ d: 1 }, { d: 2 }, { d: 3 }, { d: 4, e: ['09:00 Marina S.', '14:30 Felipe M.'] }, { d: 5, e: ['10:00 Júlia B.', '16:00 Bruno C.'] }, { d: 6, e: ['11:00 Camila R.'], warn: true }, { d: 7 }],
    [{ d: 8 }, { d: 9 }, { d: 10 }, { d: 11, e: ['09:00 Marina S.', '14:30 Felipe M.'] }, { d: 12, today: true, e: ['09:00 Marina S.', '14:30 Júlia B.'] }, { d: 13, e: ['10:00 Bruno C.', '15:00 Felipe M.'] }, { d: 14 }],
    [{ d: 15 }, { d: 16, e: ['09:00 Marina S.'] }, { d: 17, e: ['14:00 Tomás A.'] }, { d: 18 }, { d: 19, e: ['10:00 Júlia B.'] }, { d: 20 }, { d: 21 }],
    [{ d: 22 }, { d: 23 }, { d: 24, e: ['09:00 Marina S.'] }, { d: 25, e: ['11:00 Camila R.'] }, { d: 26, e: ['14:30 Felipe M.'] }, { d: 27, e: ['16:00 Helena B.'] }, { d: 28 }],
  ] as Array<Array<{ d: number; e?: string[]; warn?: boolean; today?: boolean }>>

  return (
    <div className="app-mini">
      <MockMiniSidebar active="agenda" />
      <div className="app-mini__main" style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div className="app-mini__title">Agenda</div>
            <div className="app-mini__sub">Visualize sua semana ou clique uma data.</div>
          </div>
          <button style={{ height: 26, padding: '0 9px', borderRadius: 7, background: 'var(--sage-500)', color: 'white', border: 0, fontSize: 10.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="plus" size={10} />
            Nova sessão
          </button>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '1px solid var(--border-subtle)', fontSize: 10.5 }}>
            <span style={{ color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name="chevron-left" size={11} /> Fevereiro
            </span>
            <span style={{ fontWeight: 600, color: 'var(--fg-1)' }}>Março 2026</span>
            <span style={{ color: 'var(--fg-3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              Abril <Icon name="chevron-right" size={11} />
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', background: 'var(--bg-surface-2)' }}>
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => (
              <div key={d} style={{ padding: '5px 0', textAlign: 'center', fontSize: 8.5, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--fg-4)', borderBottom: '1px solid var(--border-subtle)' }}>{d}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--stone-150)' }}>
            {weeks.flat().map((cell, i) => (
              <div key={i} style={{ background: 'white', minHeight: 52, padding: '4px 5px', position: 'relative', fontSize: 9 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: 9999, fontSize: 9, fontWeight: 500, background: cell.today ? 'var(--amber-300)' : 'transparent', color: cell.today ? 'var(--stone-900)' : 'var(--fg-3)', fontVariantNumeric: 'tabular-nums', marginBottom: 2 }}>{cell.d}</span>
                {(cell.e || []).slice(0, 2).map((evt, j) => (
                  <div key={j} style={{ padding: '1px 4px', borderRadius: 3, fontSize: 8.5, marginBottom: 1, fontWeight: 500, background: cell.warn && j === 0 ? 'var(--amber-50)' : 'var(--lavender-50)', color: cell.warn && j === 0 ? 'var(--amber-500)' : 'var(--lavender-600)', border: `1px solid ${cell.warn && j === 0 ? 'var(--amber-100)' : 'var(--lavender-100)'}`, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MockPacientes() {
  const rows = [
    { ini: 'AB', name: 'Amanda B.', meta: '32 anos · Online', last: '12 mar. 2026', value: 'R$ 250,00', tag: { label: 'Ativo', kind: 'success' } },
    { ini: 'BC', name: 'Bruno C.', meta: '41 anos · Presencial', last: '10 mar. 2026', value: 'R$ 280,00', tag: { label: 'Ativo', kind: 'success' } },
    { ini: 'CR', name: 'Camila R.', meta: '28 anos · Presencial', last: '09 mar. 2026', value: 'R$ 250,00', tag: { label: 'Ativo', kind: 'success' } },
    { ini: 'FM', name: 'Felipe M.', meta: '36 anos · Online', last: '04 mar. 2026', value: 'R$ 260,00', tag: { label: 'Pendente', kind: 'warning' } },
    { ini: 'HB', name: 'Helena B.', meta: '29 anos · Presencial', last: '02 mar. 2026', value: 'R$ 260,00', tag: { label: 'Ativo', kind: 'success' } },
    { ini: 'JB', name: 'Júlia B.', meta: '45 anos · Online', last: '28 fev. 2026', value: 'R$ 280,00', tag: { label: 'Ativo', kind: 'success' } },
  ]
  const badgeColors: Record<string, { bg: string; fg: string; bd: string }> = {
    success: { bg: 'var(--sage-50)', fg: 'var(--sage-700)', bd: 'var(--sage-200)' },
    warning: { bg: 'var(--amber-50)', fg: 'var(--amber-500)', bd: 'var(--amber-200)' },
  }
  return (
    <div className="app-mini">
      <MockMiniSidebar active="pacientes" />
      <div className="app-mini__main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div className="app-mini__title">Pacientes</div>
            <div className="app-mini__sub">12 pacientes cadastrados</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ position: 'relative', width: 160 }}>
              <Icon name="search" size={11} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-4)' }} />
              <input placeholder="Buscar paciente" style={{ width: '100%', height: 26, padding: '0 8px 0 26px', border: '1px solid var(--border-default)', borderRadius: 6, background: 'var(--bg-surface)', fontSize: 11, color: 'var(--fg-2)', outline: 'none' }} readOnly />
            </div>
            <button style={{ height: 26, padding: '0 9px', borderRadius: 7, background: 'var(--sage-500)', color: 'white', border: 0, fontSize: 10.5, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name="plus" size={10} />
              Novo paciente
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 0.9fr 0.7fr', padding: '7px 12px', background: 'var(--bg-surface-2)', borderBottom: '1px solid var(--border-subtle)', fontSize: 8.5, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--fg-4)', textTransform: 'uppercase' }}>
            <div>Nome</div><div>Última sessão</div><div style={{ textAlign: 'right' }}>Valor</div><div style={{ textAlign: 'right' }}>Status</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.ini} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 0.9fr 0.7fr', padding: '8px 12px', borderBottom: i === rows.length - 1 ? 0 : '1px solid var(--border-subtle)', alignItems: 'center', fontSize: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: 9999, background: 'var(--lavender-100)', color: 'var(--lavender-600)', fontSize: 9, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.ini}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: 'var(--fg-1)', fontWeight: 500, lineHeight: 1.3 }}>{r.name}</div>
                  <div style={{ color: 'var(--fg-3)', fontSize: 9.5, lineHeight: 1.3 }}>{r.meta}</div>
                </div>
              </div>
              <div style={{ color: 'var(--fg-3)', fontVariantNumeric: 'tabular-nums' }}>{r.last}</div>
              <div style={{ color: 'var(--fg-1)', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>{r.value}</div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 7px', borderRadius: 9999, fontSize: 9.5, fontWeight: 500, background: badgeColors[r.tag.kind].bg, color: badgeColors[r.tag.kind].fg, border: `1px solid ${badgeColors[r.tag.kind].bd}` }}>
                  <span style={{ width: 5, height: 5, borderRadius: 9999, background: badgeColors[r.tag.kind].fg }}></span>
                  {r.tag.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MockSessao() {
  return (
    <div className="app-mini">
      <MockMiniSidebar active="pacientes" />
      <div className="app-mini__main">
        <div style={{ fontSize: 10.5, color: 'var(--fg-3)', marginBottom: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="chevron-left" size={11} /> Voltar para Helena B.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div className="app-mini__title">Sessão · 12 de mar.</div>
            <div className="app-mini__sub">14:30 — 50 min · Presencial</div>
          </div>
          <span style={{ padding: '3px 9px', borderRadius: 9999, fontSize: 10, fontWeight: 500, background: 'var(--sage-50)', color: 'var(--sage-700)', border: '1px solid var(--sage-200)' }}>Realizada</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10 }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg-1)' }}>Anotações</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 9999, fontSize: 9.5, fontWeight: 500, color: 'var(--sage-700)', background: 'var(--sage-50)', border: '1px solid var(--sage-100)' }}>
                <Icon name="drive" size={9} />
                Salvo no Drive
              </span>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-2)', lineHeight: 1.55 }}>
              <p style={{ marginBottom: 4 }}>
                Paciente trouxe novamente o tema do trabalho. Refere ter conseguido
                <span style={{ background: 'var(--amber-100)', padding: '0 3px', borderRadius: 2, color: 'var(--stone-800)' }}> conversar com a chefe </span>
                na quarta.
              </p>
              <p style={{ color: 'var(--fg-3)' }}>
                Continuamos a explorar limites e comunicação assertiva.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 9.5, color: 'var(--fg-3)', marginBottom: 4 }}>Cobrança Pix</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-1)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>R$ 260,00</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 9.5, color: 'var(--sage-700)' }}>
                <Icon name="check-circle" size={10} />
                Paga em 12 mar., 15:08
              </div>
            </div>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontSize: 9.5, color: 'var(--fg-3)', marginBottom: 4 }}>Nota fiscal</div>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--fg-1)' }}>NFS-e #00482</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 9.5, color: 'var(--sage-700)' }}>
                <Icon name="check-circle" size={10} />
                Emitida automaticamente
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function StepVisualAgenda() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {[
        { t: '09:00', name: 'Marina S.', tag: 'Realizada', kind: 'success' },
        { t: '11:00', name: 'Bruno C.', tag: 'Agendada', kind: 'info' },
        { t: '14:30', name: 'Júlia B.', tag: 'Agendada', kind: 'info' },
      ].map((r, i) => {
        const bg = r.kind === 'success' ? 'var(--sage-50)' : 'var(--lavender-50)'
        const bd = r.kind === 'success' ? 'var(--sage-100)' : 'var(--lavender-100)'
        const fg = r.kind === 'success' ? 'var(--sage-700)' : 'var(--lavender-600)'
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--sage-700)', fontVariantNumeric: 'tabular-nums', background: 'var(--sage-50)', padding: '2px 7px', borderRadius: 6, border: '1px solid var(--sage-100)' }}>{r.t}</span>
            <span style={{ fontSize: 12.5, color: 'var(--fg-1)', flex: 1 }}>{r.name}</span>
            <span style={{ fontSize: 10.5, fontWeight: 500, padding: '2px 7px', borderRadius: 9999, background: bg, color: fg, border: `1px solid ${bd}` }}>{r.tag}</span>
          </div>
        )
      })}
    </div>
  )
}

export function StepVisualAnotacoes() {
  return (
    <div style={{ padding: '12px 14px', background: 'var(--bg-page)', border: '1px solid var(--border-subtle)', borderRadius: 8, fontSize: 12.5, lineHeight: 1.55, color: 'var(--fg-2)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 9999, marginBottom: 8, fontSize: 10.5, fontWeight: 500, color: 'var(--sage-700)', background: 'var(--sage-50)', border: '1px solid var(--sage-100)' }}>
        <Icon name="drive" size={10} />
        Salvo no Google Drive
      </div>
      <p>
        Trouxe o tema do trabalho. Conseguiu
        <span style={{ background: 'var(--amber-100)', padding: '0 4px', borderRadius: 3, color: 'var(--stone-800)' }}> conversar com a chefe</span> na quarta.
      </p>
    </div>
  )
}

export function StepVisualCobranca() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-page)', border: '1px solid var(--border-subtle)' }}>
        <Icon name="pix" size={14} style={{ color: 'var(--sage-600)' }} />
        <span style={{ fontSize: 12, color: 'var(--fg-1)', flex: 1 }}>Link Pix enviado via WhatsApp</span>
        <span style={{ fontSize: 11, fontWeight: 500, fontVariantNumeric: 'tabular-nums', color: 'var(--fg-1)' }}>R$ 260,00</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, background: 'var(--sage-50)', border: '1px solid var(--sage-100)' }}>
        <Icon name="check-circle" size={14} style={{ color: 'var(--sage-600)' }} />
        <span style={{ fontSize: 12, color: 'var(--sage-700)', flex: 1 }}>Paga · 15:08</span>
        <span style={{ fontSize: 10.5, fontWeight: 500, padding: '2px 7px', borderRadius: 9999, background: 'white', color: 'var(--sage-700)', border: '1px solid var(--sage-200)' }}>NF emitida</span>
      </div>
    </div>
  )
}
