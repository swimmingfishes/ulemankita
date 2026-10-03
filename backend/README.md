```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

```sh
npx wrangler login
npm install zod @hono/zod-validator drizzle-orm
npm install -D drizzle-kit
```

zod + @hono/zod-validator untuk Validasi body, query, dan param di rute

drizzle-orm Query ke database

drizzle-kit	Membuat file migrasi dari skema

```
src/
├── index.ts              # membuat app, memasang middleware, mendaftarkan router
├── routes/               # auth.ts, admin.ts, couple.ts, public.ts
├── services/             # token, guest, wedding, media, comment
├── middleware/           # requireAdmin, requireCouple, errorHandler
├── db/
│   ├── schema.ts         # skema Drizzle
│   └── index.ts          # pembuat klien dari binding
└── lib/                  # crypto (hash, token acak), slug, audit
```