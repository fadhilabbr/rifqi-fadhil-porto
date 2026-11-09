<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Development & Agent Guidelines

Selamat datang di repository **rifqi-fadhil-project**. Panduan ini dirancang untuk setiap AI Agent dan developer agar memahami arsitektur, konvensi kode, teknologi, serta aturan kerja yang berlaku di proyek ini. Proyek ini menerapkan **Clean Architecture** dengan folder `app` berada di dalam direktori `src/`.

---

## 1. Project Overview & Tech Stack

| Komponen | Spesifikasi / Tools |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) 16 (App Router di `src/app`) |
| **Architecture** | **Clean Architecture** (Domain, Application, Infrastructure, Presentation) |
| **Library UI** | [React](https://react.dev/) 19 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config) |
| **Package Manager** | `npm` (menggunakan `package-lock.json`) |
| **Linter** | ESLint 9 (Flat Config `eslint.config.mjs`) |
| **Path Alias** | `@/*` diarahkan ke `./src/*` |

---

## 2. Clean Architecture Structure

Struktur direktori proyek dirancang dengan pemisahan tanggung jawab yang ketat (*Separation of Concerns*) dan kepatuhan terhadap aturan dependensi (*Dependency Rule* — dependensi kode hanya boleh mengarah ke dalam):

```text
rifqi-fadhil-project/
├── src/
│   ├── app/                      # Next.js App Router (Routing, Layouts, Server Actions)
│   │   ├── favicon.ico
│   │   ├── globals.css           # Tailwind CSS v4 setup & theme variables
│   │   ├── layout.tsx            # Root layout & font definition
│   │   └── page.tsx              # Home page
│   │
│   ├── domain/                   # Enterprise Business Rules (Pure TS, Framework-Agnostic)
│   │   ├── entities/             # Model domain & entitas bisnis (e.g. User.ts, Product.ts)
│   │   └── repositories/         # Kontrak / Interface repository (e.g. IUserRepository.ts)
│   │
│   ├── application/              # Application Business Rules (Use Cases & Orchestration)
│   │   ├── use-cases/            # Use cases / interactor logika aplikasi (e.g. GetUserProfile.ts)
│   │   ├── dto/                  # Data Transfer Objects untuk input/output
│   │   └── interfaces/           # Interface service aplikasi (e.g. INotificationService.ts)
│   │
│   ├── infrastructure/           # Frameworks, Drivers, & External Systems
│   │   ├── repositories/         # Implementasi repositori nyata (e.g. HttpUserRepository.ts)
│   │   └── services/             # Integrasi eksternal (API Client, Database, Storage, dll.)
│   │
│   ├── presentation/             # UI Components & State Management
│   │   ├── components/
│   │   │   ├── ui/               # Primitive/atom UI components (Button, Input, Card, dll.)
│   │   │   └── shared/           # Composite components (Navbar, Footer, Modal, dll.)
│   │   ├── hooks/                # Custom React hooks
│   │   └── context/              # React Context / State stores
│   │
│   └── shared/                   # Cross-Cutting Concerns
│       ├── types/                # Shared TypeScript types & utility types
│       ├── utils/                # Helper functions murni (formatting, sanitizing, dll.)
│       └── constants/            # Global constants & configuration values
│
├── public/                       # Static assets (images, icons, svgs)
├── AGENTS.md                     # Petunjuk untuk AI agent
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json
└── tsconfig.json                 # TypeScript configuration (Path alias: @/* -> ./src/*)
```

---

## 3. Clean Architecture Layer Responsibilities

### A. Domain Layer (`src/domain/`)
- **Tanggung Jawab:** Menyimpan entitas inti dan aturan bisnis dasar.
- **Aturan Ketat:** **Zero External Dependencies.** Dilarang mengimpor React, Next.js, Axios, Prisma, atau framework apa pun.
- **Isi:** Entity types/classes dan interface repositori (misal: `interface IUserRepository { findById(id: string): Promise<User>; }`).

### B. Application Layer (`src/application/`)
- **Tanggung Jawab:** Mengorkestrasi aliran data ke dan dari entitas domain, serta menjalankan *use case* bisnis.
- **Aturan:** Hanya boleh bergantung pada `domain` dan `shared`. Tidak boleh menyentuh UI/React ataupun implementasi teknis database secara langsung.
- **Isi:** Use case functions/classes (misal: `GetUserProfileUseCase`), DTO (Data Transfer Objects).

### C. Infrastructure Layer (`src/infrastructure/`)
- **Tanggung Jawab:** Mengurus detail teknis eksternal seperti HTTP requests, database access, SDK pihak ketiga, local storage.
- **Aturan:** Mengimplementasikan kontrak repositori dari `domain/repositories/` (misal: `class HttpUserRepository implements IUserRepository`).

### D. Presentation Layer (`src/presentation/` & `src/app/`)
- **`src/presentation/`:** Berisi komponen React reusable (`components/ui`, `components/shared`), hooks presentasi, dan state context.
- **`src/app/`:** Berperan sebagai **Controller/Entry Point** pada Next.js App Router:
  - Menerima request pengguna (route URL, Server Actions, Route Handlers).
  - Memanggil *Use Case* dari `application/`.
  - Merender view menggunakan komponen dari `presentation/`.

### E. Shared Layer (`src/shared/`)
- Berisi kode utilitas murni, formatters, tipe data umum, dan konstanta yang bebas dari dependensi framework spesifik.

---

## 4. Coding Conventions & Best Practices

### A. Next.js 16 & React 19 Guidelines
- **Server Components by Default:**  
  Semua komponen di dalam direktori `src/app/` adalah Server Components secara default. Tambahkan `'use client'` hanya di baris paling atas komponen daun (leaf component) yang memerlukan interaktivitas pengguna (`useState`, `useEffect`, `onClick`).
- **Asynchronous Request APIs:**  
  Pada Next.js 16, `params`, `searchParams`, `cookies()`, dan `headers()` bersifat asynchronous:
  ```tsx
  // Contoh penanganan asynchronous params di Page / Layout
  interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }

  export default async function DetailPage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const query = await searchParams;
    return <div>ID: {id}</div>;
  }
  ```
- **Server Actions:**  
  Gunakan direktif `'use server'` untuk fungsi mutasi data di sisi server yang bertindak sebagai orkestrator use case.
- **Font & Images:**  
  Gunakan `next/font` (Geist di `src/app/layout.tsx`) dan komponen `next/image` untuk performa optimal.

### B. TypeScript Conventions
- Path alias menggunakan `@/*` yang merujuk ke `./src/*` (contoh: `@/domain/entities/user`, `@/presentation/components/ui/button`).
- Dilarang keras menggunakan tipe `any`. Gunakan `unknown` atau generic types bila data bersifat dinamis.
- Selalu buat interface atau tipe data untuk props, input use case, dan response API.

### C. Tailwind CSS v4 Styling
- Tailwind CSS v4 berbasis CSS-first (`@import "tailwindcss";` di `src/app/globals.css`).
- Konfigurasi variabel tema didefinisikan menggunakan `@theme inline` di `src/app/globals.css`.
- Gunakan utility classes secara terstruktur dan dukung tema gelap (dark mode).

---

## 5. Agent Workflow & Verification

1. **Jaga Blok Otomatis Next.js:** Jangan pernah menghapus blok komentar `<!-- BEGIN:nextjs-agent-rules --> ... <!-- END:nextjs-agent-rules -->`.
2. **Konsultasi Docs Internal:** Periksa `node_modules/next/dist/docs/` jika memerlukan klarifikasi API Next.js 16.
3. **Validasi Berkala:** Jalankan `npm run lint` dan `npm run build` setelah melakukan perubahan arsitektur atau penambahan fitur.
4. **Patuhi Dependency Rule:** Pastikan logika domain dan use case tidak bocor ke komponen UI, dan sebaliknya komponen UI tidak langsung mengakses database/API eksternal tanpa melalui layer yang semestinya.

---

## 6. Useful Commands

| Command | Keterangan |
| :--- | :--- |
| `npm run dev` | Menjalankan development server lokal (`http://localhost:3000`) dengan Turbopack |
| `npm run build` | Membuat production build aplikasi |
| `npm run start` | Menjalankan build production secara lokal |
| `npm run lint` | Menjalankan pemeriksaan linter ESLint |

---

## 7. Language & Tone Guidelines
- Berkomunikasi dengan pengguna menggunakan Bahasa Indonesia yang ramah, jelas, dan profesional.
- Penamaan kode teknis (file, kelas, fungsi, variabel, commit message) menggunakan Bahasa Inggris standar industri (misal: `CreateOrderUseCase`, `fetchUserProfile`).
