# 🚀 Next.js + TypeScript + API Generator

## 🛠️ Project Overview
This is a **starter template** for Next.js projects with:
- **Next.js** (13+)
- **TypeScript** for type safety
- **OpenAPI Generator** (Swagger) for automatic API Client generation
- **Plop.js** for scaffolding components
- **Redux** for global state management
- **Tailwind CSS + Antd** for css framework

## 📦 Installation
```bash
pnpm install
```

## 🚀 Run Development
```bash
pnpm run dev
```

## ⚙️ API Client Generation
To regenerate API clients from OpenAPI spec:
```bash
pnpm apigen
```

## 🏗️ Generation Component With Template Plop.js (Option)
```bash
pnpm generate
```

## 📂 Project Structure
```
/project-root
│── enviroment            # Environment file
│── next.config.js        # Next.js configuration file
│── package.json          # Dependencies and scripts
│── pnpm-lock.yaml        # pnpm lock file
│── tsconfig.json         # TypeScript configuration
│── tailwind.config       # Tailwind configuration
│── public/               # Static assets (images, icons, fonts, etc.)
│── src/
├── components/           # Reusable UI Components
    ├── pages/            # Next.js Pages Routes ()
    ├      ├── Feature    ...
    ├      ├── Feature    # Feature Component
    ├      ├── Feature    ...
    ├── services/         # API Services
    ├── hooks/            # Custom React Hooks
    ├── styles/           # Style Sheet
    ├── utils/            # Utility functions (formatting, constants, etc.)
    ├      ├── stores     # Global State Management
    ├── templates/        # Plop.js Templates for scaffolding

```





## 📌 License
This is an Demo for Next.js projects.
# pl-nextjs-demo
