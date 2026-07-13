# Project Setup & Configuration Instructions

This guide provides step-by-step instructions to set up **TypeScript**, **Tailwind CSS**, and **shadcn CLI** inside the Vite React application.

---

## 1. Convert to TypeScript

Since the project is currently in JavaScript, follow these steps to add full TypeScript support:

### Step 1.1: Install TypeScript Dependencies
Run the following command inside the `react-app` directory:
```bash
npm install -D typescript @types/react @types/react-dom @types/node vite-tsconfig-paths
```

### Step 1.2: Add TypeScript Configurations
Create a `tsconfig.json` file in the root of the `react-app` directory:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping for shadcn */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create a `tsconfig.node.json` file in the same directory:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

### Step 1.3: Update Vite Config
Rename `vite.config.js` to `vite.config.ts` and configure path alias resolution:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Step 1.4: Rename Files
Rename the `.jsx` files in `src/` to `.tsx`:
- `src/main.jsx` -> `src/main.tsx`
- `src/App.jsx` -> `src/App.tsx`
- Rename component and page files as needed.
- Update the `<script type="module" src="/src/main.jsx"></script>` reference in `react-app/index.html` to point to `/src/main.tsx`.

---

## 2. Set Up Tailwind CSS Path Aliases

Vite uses the path alias configuration under `resolve.alias` in `vite.config.ts` so that paths like `@/components/ui/button` resolve correctly.
In Tailwind CSS, ensure that the content paths in `tailwind.config.js` cover all TSX/JSX source files:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 3. Initialize shadcn via shadcn CLI

shadcn CLI makes it easy to add high-quality primitives directly to your codebase.

### Step 3.1: Run CLI Initialization
Run the initialization command inside the `react-app` directory:
```bash
npx shadcn-ui@latest init
```

### Step 3.2: Configure the Prompt Choices
When prompted by the CLI, select the following options:
* **Style**: `Default`
* **Base color**: `Slate` (or matching custom brand color)
* **CSS variables**: `Yes`
* **Global CSS file**: `src/index.css`
* **Path to components**: `@/components`
* **Path to utility functions**: `@/lib/utils`
* **React Server Components**: `No`

This creates a `components.json` file in your root and installs utility packages like `tailwind-merge` and `clsx` automatically.

---

## Why Is the Default Path `/components/ui` Important?

When utilizing shadcn, components are organized in a standard structure where:
1. **General/Primitive Components** (buttons, inputs, dialogs, tooltips, etc.) reside in `@/components/ui`.
2. **Feature Components** (sidebar, headers, card grids) reside in `@/components`.

### Key Reasons:
* **Registry Imports**: The CLI is preconfigured to install components directly into `components/ui`. If you don't use this folder, automatic CLI commands like `npx shadcn-ui add dialog` will generate files at the wrong paths or fail to compile without custom configuration modifications.
* **Separation of Concerns**: It prevents polluting the main components directory with atomic blocks (primitives) versus high-level layouts.
* **Universal Standard**: Other developer agents, code generators, and community templates expect this directory layout, making pair programming much more reliable and standard.
