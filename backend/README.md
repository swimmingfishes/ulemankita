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

```sh
npx drizzle-kit generate --config=drizzle-local.config.ts   
npx wrangler d1 migrations apply ulemankita_db --local --persist-to=./src/db/local-db
npx drizzle-kit studio --config=drizzle-local.config.ts
```