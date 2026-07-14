# Auditoria GL Academy — Plano de correções

Vou trabalhar por blocos, na ordem que pediste. Backend já está em Lovable Cloud (Supabase), portanto **não** precisas de criar contas externas para os pontos 1–7. Só te pergunto antes se surgir algo que exija reCAPTCHA, analytics ou domínio próprio.

## Bloco 1 — Bugs e Funcionalidade
- FAQ: substituir o accordion caseiro pelo componente shadcn `Accordion` (Radix) → resolve o bug de só abrir a primeira + garante `aria-expanded`/`aria-controls` corretos (também conta para o Bloco 3).
- Validação do formulário de inscrição com Zod: obrigatórios, email válido, telefone PT (9 dígitos, começa por 2/9), mensagens inline por campo.
- Feedback visual: botão com spinner + estado `disabled`; toasts sonner para sucesso/erro além do bloco atual.
- Confirmar ligação Supabase (`submeterInscricao` → `inscricoes`) — já está, valido com um submit.
- Verificar âncoras: `#metodo`, `#resultados`, `#marcar`, `#inscricao`, `#problema`, `#faq`. Corrigir IDs em falta e apontar `#marcar` → `#inscricao` se não houver secção dedicada.
- Menu mobile: hamburger com Sheet do shadcn (nav atual esconde os links em `<sm`).
- Scroll suave: já existe `scroll-behavior: smooth` em `html`; adiciono `scroll-margin-top` nas secções para compensar a navbar sticky.
- Scroll-spy: `IntersectionObserver` que marca o item activo na Navbar.
- Link `/auth`: mantém-se — a página existe e funciona.
- CTAs mobile a 375px: revisão de padding, tap targets ≥44px, `MobileSticky` não sobrepor conteúdo do form.

## Bloco 2 — Segurança e Dados
- Sanitização: tudo passa por Zod `.trim()` + limites de tamanho no server; nenhum campo é renderizado com `dangerouslySetInnerHTML`.
- Anti-spam: honeypot (`website` field escondido) no form + rejeição server-side. reCAPTCHA fica em standby até me confirmares (exige conta Google).
- Validação server-side: reforçar o schema no `submeterInscricao` (mesmo schema PT).
- Cookies banner: **não** implemento agora — o site não tem analytics/pixels. Deixo nota no resumo.
- Dados pessoais: já protegidos por RLS (só `service_role` escreve/lê `inscricoes`); confirmo que nenhum select público existe.

## Bloco 3 — Acessibilidade
- Contraste: auditar tokens `text-ink-3`, badges teal/amber sobre soft; ajustar oklch onde falhar AA.
- Labels: já usam `htmlFor`/`id`; validar todos os campos novos.
- Foco visível: garantir `focus-visible:ring` em todos os interactivos (botões âncora incluídos).
- `aria-label` em botões só-ícone (hamburger, close).
- FAQ ARIA: resolvido pelo Radix Accordion.
- Skip-link "Ir para o conteúdo" no topo do `__root`.

## Bloco 4 — Performance
- Retrato Gabriel → WebP + `width`/`height` explícitos + `loading="eager"` (hero) / `lazy` no resto.
- Todas as outras `<img>` fora do viewport → `loading="lazy"` + dimensões.
- Fontes: Lora + DM Sans já via `<link>` — adicionar `&display=swap` se faltar.
- CSS/JS minificação: já é default do build Vite; confirmo.
- Nota: não corro Lighthouse aqui (sem Chrome UI), mas aplico as boas práticas que dão ≥90.

## Bloco 5 — SEO técnico
- Criar `src/routes/sitemap[.]xml.ts` e `public/robots.txt`.
- `<link rel="canonical">` no `head()` da rota `/`.
- JSON-LD `EducationalOrganization` com nome, descrição, ofertas (100€/150€), `provider`.
- Verificar hierarquia H1/H2/H3 (um H1 no Hero).
- Alt-texts descritivos.

## Bloco 6 — Responsividade
- Testar 375/768/1024/1440 com Playwright, screenshots, corrigir overflow-x e zoom 200%.

## Bloco 7 — Código
- FAQ/Testemunhos/Preços: extrair dados para arrays e mapear (já são componentes; garanto que não há JSX repetido).
- Remover `console.log`/`console.error` de produção (manter só no server fn com nível `error`).
- Adicionar `ErrorBoundary` React no `__root` (usando `reportLovableError` já existente).
- Confirmar que não há chaves hardcoded (só `VITE_SUPABASE_*` públicas — OK).

## O que preciso de ti antes de avançar
1. **reCAPTCHA**: avanço só com honeypot ou queres também reCAPTCHA v3 (precisa de conta Google + chaves)?
2. **Cookies banner**: confirmar que não vais adicionar Google Analytics/Meta Pixel nas próximas semanas — se sim, adiciono já a base.
3. **Email de notificação**: queres receber email quando alguém submete o formulário? (Requer Resend ou similar — conta externa.)

Assim que responderes a estas 3, começo pelo Bloco 1 e vou reportando à medida que fecho cada bloco.
