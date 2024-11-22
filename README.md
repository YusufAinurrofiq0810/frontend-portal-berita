This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisit

Please make sure that [Node.js](https://nodejs.org/en/download/package-manager) (version 18.17 or later)

## Getting Started

After clone this repository, you need to install the dependencies like :

```bash
npm install
```

then, you need to go `src/constants/api-path.ts` then replace value of `baseUrl` with your own api like :

```ts
const baseUrl = "http://127.0.0.1:8000";
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> [!NOTE]
> there is one bug that you can find after login. user data after login has not been retrieved and you can **refresh** so that the bug can be solved.
