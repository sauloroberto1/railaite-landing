import { Resend } from 'resend'

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return Response.json({ error: 'Email inválido' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Railaite <noreply@railaite.com.br>',
    to: 'saulo.roberto1@gmail.com',
    subject: 'Novo cadastro — lista de espera Railaite',
    html: `<p>Novo email na lista de espera: <strong>${email}</strong></p>`,
  })

  await resend.emails.send({
    from: 'Railaite <noreply@railaite.com.br>',
    to: email,
    subject: 'Você está na lista ✓',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
        <h2>Você está na lista de espera do Railaite!</h2>
        <p>Obrigado pelo interesse. Você será um dos primeiros a ter acesso.</p>
        <p>Em breve entraremos em contato com seu convite.</p>
        <br>
        <p style="color:#888;font-size:13px">"Dê um Railaite no que realmente importa."</p>
        <p style="color:#888;font-size:13px">— Equipe Railaite</p>
      </div>
    `,
  })

  return Response.json({ ok: true })
}
