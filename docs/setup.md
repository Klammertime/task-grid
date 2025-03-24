# 🧱 Monorepo Setup Guide: Interactive Data Grid

> This guide walks through how to create a pluggable, type-safe data grid using a modern monorepo setup.  
> Includes React + Vite frontend, Node.js + Express backend, shared TypeScript packages, and internal tooling.  
> ✅ Updated to support **Yarn 4 Plug'n'Play**, **TypeScript 5.x**, and **VS Code integration**.

---

## 🧰 Tools Used

- [Yarn Workspaces (v4+)](https://yarnpkg.com/features/workspaces)
- [Turborepo](https://turbo.build/)
- [React + Vite](https://vitejs.dev/)
- [Node.js + Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- Husky + Commitlint
- VS Code + `.yarn/sdks`

---

## 📂 Directory Structure

```
data-grid/
├── apps/
│   ├── web/            → React frontend
│   └── server/         → Node.js + Express backend
├── packages/
│   ├── grid-core/      → Shared types and plugin registry
│   └── ui/             → Shared UI components
├── docs/               → Architecture, setup, assumptions, etc.
├── .vscode/            → VS Code TypeScript & ESLint config
├── .husky/             → Git hooks (commit-msg)
├── .gitignore
├── commitlint.config.js
├── package.json        → Root monorepo config
├── turbo.json          → Turborepo task runner
├── tsconfig.base.json  → Shared TS config
├── .yarnrc.yml         → Yarn 4 configuration
├── .pnp.cjs            → Plug'n'Play module map
└── .yarn/              → Yarn virtual cache
```

---

## 🛠️ 1. Initialize Root Monorepo

```bash
mkdir data-grid && cd data-grid
yarn init -y
```

Update `package.json`:

```json
{
  "name": "data-grid",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

---

## 🔃 2. Install Turbo

```bash
yarn add -D turbo
```

Create `turbo.json`:

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "tasks": {
    "dev": {
      "cache": false
    },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "outputs": []
    }
  }
}
```

> ✅ `pipeline` was renamed to `tasks` in Turbo v2+

---

## 📁 3. Create Folder Structure

```bash
mkdir -p apps/web/public/avatars
mkdir -p apps/web/src/{components,renderers,editors}
mkdir -p apps/server/src
mkdir -p packages/grid-core/src
mkdir -p packages/ui/src
mkdir docs
```

---

## 🧠 4. Add `tsconfig.base.json` in Root

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "grid-core": ["packages/grid-core/src"],
      "ui": ["packages/ui/src"]
    }
  },
  "exclude": ["node_modules"]
}
```

---

## 📦 5. Set Up Each Package

Each `apps/*` and `packages/*` folder gets:
- A `package.json`
- A `tsconfig.json`

**Example: `packages/grid-core/package.json`**

```json
{
  "name": "grid-core",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts"
}
```

**Example: `packages/grid-core/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

---

## ⚡ 6. Frontend Setup with Vite + React

```bash
cd apps/web
yarn create vite . --template react-ts
```

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'grid-core': path.resolve(__dirname, '../../packages/grid-core/src'),
      'ui': path.resolve(__dirname, '../../packages/ui/src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
```

---

## 🔌 7. Backend Setup with Express

```bash
cd apps/server
yarn add express
yarn add -D ts-node typescript
```

Create `apps/server/src/index.ts`:

```ts
import express from 'express';
import users from './users.json';

const app = express();

app.get('/api/users', (_req, res) => {
  res.json(users);
});

app.listen(3001, () => {
  console.log('Server listening on http://localhost:3001');
});
```

---

## 🔐 8. Git + Husky + Commitlint Setup

```bash
yarn add -D husky @commitlint/cli @commitlint/config-conventional
yarn husky init
```

Manually create `.husky/commit-msg`:

```bash
echo '#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
yarn commitlint --edit "$1"' > .husky/commit-msg

chmod +x .husky/commit-msg
```

Create `commitlint.config.js`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

---

## 🧠 9. TypeScript + VS Code + Yarn PnP Integration (CRUCIAL)

### ✅ Add to `.vscode/settings.json`:

```json
{
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "eslint.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### ✅ Generate SDKs:

```bash
yarn dlx @yarnpkg/sdks vscode
```

This enables `tsserver` and `eslint` to work under Plug'n'Play.

### ✅ VS Code Setup:

- `Cmd + Shift + P → TypeScript: Select TypeScript Version`
- ✅ Select: **Use Workspace Version**
- `Cmd + Shift + P → TypeScript: Restart TS Server`

You should no longer see errors like:

```
react/jsx-runtime not found
tsserver.js doesn't point to a valid install
```

---

## 🧪 Optional: Lock React Types to 18.x

Add this to root `package.json`:

```json
"resolutions": {
  "@types/react": "18.2.8",
  "@types/react-dom": "18.2.4"
}
```

Then:

```bash
rm -rf .yarn/cache yarn.lock
yarn install
```

---

## ✅ Final Commands

```bash
# Install everything
yarn install

# Start frontend
cd apps/web
yarn dev

# Start backend
cd apps/server
yarn ts-node src/index.ts
```

---

## 🧪 Recommended Git Commit Flow

```bash
git add .
git commit -m "chore: scaffold monorepo structure"

# Then:
feat(web): setup vite frontend  
feat(server): add express api  
feat(core): add plugin registry  
build: link workspaces and turbo  
docs: add setup and architecture docs  
```

---

Built with ❤️, TypeScript, and endless battles against red squiggles.
