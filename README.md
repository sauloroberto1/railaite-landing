# Railaite Landing Page

Landing page de lista de acesso para o Railaite — gestão de clínicas particulares.

## Pré-requisitos

- Node.js 18+
- Conta no [Resend](https://resend.com) para envio de e-mails

## Setup local

```bash
cd apps/landing
npm install
cp .env.example .env.local
# Preencha RESEND_API_KEY no .env.local
npm run dev
```

## Variáveis de ambiente

| Variável | Obrigatório | Descrição |
|---|---|---|
| `RESEND_API_KEY` | Sim | Chave de API do Resend para envio de e-mails da lista de espera |

## Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **Add New → Project**
3. Importe o repositório `railaite-landing` do GitHub
4. Em **Environment Variables**, adicione:
   - `RESEND_API_KEY` = sua chave do Resend
5. Clique em **Deploy**

## Domínio customizado (www.railaite.com.br)

Após o deploy na Vercel:

1. No dashboard do projeto, vá em **Settings → Domains**
2. Adicione `www.railaite.com.br`
3. No painel DNS do seu registrador, adicione:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `cname.vercel-dns.com`
4. Aguarde a propagação DNS (até 48h)

## Publicar no GitHub (primeira vez)

```bash
cd apps/landing
# Instale o gh CLI se necessário: brew install gh && gh auth login
gh repo create railaite-landing --public --source=. --remote=origin --push
# ou manualmente:
git remote add origin https://github.com/sauloroberto1/railaite-landing.git
git push -u origin main
```

## Estrutura

```
apps/landing/
├── app/
│   ├── api/lista-espera/route.ts   # API route para captura de leads
│   ├── globals.css                  # Design system (tokens + estilos)
│   ├── layout.tsx                   # Layout raiz com fontes
│   └── page.tsx                     # Página principal
├── components/
│   ├── BrandMark.tsx                # Logo mark do Railaite
│   ├── Icon.tsx                     # Ícones inline (Lucide-style)
│   ├── LandingPage.tsx              # Componente principal da landing
│   └── mockups.tsx                  # Mockups de UI do produto
└── .env.example                     # Template de variáveis de ambiente
```
