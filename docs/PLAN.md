# DOKUMEN RENCANA PENYEMPURNAAN KOMPREHENSIF (/plan)
## Portofolio Interaktif "Flight Deck Formal" (`rifqi-fadhil-project`)
**Versi:** 1.0.0-PROD  
**Status:** Siap Eksekusi (Ready for Implementation)  
**Target Arsitektur:** Clean Architecture, Next.js 16 (App Router), React 19, TypeScript (Strict Mode), Tailwind CSS v4  
**Tanggal:** 8 November 2026  

---

## DAFTAR ISI
1. [Ringkasan Eksekutif & Visi Desain "Flight Deck Formal"](#1-ringkasan-eksekutif--visi-desain-flight-deck-formal)
   - 1.1 Visi Desain: Konvergensi Editorial Formal & Avionik Kokpit Modern
   - 1.2 Filosofi Desain: Presisi, Legibilitas, & Umpan Balik Taktil
   - 1.3 Fondasi Arsitektur: Kepatuhan Penuh Clean Architecture & Next.js 16
2. [Audit & Analisis Kesenjangan (Gap Analysis) Menyeluruh](#2-audit--analisis-kesenjangan-gap-analysis-menyeluruh)
   - 2.1 Audit Layer Presentasi & Pengalaman Pengguna (UI/UX)
   - 2.2 Audit Layer Clean Architecture & Pemodelan Data
   - 2.3 Audit Fungsionalitas Formulir Transmisi / Kontak
   - 2.4 Audit Tech Stack, Aset Visual, SEO, Aksesibilitas (a11y), & Performa
3. [Penetapan Prioritas Peningkatan Berdampak Tinggi](#3-penetapan-prioritas-peningkatan-berdampak-tinggi)
   - 3.1 Metodologi Penilaian (Impact vs. Effort Matrix)
   - 3.2 Matriks Prioritas P0 – P4 & Justifikasi Teknis
4. [Roadmap Bertahap & Fase Implementasi](#4-roadmap-bertahap--fase-implementasi)
   - 4.1 Fase 1: Fondasi Clean Architecture, Sistem, & Normalisasi Build
   - 4.2 Fase 2: Interaktivitas UI/UX, Navigasi Mobile, & Cockpit HUD
   - 4.3 Fase 3: Flight Transmission Console (Terminal Kontak Interaktif)
   - 4.4 Fase 4: Optimasi SEO, Aset Tematik, Aksesibilitas, & Performa
5. [Daftar Tugas Terperinci (Actionable Checklists) & Pemetaan Layer](#5-daftar-tugas-terperinci-actionable-checklists--pemetaan-layer)
   - 5.1 Checklist Fase 1: Fondasi & Clean Architecture
   - 5.2 Checklist Fase 2: UI/UX & Interaktivitas Avionik
   - 5.3 Checklist Fase 3: Terminal Transmisi & Server Action
   - 5.4 Checklist Fase 4: SEO, Aset, Aksesibilitas, & Performa
6. [Spesifikasi Kontrak & Antarmuka Teknis (Code Blueprints)](#6-spesifikasi-kontrak--antarmuka-teknis-code-blueprints)
   - 6.1 Domain Entities (`src/domain/entities/`)
   - 6.2 Domain Repositories (`src/domain/repositories/`)
   - 6.3 Application DTOs & Mappers (`src/application/dto/`)
   - 6.4 Application Use Cases (`src/application/use-cases/`)
   - 6.5 Infrastructure Implementations & Composition Root (`src/infrastructure/`)
   - 6.6 Shared Constants, Types, & Utilities (`src/shared/`)
   - 6.7 Presentation Server Actions & View Contracts (`src/app/actions/`)
7. [Strategi Pengujian & Verifikasi (Verification Strategy)](#7-strategi-pengujian--verifikasi-verification-strategy)
   - 7.1 Matriks Verifikasi Lintas Layer
   - 7.2 Skrip Pengujian Otomatis & Perintah CLI
   - 7.3 Kriteria Penerimaan (Acceptance Criteria Checklist)

---

## 1. RINGKASAN EKSEKUTIF & VISI DESAIN "FLIGHT DECK FORMAL"

### 1.1 Visi Desain: Konvergensi Editorial Formal & Avionik Kokpit Modern
Portofolio **"Flight Deck Formal"** (`rifqi-fadhil-project`) dirancang sebagai representasi digital dari profil insinyur perangkat lunak dan pegiat robotika/UAV (*Unmanned Aerial Vehicle*), Rifqi Fadhil Abrar (Teknik Informatika, Universitas Brawijaya). 

Visi utama dari proyek ini adalah **menggabungkan keanggunan formal ala publikasi jurnal penerbangan (*aeronautical editorial journal*) dengan kedalaman instrumentasi kokpit modern (*tactical flight deck & UAV ground control station*)**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   KONSEP DESAIN: FLIGHT DECK FORMAL                   │
├───────────────────────────────────┬────────────────────────────────────┤
│         EDITORIAL FORMAL          │          AVIONIK KOKPIT            │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Tipografi Berita (Newsreader)   │ • Instrumentasi Presisi (IBM Mono) │
│ • Kertas Tekstual Krem (#F6F4EF)  │ • Navigasi Sumbu Z (Altimeter HUD) │
│ • Tata Letak Dokumen Terstruktur  │ • Radar Sweep 360° & Target Lock   │
│ • Takarir Gambar Teknis (Fig. 00) │ • Transisi Siang-ke-Malam Dinamis  │
│ • Nada Bahasa Lugas & Profesional │ • Konsol Radio Transmisi Frekuensi │
└───────────────────────────────────┴────────────────────────────────────┘
```

Website ini tidak hanya menampilkan daftar proyek atau riwayat hidup statis, melainkan menyajikan **pengalaman navigasi penerbangan satu arah (*flight journey*)** dari darat saat fajar hingga jelajah malam hari pada ketinggian 1.200 meter, yang direfleksikan secara langsung oleh perubahan latar langit, posisi matahari/bulan, densitas bintang, kabut atmosfer, serta garis kontur topografi ketinggian.

### 1.2 Filosofi Desain: Presisi, Legibilitas, & Umpan Balik Taktil
1. **Presisi Metrik (*Measurement-Driven*)**: Setiap informasi disajikan dengan penanda telemetri nyata (stempel waktu WIB `Asia/Jakarta`, kode rute bandara WITM-MLG, pembacaan elevasi meter, koordinat azimuth radar, dan status kesiapan operasional).
2. **Legibilitas Hirarkis (*High-Legibility Typography*)**: Memadukan font serif `Newsreader` untuk narasi editorial formal dengan font monospaced `IBM Plex Mono` untuk data instrumentasi, menjamin keterbacaan optimal tanpa mengorbankan estetika aviasi.
3. **Umpan Balik Taktil (*Tactical Cockpit Feedback*)**: Setiap interaksi pengguna—mulai dari klik kartu proyek, penyorotan blip radar, pergeseran jarum altimeter, hingga pengiriman pesan radio—memberikan respon visual dan status instrumen yang terkalibrasi.

### 1.3 Fondasi Arsitektur: Kepatuhan Penuh Clean Architecture & Next.js 16
Implementasi penyempurnaan wajib mematuhi panduan proyek di `AGENTS.md` tanpa kompromi:
- **Clean Architecture 5-Layer**:
  - `src/domain/`: Aturan bisnis murni tanpa dependensi eksternal (zero external imports).
  - `src/application/`: Orkesitrasi use case bisnis dan decoupling data melalui DTO eksplisit.
  - `src/infrastructure/`: Implementasi teknis repositori, adapter penyimpanan, simulasi transmisi, dan *Composition Root* (Dependency Injection).
  - `src/presentation/`: Antarmuka pengguna berbasis komponen modular (`ui/`, `shared/`, `flight-deck/`) dan Server Actions di `src/app/`.
  - `src/shared/`: Konstanta global, utilitas murni, dan tipe data lintas layer.
- **Next.js 16 App Router & React 19**:
  - *Server Components by default*: Hanya daun interaktif (*interactive leaf components*) yang menggunakan direktif `'use client'`.
  - *Asynchronous Request APIs*: Penanganan parameter dan header asinkron.
  - *Tailwind CSS v4*: Pendekatan CSS-first dengan token tema `@theme inline` dan zero inline style leaks di domain.

---

## 2. AUDIT & ANALISIS KESENJANGAN (GAP ANALYSIS) MENYELURUH

Berdasarkan audit teknis independen yang dilakukan oleh tiga tim auditor (*Survey 1: Presentation & UI/UX*, *Survey 2: Clean Architecture & Data*, dan *Survey 3: Tech Stack, Assets, Form, SEO & Performance*), berikut adalah pemetaan kesenjangan aktual pada basis kode saat ini:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      RINGKASAN AUDIT KESENJANGAN                       │
├────────────────────────────────┬───────────────────────────────────────┤
│ Layer / Domain                 │ Kesenjangan Utama (Primary Gaps)      │
├────────────────────────────────┼───────────────────────────────────────┤
│ 1. Presentasi & UI/UX          │ • Kartu proyek href="#" tanpa modal   │
│                                │ • Radar kompetensi pasif & non-target │
│                                │ • Altimeter ruler tidak dapat diklik  │
│                                │ • Navigasi mobile hilang di <= 700px  │
│                                │ • Benturan kontras panel saat malam   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 2. Clean Architecture & Data   │ • UI mengimpor Domain Entity langsung │
│                                │ • Domain tercemar CSS {left, top}     │
│                                │ • DTO bersifat anemic (alias identik) │
│                                │ • page.tsx coupling ke repo konkret   │
│                                │ • Folder shared/ & services/ kosong   │
├────────────────────────────────┼───────────────────────────────────────┤
│ 3. Fungsionalitas Transmisi    │ • Hanya ada mailto & copy clipboard   │
│                                │ • Belum ada entitas Transmission      │
│                                │ • Belum ada Use Case & Server Action  │
│                                │ • Ketiadaan validasi Zod form kontak  │
├────────────────────────────────┼───────────────────────────────────────┤
│ 4. Tech Stack & Performa       │ • Build fail: @tailwindcss/turbopack  │
│                                │ • Font via @import CSS (bukan next)   │
│                                │ • public/ hanya aset boilerplate SVG  │
│                                │ • Minim SEO: og, sitemap, JSON-LD     │
│                                │ • Scroll telemetry memicu re-render   │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

### 2.1 Audit Layer Presentasi & Pengalaman Pengguna (UI/UX)

#### Temuan 1: Kartu Proyek Statis Tanpa Dialog/Drawer Studi Kasus
- **Lokasi Kode**: `src/presentation/components/flight-deck/ProjectsSection.tsx:31-35`
- **Fakta**: Kartu proyek dirender menggunakan tag anchor `<a className="pcard ... font-sans" href={project.caseStudyUrl}>` dengan nilai `caseStudyUrl: '#'` di repositori statis.
- **Dampak Pengguna**: Ketika pengunjung mengklik kartu proyek untuk melihat arsitektur teknis, sistem UAV, atau kode sumber, layar hanya melompat ke posisi atas halaman (`#`). Tidak tersedia modal, drawer, atau pop-up yang menyajikan studi kasus mendalam (latar belakang masalah, diagram alur, tech stack badges, screenshot, repositori GitHub, maupun tautan demo live).

#### Temuan 2: Radar Kompetensi Pasif Tanpa Interaktivitas Dua Arah (*Two-Way Target Lock*)
- **Lokasi Kode**: `src/presentation/components/flight-deck/CompetencyRadarSection.tsx:32-62`
- **Fakta**: Elemen radar diberi atribut `aria-hidden="true"` dan hanya berfungsi sebagai animasi rotasi CSS pasif. Blip radar tidak merespons *hover*, tidak memunculkan *tooltip* koordinat azimuth/jarak, dan tidak ada hubungan timbal balik (*two-way binding*) ketika pengguna mengarahkan kursor pada daftar kartu kompetensi di sisi kanan.
- **Dampak Pengguna**: Pengalaman taktis instrumen kokpit hilang; radar hanya menjadi ornamen latar belakang tanpa nilai guna informasi teknis.

#### Temuan 3: Ketiadaan Navigasi Seluler pada Viewport `<= 700px`
- **Lokasi Kode**: `src/app/globals.css:380-384`
- **Fakta**: Aturan CSS media query menyembunyikan navigasi atas secara mutlak:
  ```css
  @media (max-width: 700px) {
    .alt-hud { display: none !important; }
    .navwrap { display: none !important; }
  }
  ```
  Di sisi lain, `FlightHeader.tsx` tidak memiliki komponen alternatif (seperti hamburger menu button, mobile cockpit drawer, atau floating action dock).
- **Dampak Pengguna**: Lebih dari 50% pengunjung mobile kehilangan total akses navigasi internal antar seksi (`#s1`, `#s2`, `#s3`, `#s4`).

#### Temuan 4: Altitude Ruler Bersifat Pasif (Non-Interactive Scrubber)
- **Lokasi Kode**: `src/presentation/components/flight-deck/AltitudeRuler.tsx:11-37`
- **Fakta**: Komponen penggaris elevasi di sisi kanan hanya menerima prop `markerTop` dan `altitudeText` untuk animasi posisi jarum needle. Garis skala ketinggian tidak memiliki *hit area* klik untuk navigasi cepat (*quick-scrubber jump-to-section*), dan tidak ada penanda label numerik elevasi (0m, 300m, 600m, 900m, 1200m).
- **Dampak Pengguna**: Pengguna tidak dapat melompat langsung ke seksi tertentu menggunakan instrumen altimeter.

#### Temuan 5: Benturan Kontras Visual Panel Kertas pada Mode Malam (*Night Mode Contrast Clash*)
- **Lokasi Kode**: `src/app/globals.css:181-186` dan `src/presentation/components/flight-deck/SkyBackground.tsx:21-23`
- **Fakta**: Latar belakang langit bertransformasi mulus dari siang (`#DDE5EC`) menjadi malam pekat (`#0E131D`) seiring scroll menuju Seksi 03 dan 04. Namun, kartu kontainer `.panel` tetap mempertahankan warna latar krem kertas terang `var(--paper)` (`#F6F4EF`), menciptakan benturan kontras (*jarring visual clash*) yang menyilaukan mata dan merusak estetika *tactical cockpit*.

---

### 2.2 Audit Layer Clean Architecture & Pemodelan Data

#### Temuan 1: Kebocoran Dependensi Layer Presentasi ke Entitas Domain
- **Lokasi Kode**:
  - `src/presentation/components/flight-deck/HeroSection.tsx:5`
  - `src/presentation/components/flight-deck/ProjectsSection.tsx:4`
  - `src/presentation/components/flight-deck/CompetencyRadarSection.tsx:4`
  - `src/presentation/components/flight-deck/ExperienceSection.tsx:4`
  - `src/presentation/components/flight-deck/ContactSection.tsx:4`
- **Fakta**: Komponen UI mengimpor `Profile`, `Project`, `CompetencyItem`, dan `ExperienceItem` langsung dari `@/domain/entities/Portfolio`.
- **Dampak Arsitektur**: Melanggar *Dependency Rule*. Komponen UI diikat langsung pada struktur entitas domain, menyebabkan *ripple effect* ketika aturan persistensi atau model domain berubah di masa mendatang.

#### Temuan 2: Pencemaran Tata Letak CSS ke dalam Entitas Domain
- **Lokasi Kode**: `src/domain/entities/Portfolio.ts:14-26`
- **Fakta**: Entitas domain memuat tipe tata letak visual:
  ```ts
  export interface RadarBlip {
    left: string;   // Contoh: '64%'
    top: string;    // Contoh: '24%'
    delay?: string; // Contoh: '-0.6s'
  }
  export interface CompetencyItem {
    id: string;
    category: string;
    color: string;  // Contoh: '#2A5D8A'
    skills: string;
    blip: RadarBlip;
  }
  ```
- **Dampak Arsitektur**: Melanggar prinsip *Enterprise Business Rules Purity*. Domain tercemar oleh koordinat persentase CSS Cartesian dan kode warna inline. Kalkulasi posisi polar/Cartesian seharusnya berada di Application Mapper atau UI Helper.

#### Temuan 3: DTO Bersifat Anemic (Type Alias Tanpa Kontrak Pemisah)
- **Lokasi Kode**: `src/application/dto/PortfolioDTO.ts:1-4`
- **Fakta**: Isi file hanyalah:
  ```ts
  import type { PortfolioData } from '@/domain/entities/Portfolio';
  export type PortfolioDTO = PortfolioData;
  ```
- **Dampak Arsitektur**: DTO tidak berfungsi sebagai data transfer boundary nyata. Tidak ada pemetaan, pemfilteran field sensitif, atau formatting atribut.

#### Temuan 4: Instansiasi Konkret Langsung di App Router Tanpa Composition Root
- **Lokasi Kode**: `src/app/page.tsx:8-10`
- **Fakta**: Halaman Server Component melakukan:
  ```ts
  const repository = new StaticPortfolioRepository();
  const getPortfolioData = new GetPortfolioDataUseCase(repository);
  const portfolioData = await getPortfolioData.execute();
  ```
- **Dampak Arsitektur**: Kontroler halaman terikat erat (*tightly coupled*) pada implementasi repositori statis tertentu. Jika beralih ke REST API, database Supabase/Prisma, atau Headless CMS, seluruh kontroler halaman harus diubah manual alih-alih memanfaatkan *Dependency Injection / Factory*.

#### Temuan 5: Kekosongan Modularitas di `src/shared/`, `src/infrastructure/services/`, dan `src/presentation/components/ui/`
- **Fakta**: Seluruh folder berikut hanya memuat file `.gitkeep`:
  - `src/shared/constants/` (konstanta rute aviasi ter-hardcode di UI)
  - `src/shared/utils/` (kalkulasi telemetri bercampur di hooks)
  - `src/shared/types/` (tipe status telemetri tidak terstandarisasi)
  - `src/infrastructure/services/` (tidak ada service transmisi/kontak)
  - `src/presentation/components/ui/` (tidak ada komponen tombol, modal, badge modular)
  - `src/presentation/components/shared/` (navbar dan footer berada di folder lokal `flight-deck/`)

---

### 2.3 Audit Fungsionalitas Formulir Transmisi / Kontak

#### Temuan: Ketiadaan Terminal Transmisi Radio yang Fungsional
- **Lokasi Kode**: `src/presentation/components/flight-deck/ContactSection.tsx:34-58`
- **Fakta**: Kontak saat ini hanya menyediakan tautan `mailto:rifqifadhil00@gmail.com` dan tombol `Salin Email` via hook `useCopyClipboard`. Sama sekali tidak ada:
  1. Elemen `<form>`, `<input>`, `<textarea>`, atau tombol dispatch.
  2. Entitas `Transmission` atau `RadioMessage` di Domain Layer.
  3. Kontrak repositori/service `ITransmissionService` di Domain Layer.
  4. Use case `SendTransmissionUseCase` di Application Layer.
  5. Skema validasi input (Zod schema) di DTO.
  6. Server Action Next.js 16 (`'use server'`) di App Router.
- **Dampak Pengguna**: Pengunjung tidak dapat mengirimkan pesan, pertanyaan kolaborasi, atau sinyal radio langsung dari situs portofolio, memotong alur konversi pengunjung profesional/perekrut.

---

### 2.4 Audit Tech Stack, Aset Visual, SEO, Aksesibilitas (a11y), & Performa

#### Temuan 1: Kegagalan Build Produksi Turbopack & Konflik PPR di Windows
- **Lokasi Kode**: `next.config.ts:7-14` & `next.config.ts:16-19`
- **Fakta Empiris**:
  1. Konfigurasi loader Turbopack kustom:
     ```ts
     turbopack: {
       rules: {
         "*.css": {
           loaders: ["@tailwindcss/turbopack"],
           as: "*.css",
         },
       },
     },
     ```
     memicu `TurbopackInternalError: Failed to write app endpoint /page (node process exited before we could connect to it with exit code: 0)` pada saat menjalankan `npm run build` di Windows dengan Next.js 16.4.5. Tailwind CSS v4 telah berbasis CSS-first (`@import "tailwindcss";`), sehingga loader Turbopack khusus tersebut usang dan merusak proses build.
  2. Fitur eksperimental `partialPrefetching: true` (Partial Prerendering / PPR) pada Next.js 16.4.5 di Windows memicu fatal crash filesystem:
     ```text
     Error: EPERM: operation not permitted, mkdir '...\.next\server\app\_not-found.segments\_not-found'
       errno: -4048, code: 'EPERM', syscall: 'mkdir'
     Export encountered an error on /_not-found/page: /_not-found, exiting the build.
     ```
     Ketika `partialPrefetching` dinonaktifkan (`partialPrefetching: false` atau dihapus), build static prerender berhasil 100% dengan status `✓ Generating static pages using 5 workers (4/4)` dan exit code `0`.

#### Temuan 2: Pemuatan Font Google Eksternal & Tabrakan Variabel CSS Token
- **Lokasi Kode**: `src/app/globals.css:1-2` & `src/app/globals.css:16-22`
- **Fakta Empiris**:
  1. Font dimuat dengan `@import url('https://fonts.googleapis.com/...');` di `globals.css`, melanggar panduan `AGENTS.md` Bagian 4.A, memblokir rendering jalur kritis CSSOM, memicu Cumulative Layout Shift (CLS), dan menambah round-trip jaringan saat runtime.
  2. Terdapat tabrakan token variabel antara `next/font/google` dan Tailwind CSS v4 `@theme inline`. Blok `@theme inline` saat ini mendefinisikan:
     ```css
     @theme inline {
       --font-serif: 'Newsreader', Georgia, Cambria, serif;
       --font-sans: 'IBM Plex Sans', -apple-system, sans-serif;
       --font-mono: 'IBM Plex Mono', SFMono-Regular, monospace;
     }
     ```
     Jika `next/font/google` menginjeksikan nama variabel yang sama (`--font-serif`), utility `font-serif` Tailwind v4 mengabaikan font Next.js atau menciptakan **referensi sirkular CSS** (`--font-serif: var(--font-serif)`) yang membuat variabel invalid saat komputasi nilai (*invalid at computed-value time*). Solusi wajib: gunakan nama variabel unik di `layout.tsx` (`--font-newsreader`, `--font-ibm-sans`, `--font-ibm-mono`) dan petakan secara eksplisit di `@theme inline`.

#### Temuan 3: Aset Visual Publik Hanya Berisi Template Starter Bawaan
- **Lokasi Kode**: Direktori `public/`
- **Fakta**: Hanya ada `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, dan `window.svg`. `favicon.ico` masih logo default Next.js. Tidak ada favicon bertema instrumen aviasi/reticle, tidak ada badge pilot sayap emas/perak, tidak ada foto profil asli (hanya teks `[Foto profil]` dengan monogram `RF`), dan tidak ada dynamic OpenGraph image.

#### Temuan 4: Kekurangan Metadata SEO, Sitemap, Robots, & JSON-LD
- **Lokasi Kode**: `src/app/layout.tsx:4-9`
- **Fakta**: Metadata hanya memuat `title`, `description`, dan `authors`. Belum memiliki `metadataBase`, `openGraph` lengkap (og:image, og:url, og:locale), `twitter:card`, `sitemap.ts`, `robots.ts`, maupun skema terstruktur `JSON-LD` (`schema.org/ProfilePage` & `schema.org/Person`).

#### Temuan 5: Masalah Aksesibilitas (a11y) & Keyboard Navigation
- **Fakta**:
  - Tidak ada tautan lewati ke konten utama (*Skip to main content link*) untuk pengguna navigasi keyboard atau *screen reader*.
  - Tidak ada pengelolaan fokus (*focus trap / restore*) karena belum adanya dialog modal.
  - Kartu proyek dengan `href="#"` melanggar konvensi semantik aksesibilitas.

#### Temuan 6: Bottleneck Performa Render Scroll Telemetri
- **Lokasi Kode**: `src/presentation/hooks/useScrollTelemetry.ts` & `FlightDeckView.tsx`
- **Fakta**: Perubahan nilai progress scroll memicu pembaruan state React pada setiap frame animasi (`requestAnimationFrame`). Karena state tersebut dipegang oleh komponen induk `FlightDeckView`, maka setiap kali pengguna menggulir halaman, **seluruh section statis (`HeroSection`, `ProjectsSection`, `CompetencyRadarSection`, `ExperienceSection`) dirender ulang secara berkala**.
- **Solusi**: Isolasi state telemetri ke komponen HUD daun (`FlightHeader` dan `AltitudeRuler`), pemanfaatan `React.memo` pada seksi konten statis, dan sinkronisasi variabel CSS `--scroll-progress` langsung ke elemen root DOM.

---

## 3. PENETAPAN PRIORITAS PENINGKATAN BERDAMPAK TINGGI

### 3.1 Metodologi Penilaian (Impact vs. Effort Matrix)
Prioritas peningkatan dinilai berdasarkan empat dimensi terukur:
1. **Dampak Pengguna (UX Impact)**: Seberapa nyata fitur tersebut meningkatkan persepsi profesionalisme, interaktivitas, dan kepuasan pengunjung portofolio.
2. **Kepatuhan Arsitektur (Architecture Integrity)**: Penegakan Clean Architecture, eliminasi kebocoran layer, dan keselarasan dengan pedoman `AGENTS.md`.
3. **Kesiapan Produksi (Production Readiness)**: Keberhasilan build, skor performa Lighthouse, optimasi SEO, dan aksesibilitas WCAG.
4. **Tingkat Kompleksitas (Technical Complexity)**: Upaya refaktor dan dependensi antar komponen.

---

### 3.2 Matriks Prioritas P0 – P4 & Justifikasi Teknis

| ID | Fitur / Komponen | Layer Arsitektur | Prioritas | Justifikasi Teknis | Dampak Pengguna & Sistem |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P0.1** | **Normalisasi Konfigurasi Build Turbopack** | `Infrastructure / Config` (`next.config.ts`) | **P0 (Bloker)** | Menghapus loader `@tailwindcss/turbopack` yang memicu crash sub-process node pada Windows. | **Memulihkan pipeline build produksi** (`npm run build`), syarat mutlak rilis. |
| **P1.1** | **Refaktor Entitas Domain Murni** | `Domain` (`src/domain/entities/`) | **P1 (Kritis)** | Memisahkan tipe CSS visual (`RadarBlip`) dari domain, mendefinisikan entitas `Project`, `Competency`, `Experience`, dan `Transmission` murni. | **Menegakkan Enterprise Business Rules Purity**, mencegah ketergantungan domain pada UI. |
| **P1.2** | **Kontrak Repositori & Service Domain** | `Domain` (`src/domain/repositories/`) | **P1 (Kritis)** | Menyediakan interface `IPortfolioRepository` dan `ITransmissionService`. | Mengisolasi domain dari sumber data fisik (in-memory, REST API, CMS). |
| **P1.3** | **Application DTOs, Mappers, & Zod Schemas** | `Application` (`src/application/dto/`) | **P1 (Kritis)** | Menghitung koordinat radar di Application Mapper; validasi transmisi dengan skema Zod. | Memutus kebocoran import domain di layer presentasi secara permanen. |
| **P1.4** | **Application Use Cases Komprehensif** | `Application` (`src/application/use-cases/`) | **P1 (Kritis)** | Mengimplementasikan `GetPortfolioOverviewUseCase`, `GetProjectDetailUseCase`, dan `SendTransmissionUseCase`. | Mengorkestrasi aturan aplikasi tanpa menyentuh komponen UI React. |
| **P1.5** | **Composition Root (Dependency Injection)** | `Infrastructure` (`src/infrastructure/di/`) | **P1 (Kritis)** | Pabrik instansiasi terpusat (`container.ts`) untuk inject repositori ke use cases. | Membebaskan `src/app/page.tsx` dari instansiasi langsung kelas konkret (*IoC compliance*). |
| **P1.6** | **Interactive Project Detail Modal / Drawer** | `Presentation` (`ui/Modal.tsx`, `flight-deck/ProjectDetailModal.tsx`) | **P1 (Kritis)** | Menggantikan link `href="#"` dengan dialog interaktif studi kasus lengkap, arsitektur, tech badges, live demo, dan source code. | **Peningkatan UX paling signifikan**: pengunjung dapat mendalami rekayasa teknis proyek. |
| **P1.7** | **Mobile Cockpit Navigation & Action Dock** | `Presentation` (`shared/MobileCockpitNav.tsx`, `FlightHeader.tsx`) | **P1 (Kritis)** | Mengembalikan navigasi pada layar `<= 700px` dengan drawer menu taktis aviasi. | **Memulihkan aksesibilitas 100% pengguna seluler** yang sebelumnya hilang total. |
| **P1.8** | **Flight Transmission Console & Server Action** | `Presentation / App Router` (`TransmissionTerminal.tsx`, `actions/transmission.ts`) | **P1 (Kritis)** | Membangun terminal transmisi radio kokpit dengan validasi, Server Action Next.js 16, dan status dispatch telemetri. | Mengaktifkan interaktivitas kontak langsung antara perekrut/klien dan pemilik portofolio. |
| **P2.1** | **Interactive Radar "Target Lock" & Telemetry** | `Presentation` (`CompetencyRadarSection.tsx`) | **P2 (Tinggi)** | Two-way hover binding antara blip radar konsentris dan kartu keahlian (highlight, azimuth, range, level kemahiran). | Mewujudkan nuansa kokpit taktis aviasi nyata yang interaktif dan responsif. |
| **P2.2** | **Interactive Altitude Scrubber** | `Presentation` (`AltitudeRuler.tsx`) | **P2 (Tinggi)** | Menambahkan titik elevasi numerik yang dapat diklik untuk navigasi cepat (*smooth-scroll jump*). | Meningkatkan navigasi cepat antar stasiun elevasi penerbangan. |
| **P2.3** | **Migrasi Font Optimization (`next/font/google`)** | `Presentation / App` (`layout.tsx`, `globals.css`) | **P2 (Tinggi)** | Menghapus `@import url` CSS; memuat `Newsreader`, `IBM Plex Sans`, `IBM Plex Mono` via `next/font`. | Mengeliminasi render-blocking CSSOM, mencegah layout shift (CLS), meningkatkan Core Web Vitals. |
| **P2.4** | **Sentralisasi Shared Constants & Utilities** | `Shared` (`constants/`, `utils/`, `types/`) | **P2 (Tinggi)** | Menyimpan data rute penerbangan, batas altimeter, format WIB, interpolasi warna langit. | Menghilangkan duplikasi konstanta magic strings di berbagai komponen. |
| **P2.5** | **Optimasi Performa Render Scroll Telemetri** | `Presentation` (`useScrollTelemetry.ts`, `FlightDeckView.tsx`) | **P2 (Tinggi)** | `React.memo` pada section statis, decoupling state telemetri ke komponen HUD daun. | Menjamin scrolling lancar 60fps tanpa re-render berlebih pada perangkat berdaya rendah. |
| **P2.6** | **SEO Lengkap, OpenGraph, Sitemap, & JSON-LD** | `Presentation / App` (`layout.tsx`, `sitemap.ts`, `robots.ts`) | **P2 (Tinggi)** | Menambahkan metadata lengkap, Twitter cards, sitemap otomatis, dan schema.org `ProfilePage`. | Meningkatkan keterindeksan Google dan pratinjau sosial media profesional. |
| **P3.1** | **Cockpit Night Vision / Tactical Dark Mode Panel** | `Presentation / Styling` (`globals.css`, `SkyBackground.tsx`) | **P3 (Sedang)** | Menyesuaikan background panel kartu kontainer saat malam hari (`#141923`/90% dengan border avionics). | Menghilangkan benturan visual kontras yang menyilaukan saat scroll mencapai seksi bawah. |
| **P3.2** | **Aviation Iconography & SVG Asset Suite** | `Public / Presentation` (`public/assets/`, `src/app/icon.tsx`) | **P3 (Sedang)** | Favicon reticle aviasi, SVG sayap pilot, stempel inspeksi penerbangan, foto profil representatif. | Memperkuat identitas visual tema "Flight Deck Formal". |
| **P4.1** | **Web Audio Cockpit Telemetry Sound FX (Opsional)** | `Presentation / Hooks` (`useAvionicsAudio.ts`) | **P4 (Penyempurnaan)** | Audio klik instrumen dan morse chirp transmisi menggunakan Web Audio API murni (default mute, respect reduced-motion). | Memberikan sentuhan taktil audio opsional bagi pengguna yang menginginkan pengalaman kokpit penuh. |
| **P4.2** | **Filter Kategori Proyek Aviasi** | `Presentation` (`ProjectsSection.tsx`) | **P4 (Penyempurnaan)** | Tombol filter kategori: *All*, *Robotics & UAV*, *Web Systems*, *Design & Architecture*. | Memudahkan penelusuran portofolio berdasarkan domain spesifik. |

---

## 4. ROADMAP BERTAHAP & FASE IMPLEMENTASI

```
FASING IMPLEMENTASI PENYEMPURNAAN FLIGHT DECK FORMAL
═════════════════════════════════════════════════════════════════════════════════
[ FASE 1: FONDAKSI CLEAN ARCHITECTURE & SISTEM ]
  ├─ Normalisasi next.config.ts (Hapus @tailwindcss/turbopack & nonaktifkan partialPrefetching Windows)
  ├─ Migrasi Font Optimization ke next/font/google (Variabel unik & @theme inline)
  ├─ Domain Entities Murni (Project, Competency, Experience, Transmission, Profile)
  ├─ Domain Repositories (IPortfolioRepository, ITransmissionService)
  ├─ Refaktor Repositori Konkret (StaticPortfolioRepository dengan 5 method baru)
  ├─ Application DTOs (Kalkulasi koordinat radar di mapper, Zod schema & npm install zod)
  ├─ Application Use Cases & Shared Layer (constants, utils, cn.ts, types)
  ├─ Composition Root / DI Container Fase 1 (isolasikan dari layanan transmisi Fase 3)
  └─ Penyelarasan Presentation Glue (FlightDeckView & Sub-seksi migrasi ke PortfolioOverviewDTO)
                         │
                         ▼
[ FASE 2: INTERAKTIVITAS UI/UX & AVIONICS HUD ]
  ├─ Komponen UI Reusable (Modal, Drawer, Badge, Button di presentation/components/ui/)
  ├─ Interactive Project Detail Modal / Drawer (Studi kasus lengkap, arsitektur, tech badges)
  ├─ Mobile Cockpit Navigation Drawer (Pulihkan navigasi smartphone <= 700px)
  ├─ Interactive Radar "Target Lock" & Telemetry Azimuth/Range Hover Binding
  ├─ Interactive Altitude Scrubber (Checkpoints elevasi klik-untuk-scroll)
  └─ Cockpit Night Vision Panel Styling (Harmonisasi tema malam)
                         │
                         ▼
[ FASE 3: FLIGHT TRANSMISSION CONSOLE (FORM KONTAK) ]
  ├─ LoggingTransmissionService di Infrastructure Layer
  ├─ Next.js 16 Server Action (src/app/actions/transmission.ts)
  ├─ TransmissionTerminalForm di ContactSection (LED indicator, Callsign, Frequency, Dispatch)
  └─ Feedback Telemetri Status (STANDBY -> TRANSMITTING -> ACKNOWLEDGED)
                         │
                         ▼
[ FASE 4: SEO, ASET VISUAL, AKSESIBILITAS, & PERFORMA ]
  ├─ SEO Lengkap, Dynamic OpenGraph Image, sitemap.ts, robots.ts, & JSON-LD
  ├─ Aviation Favicon, Reticle Icons, Pilot Badge SVG, Foto Profil Representatif
  ├─ Aksesibilitas: Skip-to-content, ARIA Dialog Focus Trap, Reduced Motion Support
  └─ Optimasi Performa: React.memo, Isolasi Scroll Telemetry, 60fps Profiling
═════════════════════════════════════════════════════════════════════════════════
```

---

### 4.1 Fase 1: Fondasi Clean Architecture, Sistem, & Normalisasi Build
- **Tujuan**: Memastikan pipeline build produksi `npm run build` berjalan mulus, mengeliminasi seluruh kebocoran dependensi antar layer, memurnikan entitas domain dari aturan styling/CSS, serta menyediakan Application DTO dan Use Case yang siap pakai.
- **Waktu Eksekusi**: Fondasi Utama (Milestone 1).
- **Hasil Kunci**:
  1. `next.config.ts` bersih (loader dihapus & `partialPrefetching: false`) mengeliminasi fatal crash EPERM di Windows.
  2. Font `Newsreader`, `IBM Plex Sans`, dan `IBM Plex Mono` dimuat optimal via `next/font/google` dengan variabel unik terpetakan ke `@theme inline` tanpa circular reference.
  3. Domain Layer 100% independen tanpa import framework atau atribut CSS visual.
  4. Application DTO menangani pemetaan data dan kalkulasi radar blip, pustaka `zod` terdaftar di `package.json`.
  5. `StaticPortfolioRepository` mengimplementasikan 5 metode baru mengembalikan data entitas domain murni.
  6. Composition root Fase 1 menyediakan DI bersih tanpa forward dependency trap ke layanan transmisi Fase 3.
  7. `FlightDeckView.tsx` dan sub-komponen seksi sepenuhnya mengonsumsi DTO tanpa mengimpor domain layer.

---

### 4.2 Fase 2: Interaktivitas UI/UX, Navigasi Mobile, & Cockpit HUD
- **Tujuan**: Mengubah tampilan yang sebagian besar statis menjadi kokpit interaktif dinamis yang kaya informasi teknis dan ramah pengguna seluler.
- **Waktu Eksekusi**: Setelah Fase 1 tuntas.
- **Hasil Kunci**:
  1. Kartu proyek dapat diklik untuk membuka modal/drawer studi kasus komprehensif.
  2. Pengguna smartphone (`<= 700px`) memiliki drawer navigasi kokpit lengkap.
  3. Radar penerbangan merespons kursor pengguna dengan animasi "Target Lock" dan pembacaan sudut/jarak telemetri.
  4. Penggaris altimeter dapat diklik untuk berpindah seksi dengan transisi halus.
  5. Kartu panel beradaptasi mulus saat malam tiba tanpa benturan kontras warna.

---

### 4.3 Fase 3: Flight Transmission Console (Terminal Kontak Interaktif)
- **Tujuan**: Menyediakan saluran komunikasi radio interaktif yang menerapkan arsitektur penuh dari Presentation (Server Action), Application (Use Case & DTO), Domain (Entity & Interface), hingga Infrastructure (Service).
- **Waktu Eksekusi**: Setelah Fase 2 tuntas.
- **Hasil Kunci**:
  1. Komponen `TransmissionTerminal` dengan nuansa konsol avionik formal.
  2. Validasi skema Zod dengan pesan peringatan teknis aviasi.
  3. Server Action Next.js 16 (`'use server'`) mengorkestrasi mutasi data secara aman.
  4. Umpan balik status transmisi: `STANDBY`, `TRANSMITTING [CALLSIGN]...`, `ACKNOWLEDGED [ACK-2026-X]`.

---

### 4.4 Fase 4: Optimasi SEO, Aset Tematik, Aksesibilitas, & Performa
- **Tujuan**: Menghantarkan portofolio ke standar kelas produksi tingkat tertinggi dalam hal visibilitas mesin pencari, aksesibilitas universal (WCAG AA), dan efisiensi render runtime.
- **Waktu Eksekusi**: Fase finalisasi sebelum rilis.
- **Hasil Kunci**:
  1. Pratinjau media sosial profesional via OpenGraph image dinamis dan Twitter Card.
  2. Keterindeksan Google sempurna via `sitemap.ts`, `robots.ts`, dan JSON-LD `ProfilePage`.
  3. Favicon kustom reticle aviasi dan aset lencana sayap pilot terpasang.
  4. Pengguna keyboard dan screen reader dapat menavigasi seluruh situs dengan mudah.
  5. Rendering scroll stabil di 60fps tanpa re-render berlebihan pada section statis.

---

## 5. DAFTAR TUGAS TERPERINCI (ACTIONABLE CHECKLISTS) & PEMETAAN LAYER

Setiap tugas disusun dengan standar rekayasa perangkat lunak ketat yang mencakup ID, Nama, Deskripsi Teknis, Target File, Layer Clean Architecture, Dependensi, dan *Definition of Done* (DoD).

### 5.1 Checklist Fase 1: Fondasi & Clean Architecture

#### Task 1.1: Normalisasi Konfigurasi Build Turbopack & Penonaktifan PPR di Windows
- **ID**: `T1.1`
- **Nama Tugas**: Normalisasi `next.config.ts` untuk Kompatibilitas Turbopack Windows & Eliminasi Crash EPERM
- **Deskripsi Teknis**:
  - Hapus konfigurasi aturan loader eksplisit `@tailwindcss/turbopack` di `next.config.ts` yang memicu kegagalan spawn proses node pada runtime Turbopack Windows di Next.js 16 (`TurbopackInternalError`).
  - Nonaktifkan fitur eksperimental `partialPrefetching: true` (atur `partialPrefetching: false` atau hilangkan dari `nextConfig.experimental`) untuk mengeliminasi fatal crash `EPERM -4048: operation not permitted, mkdir '...\_not-found.segments\_not-found'` yang terjadi saat Turbopack static prerender worker menyusun rute `/_not-found` di Windows.
  - Pertahankan opsi resmi yang stabil seperti `cacheComponents: true` (bila didukung).
- **Target File**: `d:\projects_vsssl\FEEEEEEEEEEE\rifqi-fadhil-project\next.config.ts`
- **Layer**: `Infrastructure / Config`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - Perintah `npm run build` berjalan tanpa melempar `TurbopackInternalError` terkait loader CSS maupun error `EPERM` pada saat ekspor direktori segmen internal `_not-found`.
  - Turbopack berhasil menyusun rute `/` dan seluruh static pages (`✓ Generating static pages using 5 workers (4/4)`) dengan exit code `0`.

#### Task 1.2: Migrasi Font Optimization ke `next/font/google` & Pemetaan Token `@theme inline`
- **ID**: `T1.2`
- **Nama Tugas**: Migrasi Pemuatan Font Google ke `next/font/google` dengan Token Variabel CSS Unik
- **Deskripsi Teknis**:
  - Hapus baris 1 di `src/app/globals.css` (`@import url('https://fonts.googleapis.com/...');`).
  - Di `src/app/layout.tsx`, impor font `Newsreader`, `IBM_Plex_Sans`, dan `IBM_Plex_Mono` dari `next/font/google` dengan konfigurasi nama variabel unik untuk mencegah benturan dan referensi sirkular:
    - `Newsreader`: `variable: '--font-newsreader'`
    - `IBM_Plex_Sans`: `variable: '--font-ibm-sans'`
    - `IBM_Plex_Mono`: `variable: '--font-ibm-mono'`
    dengan konfigurasi `display: 'swap'` dan subset `'latin'`. Terapkan kelas variabel tersebut pada elemen `<html>` atau `<body>`.
  - Di `src/app/globals.css`, perbarui blok `@theme inline` secara eksplisit:
    ```css
    @theme inline {
      --font-serif: var(--font-newsreader), Georgia, Cambria, 'Times New Roman', serif;
      --font-sans: var(--font-ibm-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: var(--font-ibm-mono), SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    ```
    Langkah ini mengeliminasi referensi sirkular CSS (`--font-serif: var(--font-serif)`) dan menjamin font yang di-preload secara lokal oleh Next.js digunakan langsung oleh utility class Tailwind v4 (`font-serif`, `font-sans`, `font-mono`).
- **Target File**: 
  - `d:\projects_vsssl\FEEEEEEEEEEE\rifqi-fadhil-project\src\app\globals.css`
  - `d:\projects_vsssl\FEEEEEEEEEEE\rifqi-fadhil-project\src\app\layout.tsx`
- **Layer**: `Presentation / App Router`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - Tidak ada lagi `@import url` di seluruh file CSS.
  - Font dimuat dengan atribut *pre-loaded self-hosted* oleh Next.js tanpa dependensi jaringan pihak ketiga saat runtime.
  - Blok `@theme inline` memetakan `--font-serif`, `--font-sans`, dan `--font-mono` ke variabel unik `var(--font-newsreader)`, `var(--font-ibm-sans)`, `var(--font-ibm-mono)` tanpa circular reference.
  - Halaman tetap mempertahankan tipografi `font-serif`, `font-sans`, dan `font-mono` tanpa Cumulative Layout Shift (CLS).

#### Task 1.3: Pemodelan Entitas Domain Murni (Pure Domain Entities)
- **ID**: `T1.3`
- **Nama Tugas**: Refaktor & Pemurnian Entitas Domain Bebas Framework dan Styling CSS
- **Deskripsi Teknis**: 
  - Pisahkan entitas ke file modular:
    - `src/domain/entities/Project.ts`: Definisikan entitas proyek lengkap (id, slug, title, role, category, period, status, statusType, description, caseStudyContent, technologies, metrics, demoUrl, repositoryUrl, thumbnailUrl, featured).
    - `src/domain/entities/Competency.ts`: Hapus `RadarBlip` (`left`, `top`, `delay`) dan kode CSS warna inline. Simpan data murni: `id`, `category`, `group`, `skills: readonly string[]`, `proficiencyLevel: 'operational' | 'advanced' | 'experimental'`, `semanticColorKey: string`.
    - `src/domain/entities/Experience.ts`: Definisikan riwayat terstruktur (id, type, title, organization, location, period, isCurrent, description, highlights).
    - `src/domain/entities/Transmission.ts`: Buat entitas transmisi radio (id, senderName, senderCallsign, senderEmail, subject, priority, message, transmittedAt).
    - `src/domain/entities/Profile.ts`: Definisikan profil personal insinyur (name, callsign, title, studentId, university, faculty, studyProgram, email, frequencyCode, locationOrigin, locationCurrent, bioSummary, photoUrl, cvUrl, links).
    - `src/domain/entities/Portfolio.ts`: Re-export secara aman atau sediakan deprecation wrapper.
- **Target File**:
  - `src/domain/entities/Project.ts`
  - `src/domain/entities/Competency.ts`
  - `src/domain/entities/Experience.ts`
  - `src/domain/entities/Transmission.ts`
  - `src/domain/entities/Profile.ts`
  - `src/domain/entities/Portfolio.ts`
- **Layer**: `Domain Layer`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - File dalam `src/domain/entities/` tidak mengimpor modul eksternal apa pun (zero dependencies).
  - Tidak ada atribut bertipe koordinat visual (`left`, `top`, `delay`) atau hex code CSS di dalam entitas domain.

#### Task 1.4: Kontrak Repositori & Service di Domain Layer
- **ID**: `T1.4`
- **Nama Tugas**: Definisi Kontrak Interface `IPortfolioRepository` dan `ITransmissionService`
- **Deskripsi Teknis**: 
  - Buat `src/domain/repositories/IPortfolioRepository.ts` yang mendefinisikan 5 metode pengambilan data terstruktur: `getProfile()`, `getProjects(filter?)`, `getProjectBySlug(slug: string)`, `getCompetencies()`, `getExperiences()`.
  - Buat `src/domain/repositories/ITransmissionService.ts` yang mendefinisikan kontrak pengiriman transmisi radio: `sendTransmission(transmission: Transmission): Promise<TransmissionResult>`.
- **Target File**:
  - `src/domain/repositories/IPortfolioRepository.ts`
  - `src/domain/repositories/ITransmissionService.ts`
- **Layer**: `Domain Layer`
- **Dependensi**: `T1.3`
- **Definition of Done (DoD)**:
  - Seluruh method menggunakan tipe data dari `src/domain/entities/`.
  - Mengembalikan `Promise` untuk kepatuhan I/O asinkron.

#### Task 1.4b: Refaktor Repositori Konkret StaticPortfolioRepository
- **ID**: `T1.4b`
- **Nama Tugas**: Pembaruan Implementasi `StaticPortfolioRepository` Selaras Kontrak Baru
- **Deskripsi Teknis**:
  - Refaktor `src/infrastructure/repositories/StaticPortfolioRepository.ts` agar mengimplementasikan kelima metode dari kontrak `IPortfolioRepository` baru (`getProfile`, `getProjects`, `getProjectBySlug`, `getCompetencies`, `getExperiences`).
  - Gantikan data lama yang tercemar properti visual CSS (`blip`, `delay`, warna inline) menjadi entitas domain murni (`Profile`, `Project`, `Competency`, `Experience`).
  - Masukkan data portofolio autentik lengkap untuk Rifqi Fadhil Abrar (data profil personal dan akademis, 4 proyek nyata, 5 kompetensi radar, 3 riwayat pengalaman).
- **Target File**: `src/infrastructure/repositories/StaticPortfolioRepository.ts`
- **Layer**: `Infrastructure Layer (Repositories)`
- **Dependensi**: `T1.3`, `T1.4`
- **Definition of Done (DoD)**:
  - `StaticPortfolioRepository` mengimplementasikan kelima method pada `IPortfolioRepository` tanpa compile error.
  - Seluruh data yang dikembalikan bertipe entitas domain murni.
  - `npx tsc --noEmit` lolos tanpa error ketidakcocokan tipe.

#### Task 1.5: Pembangunan DTOs, Mappers, & Validasi Zod di Application Layer
- **ID**: `T1.5`
- **Nama Tugas**: Pembuatan Data Transfer Objects, Mapper Kalkulasi Radar, & Skema Zod
- **Deskripsi Teknis**:
  - Jalankan `npm install zod` untuk mendaftarkan pustaka validasi skema Zod secara eksplisit ke dalam `dependencies` pada `package.json`, mencegah error runtime `MODULE_NOT_FOUND` pada instalasi bersih maupun rilis produksi CI/CD.
  - Buat `ProjectDTO.ts`: DTO representasi proyek untuk konsumsi UI.
  - Buat `CompetencyRadarDTO.ts`: **Di sinilah kalkulasi koordinat polar/Cartesian radar blip (`left: string`, `top: string`, `delay: string`, `azimuthDegrees: number`, `rangeKilometers: number`) dilakukan** oleh mapper fungsi murni `mapCompetencyToRadarDTO()`, membebaskan domain dari CSS.
  - Buat `ExperienceDTO.ts` dan `ProfileDTO.ts`.
  - Buat `TransmissionDTO.ts`: Memuat skema Zod `TransmissionInputSchema` untuk validasi format callsign, email frekuensi, prioritas, dan panjang karakter pesan.
  - Buat `PortfolioOverviewDTO.ts` yang menyatukan seluruh DTO untuk halaman utama.
- **Target File**:
  - `package.json`
  - `src/application/dto/ProjectDTO.ts`
  - `src/application/dto/CompetencyRadarDTO.ts`
  - `src/application/dto/ExperienceDTO.ts`
  - `src/application/dto/ProfileDTO.ts`
  - `src/application/dto/TransmissionDTO.ts`
  - `src/application/dto/PortfolioOverviewDTO.ts`
- **Layer**: `Application Layer`
- **Dependensi**: `T1.3`, `T1.4`
- **Definition of Done (DoD)**:
  - `package.json` memuat `zod` di dalam blok `dependencies`.
  - Presentation Layer nantinya hanya mengimpor DTO dari direktori ini, bukan dari domain.
  - Skema Zod tervalidasi dengan penanganan flattening error yang jelas.

#### Task 1.6: Implementasi Use Cases Terfokus di Application Layer
- **ID**: `T1.6`
- **Nama Tugas**: Implementasi Use Case Logika Bisnis Aplikasi
- **Deskripsi Teknis**:
  - `GetPortfolioOverviewUseCase.ts`: Mengambil data dari `IPortfolioRepository` dan memetakannya menjadi `PortfolioOverviewDTO`.
  - `GetProjectDetailUseCase.ts`: Mengambil rincian spesifik satu proyek berdasarkan `slug` atau `id` untuk dialog modal.
  - `SendTransmissionUseCase.ts`: Menerima input data transmisi, memvalidasi aturan bisnis (sanitasi teks, batas frekuensi), membentuk entitas `Transmission`, dan mengeksekusi pengiriman melalui `ITransmissionService`.
- **Target File**:
  - `src/application/use-cases/GetPortfolioOverviewUseCase.ts`
  - `src/application/use-cases/GetProjectDetailUseCase.ts`
  - `src/application/use-cases/SendTransmissionUseCase.ts`
- **Layer**: `Application Layer`
- **Dependensi**: `T1.4`, `T1.5`
- **Definition of Done (DoD)**:
  - Setiap use case menerima repository via constructor injection (*Dependency Inversion*).
  - Use case tidak menyentuh kode presentasi React atau implementasi fisik database.

#### Task 1.7: Sentralisasi Layer Shared (Constants, Utils, Types) & Rekomendasi Utilitas `cn()`
- **ID**: `T1.7`
- **Nama Tugas**: Pengisian Modul Shared untuk Konstanta Aviasi, Utilitas Telemetri, Tipe Global, & Utilitas `cn()`
- **Deskripsi Teknis**:
  - Pasang dependensi pembantu styling: `npm install clsx tailwind-merge` dan daftarkan ke `package.json`.
  - Buat `src/shared/utils/cn.ts` yang menggabungkan `clsx` dan `twMerge` untuk mencegah konflik spesifisitas class Tailwind v4 pada komponen UI atomik di Task 2.1.
  - `src/shared/constants/flight-deck.ts`: Sentralisasi konstanta origin `"Lhokseumawe (WITM)"`, destination `"Malang (MLG / WARA)"`, batas altimeter `1200` meter, rute stasiun `#s1` s/d `#s4`, format tanggal WIB.
  - `src/shared/utils/telemetry.ts`: Fungsi murni interpolasi ketinggian, konversi persentase scroll, format stempel waktu WIB, dan sanitasi input.
  - `src/shared/types/telemetry.ts`: Tipe data status penerbangan (`FlightPhase: 'STANDBY' | 'CLIMB' | 'CRUISE' | 'DESCENT'`, `TelemetryState`).
- **Target File**:
  - `package.json`
  - `src/shared/utils/cn.ts`
  - `src/shared/constants/flight-deck.ts`
  - `src/shared/utils/telemetry.ts`
  - `src/shared/types/telemetry.ts`
- **Layer**: `Shared Layer`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - Tidak ada lagi magic numbers atau string rute yang ter-hardcode secara acak di file presentasi.
  - Utilitas `cn()` siap pakai di `src/shared/utils/cn.ts`.
  - Semua fungsi utilitas bersifat murni (*pure functions*) dan mudah diuji.

#### Task 1.8: Pembentukan Composition Root (DI Container) Tanpa Forward Dependency Trap
- **ID**: `T1.8`
- **Nama Tugas**: Pembuatan Composition Root di `infrastructure/di/container.ts` (Scope Fase 1)
- **Deskripsi Teknis**:
  - Buat factory function terpusat untuk instansiasi repositori konkret (`StaticPortfolioRepository`) dan injeksi ke use cases portofolio di `src/infrastructure/di/container.ts`.
  - **PENTING (Pencegahan Forward Dependency Trap)**: Pada Fase 1, `container.ts` **HANYA** memuat dan mengekspor `getPortfolioRepository()`, `getPortfolioOverview`, dan `getProjectDetail`. Pendaftaran `getTransmissionService()` dan `sendTransmissionUseCase` **DITANGGUHKAN** hingga Fase 3 Task 3.2 setelah kelas `LoggingTransmissionService` selesai diimplementasikan di Task 3.1. Hal ini mencegah error fatal `Cannot find module '../services/LoggingTransmissionService'` saat mengompilasi Fase 1.
  - Modifikasi `src/app/page.tsx` agar menggunakan container ini alih-alih `new StaticPortfolioRepository()` langsung.
- **Target File**:
  - `src/infrastructure/di/container.ts`
  - `src/app/page.tsx`
- **Layer**: `Infrastructure Layer & Presentation Entry Point`
- **Dependensi**: `T1.4b`, `T1.6`
- **Definition of Done (DoD)**:
  - `src/app/page.tsx` bebas dari instansiasi langsung repositori konkret.
  - `container.ts` tidak memiliki referensi impor ke file layanan transmisi Fase 3 yang belum ada.

#### Task 1.8b: Penyelarasan Presentation Glue & Migrasi FlightDeckView ke DTO
- **ID**: `T1.8b`
- **Nama Tugas**: Migrasi `FlightDeckView.tsx` dan Sub-Komponen Seksi ke `PortfolioOverviewDTO`
- **Deskripsi Teknis**:
  - Perbarui interface props di `src/presentation/components/flight-deck/FlightDeckView.tsx` agar menerima `initialData: PortfolioOverviewDTO` (menggantikan tipe anemic `PortfolioDTO` lama).
  - Teruskan prop DTO yang telah didecoupling ke seluruh sub-komponen seksi:
    - `HeroSection.tsx`: menerima `profile: ProfileDTO` (bukan dari `@/domain/entities/Portfolio`).
    - `ProjectsSection.tsx`: menerima `projects: readonly ProjectDTO[]`.
    - `CompetencyRadarSection.tsx`: menerima `competencies: readonly CompetencyRadarDTO[]`.
    - `ExperienceSection.tsx`: menerima `experiences: readonly ExperienceDTO[]`.
    - `ContactSection.tsx`: menerima `profile: ProfileDTO`.
  - Hapus seluruh impor langsung `@/domain/entities/*` di seluruh komponen presentasi tersebut, menggantikannya dengan impor tipe dari `@/application/dto/*`.
- **Target File**:
  - `src/presentation/components/flight-deck/FlightDeckView.tsx`
  - `src/presentation/components/flight-deck/HeroSection.tsx`
  - `src/presentation/components/flight-deck/ProjectsSection.tsx`
  - `src/presentation/components/flight-deck/CompetencyRadarSection.tsx`
  - `src/presentation/components/flight-deck/ExperienceSection.tsx`
  - `src/presentation/components/flight-deck/ContactSection.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T1.5`, `T1.8`
- **Definition of Done (DoD)**:
  - Seluruh komponen presentasi bebas dari impor langsung ke `@/domain`.
  - Perintah `npx ripgrep "from '@/domain" src/presentation` menghasilkan tepat 0 kecocokan.
  - Halaman landing merender seluruh data DTO melalui `FlightDeckView` tanpa type mismatch.

---

### 5.2 Checklist Fase 2: UI/UX & Interaktivitas Avionik

#### Task 2.1: Pembuatan Komponen Atomik Reusable UI
- **ID**: `T2.1`
- **Nama Tugas**: Implementasi Komponen Primitif di `src/presentation/components/ui/` Menggunakan Utilitas `cn()`
- **Deskripsi Teknis**: 
  - Buat komponen reusable dengan tema Flight Deck Formal menggunakan utilitas `cn()` (`src/shared/utils/cn.ts` yang mengombinasikan `clsx` dan `tailwind-merge`) untuk resolusi class Tailwind v4 yang dinamis dan bebas benturan:
    - `Modal.tsx`: Dialog dengan backdrop semi-transparan, penutup tombol ESC, focus trap, dan ARIA attributes (`role="dialog"`, `aria-modal="true"`).
    - `Drawer.tsx`: Slide-over panel dari samping/bawah untuk navigasi mobile kokpit.
    - `Badge.tsx`: Tag avionik status (`active`, `operational`, `classified`).
    - `Button.tsx`: Tombol interaktif dengan varian `.btn-ink`, `.btn-line`, `.btn-tactical`.
- **Target File**:
  - `src/presentation/components/ui/Modal.tsx`
  - `src/presentation/components/ui/Drawer.tsx`
  - `src/presentation/components/ui/Badge.tsx`
  - `src/presentation/components/ui/Button.tsx`
- **Layer**: `Presentation Layer (Atomic UI)`
- **Dependensi**: `T1.5`, `T1.7`
- **Definition of Done (DoD)**:
  - Komponen mendukung aksesibilitas keyboard dan standar ARIA dialog.
  - Seluruh komponen memanfaatkan utilitas `cn()` untuk penggabungan conditional classes tanpa specificity clash.

#### Task 2.2: Implementasi Interactive Project Detail Modal / Drawer
- **ID**: `T2.2`
- **Nama Tugas**: Pengembangan Dialog Studi Kasus Proyek Komprehensif
- **Deskripsi Teknis**: 
  - Buat `ProjectDetailModal.tsx` yang menerima `project: ProjectDTO | null` dan `onClose: () => void`.
  - Tampilkan data mendalam: Judul Proyek, Peran Teknis, Periode, Ringkasan Arsitektur Sistem, Tantangan Rekayasa, Tech Stack Badges, Metrik Kinerja/Hasil, serta Tombol Aksi (Lihat Repositori GitHub & Demo Langsung).
  - Hubungkan ke `ProjectsSection.tsx`: Ubah kartu proyek menjadi elemen interaktif yang memicu pembukaan modal saat diklik.
- **Target File**:
  - `src/presentation/components/flight-deck/ProjectDetailModal.tsx`
  - `src/presentation/components/flight-deck/ProjectsSection.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T2.1`, `T1.5`
- **Definition of Done (DoD)**:
  - Mengklik kartu proyek membuka modal detail tanpa melompat ke atas halaman (`#`).
  - Modal dapat ditutup dengan tombol Close, klik di luar backdrop, atau tombol ESC keyboard.
  - Scroll halaman di belakang modal terkunci (*body scroll lock*) saat modal terbuka.

#### Task 2.3: Mobile Cockpit Navigation Drawer & Action Dock (Layar `<= 700px`)
- **ID**: `T2.3`
- **Nama Tugas**: Pembuatan Navigasi Seluler Kokpit Taktis dengan Auto-Close
- **Deskripsi Teknis**:
  - Hapus aturan `.navwrap { display: none !important }` yang mematikan navigasi di `globals.css`. Ganti dengan kelas responsif modern `hidden md:flex`.
  - Tambahkan tombol menu kokpit HUD (`FlightNavToggle`) di `FlightHeader.tsx` yang hanya muncul di layar `< 768px`.
  - Buat komponen `MobileCockpitNav.tsx` di `src/presentation/components/shared/` yang menampilkan menu melayang taktis dengan tombol cepat menuju `#s1` (Proyek), `#s2` (Kompetensi), `#s3` (Pengalaman), `#s4` (Transmisi), indikator altimeter mini, dan tombol tutup.
  - **Auto-Close on Station Click**: Pasang event handler `onClick` pada setiap tautan stasiun navigasi yang otomatis menutup drawer menu seluler (`setIsOpen(false)`), memastikan drawer tidak menghalangi viewport saat layar bergulir mulus (*smooth-scroll*) ke seksi target. Sediakan pula penutupan otomatis saat klik backdrop dan tombol `Escape`.
- **Target File**:
  - `src/presentation/components/shared/MobileCockpitNav.tsx`
  - `src/presentation/components/flight-deck/FlightHeader.tsx`
  - `src/app/globals.css`
- **Layer**: `Presentation Layer (Shared Navigation)`
- **Dependensi**: `T2.1`
- **Definition of Done (DoD)**:
  - Pengguna pada perangkat mobile memiliki akses penuh ke seluruh seksi halaman.
  - Mengetuk tautan stasiun navigasi secara instan menutup drawer dan mengarahkan tampilan ke seksi tujuan dengan mulus.
  - Animasi pembukaan drawer halus dan ramah sentuhan (*touch-friendly*).

#### Task 2.4: Interactive Radar "Target Lock" & Touch Event Handlers
- **ID**: `T2.4`
- **Nama Tugas**: Interaktivitas Dua Arah Radar Sapuan & Dukungan Sentuhan Layar Penuh
- **Deskripsi Teknis**:
  - Di `CompetencyRadarSection.tsx`, kelola state `activeCompetencyId: string | null`.
  - **Desktop Hover**: Ketika pengguna mengarahkan kursor (`onMouseEnter`) pada salah satu kartu kompetensi, blip radar terkait langsung menyala dengan status "TARGET LOCK", reticle konsentris mengecil pada blip tersebut, dan menampilkan koordinat sudut azimuth dan jarak. Begitu pula sebaliknya saat kursor di atas blip radar.
  - **Mobile Touch Interaction**: Tambahkan handler sentuhan (`onClick` dan `onTouchEnd`) pada setiap blip radar dan kartu kompetensi. Mengetuk blip radar pada layar sentuh mengunci target (*TARGET LOCK*), memunculkan tooltip telemetri instrumen, dan menyorot kartu terkait. Mengetuk kembali atau mengetuk area di luar radar melepaskan kunci target.
  - Tambahkan indikator kemahiran teknis (Level: Operational / Advanced / Experimental).
- **Target File**:
  - `src/presentation/components/flight-deck/CompetencyRadarSection.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T1.5`
- **Definition of Done (DoD)**:
  - Terjadi interaksi dua arah yang mulus antara radar dan daftar keahlian pada mouse hover maupun sentuhan layar sentuh (touch tap).
  - Elemen interaktif radar dilengkapi atribut ARIA yang ramah pembaca layar (`aria-label`, `role="button"`, `tabIndex={0}`).

#### Task 2.5: Interactive Altitude Ruler Quick-Scrubber
- **ID**: `T2.5`
- **Nama Tugas**: Peningkatan Altitude Ruler Menjadi Quick-Scrubber Navigasi
- **Deskripsi Teknis**:
  - Modifikasi `AltitudeRuler.tsx` agar setiap penanda ketinggian (0m = Hero, 300m = Proyek `#s1`, 600m = Radar `#s2`, 900m = Pengalaman `#s3`, 1200m = Transmisi `#s4`) memiliki titik interaktif (*clickable checkpoint*).
  - Tampilkan label elevasi numerik subtil di samping garis penggaris saat di-hover.
  - Mengklik salah satu titik checkpoint akan memicu *smooth-scroll* langsung ke posisi seksi yang bersangkutan.
- **Target File**:
  - `src/presentation/components/flight-deck/AltitudeRuler.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T1.7`
- **Definition of Done (DoD)**:
  - Altitude Ruler berfungsi ganda: sebagai indikator ketinggian pasif sekaligus alat navigasi cepat.

#### Task 2.6: Cockpit Night Vision / Tactical Dark Mode Panel Styling & WCAG AA Inversion
- **ID**: `T2.6`
- **Nama Tugas**: Harmonisasi Warna Panel Kontainer pada Siklus Malam Hari dengan Inversi Kontras Eksplisit
- **Deskripsi Teknis**:
  - Di `globals.css`, tambahkan kelas pendukung `.panel-night` yang aktif secara otomatis seiring bertambahnya elevasi/scroll malam hari (Seksi 03 dan 04) atau melalui deteksi kontras dinamis.
  - Terapkan **inversi warna teks dan border secara eksplisit** untuk menjamin rasio kontras teks terhadap latar belakang mematuhi standar WCAG AA (minimal 4.5:1, bahkan > 9:1):
    - Latar belakang panel: *tactical dark slate* `rgba(18, 22, 30, 0.92)` dengan efek `backdrop-blur-md`.
    - Teks judul utama (`h2`, `h3`, `h4`, `.text-ink`, `.meta-k`): otomatis dibalik menjadi `#F8FAFC` (slate-50) atau `#F1F5F9` (slate-100), menghasilkan rasio kontras > 13:1 terhadap latar belakang gelap.
    - Teks paragraf/keterangan (`p`, `span`, `.meta-v`): dibalik menjadi `#CBD5E1` (slate-300) atau `#94A3B8` (slate-400), rasio kontras > 5.5:1.
    - Border instrumen & pembatas (`hr`, `.border-line`): disesuaikan menjadi `rgba(226, 232, 240, 0.18)` dengan aksen taktis amber `rgba(245, 158, 11, 0.4)` atau cyan `rgba(56, 189, 248, 0.35)`.
    - Lencana taktis (`.badge-tactical`): latar `rgba(245, 158, 11, 0.18)`, teks amber `#FBBF24`, border `rgba(245, 158, 11, 0.4)`.
- **Target File**:
  - `src/app/globals.css`
  - `src/presentation/components/flight-deck/SkyBackground.tsx`
- **Layer**: `Presentation Layer / Styling`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - Seluruh teks dan elemen dalam `.panel-night` memiliki rasio kontras terhadap latar belakang minimal 4.5:1 (memenuhi standar WCAG AA).
  - Tidak ada lagi benturan visual kontras menyilaukan antara langit malam pekat dan kartu konten, serta terbebas dari masalah teks gelap di atas latar gelap.

---

### 5.3 Checklist Fase 3: Terminal Transmisi & Server Action

#### Task 3.1: Implementasi Layanan Transmisi di Infrastructure Layer
- **ID**: `T3.1`
- **Nama Tugas**: Pembuatan `LoggingTransmissionService`
- **Deskripsi Teknis**: Implementasikan kontrak `ITransmissionService` di `src/infrastructure/services/LoggingTransmissionService.ts`. Layanan ini mencatat telemetri pesan transmisi yang masuk, melakukan simulasi latensi jaringan radio (delai 600–900ms), menghasilkan kode pengakuan unik (*Clearance ACK-2026-XXXX*), dan menyimpan riwayat pesan secara aman di memori/log server.
- **Target File**:
  - `src/infrastructure/services/LoggingTransmissionService.ts`
- **Layer**: `Infrastructure Layer`
- **Dependensi**: `T1.4`
- **Definition of Done (DoD)**:
  - Mengimplementasikan seluruh method dari `ITransmissionService`.
  - Menghasilkan respon sukses dengan ID transmisi yang dapat dilacak.

#### Task 3.2: Ekstensi DI Container & Pembuatan Server Action Transmisi Next.js 16
- **ID**: `T3.2`
- **Nama Tugas**: Ekstensi `container.ts` & Pembuatan Server Action `sendTransmissionAction`
- **Deskripsi Teknis**:
  - **Ekstensi DI Container**: Perbarui `src/infrastructure/di/container.ts` dengan mengimpor `LoggingTransmissionService` (yang telah dibuat di Task 3.1) dan menambahkan method `getTransmissionService(): ITransmissionService` serta mendaftarkan `sendTransmission: new SendTransmissionUseCase(trans)` ke dalam factory use case `getPortfolioUseCases()`. Langkah ini secara aman menyambungkan layanan transmisi setelah implementasi konkretnya tersedia.
  - **Server Action**: Buat file `src/app/actions/transmission.ts` dengan direktif `'use server'`.
  - Server Action memanggil `getPortfolioUseCases().sendTransmission` dari DI Container.
  - Memvalidasi payload data via `TransmissionInputSchema` (Zod), mengeksekusi use case, dan mengembalikan status terstruktur:
    ```ts
    type TransmissionActionResult = 
      | { success: true; transmissionId: string; acknowledgementCode: string; message: string }
      | { success: false; errors?: Record<string, string[]>; message: string };
    ```
- **Target File**:
  - `src/infrastructure/di/container.ts`
  - `src/app/actions/transmission.ts`
- **Layer**: `Infrastructure & Presentation Layer / Server Action`
- **Dependensi**: `T1.6`, `T1.8`, `T3.1`
- **Definition of Done (DoD)**:
  - `container.ts` berhasil diperluas dengan instansiasi `LoggingTransmissionService` tanpa compile error.
  - Menggunakan fitur native Server Action Next.js 16 tanpa memerlukan endpoint Express atau route handler terpisah.
  - Menangani error validasi Zod dan mengembalikan pesan status terstruktur yang ramah pengguna.

#### Task 3.3: Komponen UI `TransmissionTerminalForm` di `ContactSection`
- **ID**: `T3.3`
- **Nama Tugas**: Pengembangan Konsol Radio Transmisi di `ContactSection`
- **Deskripsi Teknis**:
  - Rancang form transmisi dengan estetika kokpit aviasi formal:
    - Input Callsign / Nama Pengirim (dengan takarir `IDENT`).
    - Input Frekuensi Kontak / Email (dengan takarir `FREQ`).
    - Pilihan Prioritas Transmisi (Routine / Priority / Flight Clearance).
    - Textarea Pesan Dispatch (dengan takarir `DISPATCH LOG`).
    - Indikator Sinyal LED interaktif (Hijau = Standby, Kuning Berkedip = Transmitting, Cyan = Acknowledged).
    - Tombol Kirim Transmisi bertema *Tactical Launch Switch*.
  - Sambungkan form ke `sendTransmissionAction` menggunakan hook React 19 `useActionState` atau `useTransition`.
  - Tampilkan umpan balik visual instrumen saat transmisi berhasil diterima (`ROGER. CLEARANCE ACK-2026-X TRANSMITTED`).
- **Target File**:
  - `src/presentation/components/flight-deck/TransmissionTerminalForm.tsx`
  - `src/presentation/components/flight-deck/ContactSection.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T3.2`
- **Definition of Done (DoD)**:
  - Form dapat diisi, divalidasi, dan dikirim secara asinkron tanpa me-refresh halaman.
  - Terdapat pesan error inline jika format email atau input tidak valid.
  - Tetap mempertahankan opsi cadangan `Salin Email` dan link media sosial.

---

### 5.4 Checklist Fase 4: SEO, Aset, Aksesibilitas, & Performa

#### Task 4.1: SEO Lengkap, Metadata, Sitemap, Robots, & JSON-LD Schema
- **ID**: `T4.1`
- **Nama Tugas**: Optimasi Mesin Pencari & Structured Data Aviasi
- **Deskripsi Teknis**:
  - Lengkapi konfigurasi metadata di `src/app/layout.tsx`: `metadataBase: new URL('https://rifqifadhil.dev')`, `keywords`, `openGraph` lengkap (og:title, og:description, og:url, og:locale `id_ID`, og:type `website`), `twitter` card (`summary_large_image`).
  - Buat `src/app/sitemap.ts` untuk pembuatan XML sitemap otomatis.
  - Buat `src/app/robots.ts` untuk aturan perayapan mesin pencari.
  - Tambahkan script terstruktur JSON-LD di `layout.tsx` menggunakan skema `schema.org/ProfilePage` dan `schema.org/Person`.
- **Target File**:
  - `src/app/layout.tsx`
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
- **Layer**: `Presentation / App Router`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - Sitemap dan robots dapat diakses via `/sitemap.xml` dan `/robots.txt`.
  - Uji validasi Google Rich Results lulus tanpa error skema.

#### Task 4.2: Pembuatan Dynamic OpenGraph Image & Custom Aviation Favicon
- **ID**: `T4.2`
- **Nama Tugas**: Pembuatan Aset Visual Aviasi Dinamis Menggunakan Native `next/og`
- **Deskripsi Teknis**:
  - Buat `src/app/opengraph-image.tsx` menggunakan API native Next.js 16 (`import { ImageResponse } from 'next/og'`, resolusi 1200x630) tanpa dependensi eksternal `@vercel/og`, yang merender kartu editorial aviasi dengan tipografi Newsreader, IBM Plex Mono, koordinat WITM-MLG, dan identitas Rifqi Fadhil Abrar.
  - Ganti `src/app/favicon.ico` dan buat `src/app/icon.tsx` yang menghasilkan favicon SVG dinamis berupa reticle kompas aviasi formal.
  - Buat aset SVG lencana sayap pilot di `public/assets/pilot-wings.svg` untuk ornamen taktis di footer atau hero section.
- **Target File**:
  - `src/app/opengraph-image.tsx`
  - `src/app/icon.tsx`
  - `public/assets/pilot-wings.svg`
- **Layer**: `Presentation / Assets`
- **Dependensi**: Tidak ada
- **Definition of Done (DoD)**:
  - URL media sosial menampilkan kartu pratinjau aviasi formal berkualitas tinggi saat dibagikan.
  - Tab browser menampilkan ikon reticle kompas aviasi.

#### Task 4.3: Peningkatan Aksesibilitas Universal (WCAG AA & Keyboard Nav)
- **ID**: `T4.3`
- **Nama Tugas**: Penegakan Aksesibilitas WCAG AA & Navigasi Keyboard
- **Deskripsi Teknis**:
  - Tambahkan elemen `Skip to main content` di awal halaman: `<a href="#s1" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] btn btn-ink">Lewati ke instrumen utama</a>`.
  - Pastikan seluruh elemen tombol dan tautan memiliki rasio kontras warna teks terhadap latar belakang minimal 4.5:1 sesuai standar WCAG AA.
  - Tambahkan dukungan media query `prefers-reduced-motion` untuk mematikan animasi sapuan radar berputar dan pergeseran drone patroli bagi pengguna yang sensitif terhadap gerakan.
- **Target File**:
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `src/presentation/components/flight-deck/SkyBackground.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T2.2`, `T2.3`
- **Definition of Done (DoD)**:
  - Pengguna dapat bernavigasi dari awal hingga akhir hanya menggunakan tombol Tab dan Enter.
  - Evaluasi automated accessibility (Lighthouse / axe-core) bebas dari pelanggaran tingkat kritis.

#### Task 4.4: Optimasi Performa Rendering Scroll Telemetri (60fps Target)
- **ID**: `T4.4`
- **Nama Tugas**: Isolasi Render Scroll Telemetri & Memoization
- **Deskripsi Teknis**:
  - Bungkus komponen seksi statis (`HeroSection`, `ProjectsSection`, `CompetencyRadarSection`, `ExperienceSection`) dengan `React.memo` agar tidak ikut dirender ulang ketika nilai elevasi di `useScrollTelemetry` berubah.
  - Pisahkan pembaruan CSS custom property `--scroll-progress` langsung ke elemen root DOM `document.documentElement.style.setProperty(...)` di dalam rAF throttle tanpa memaksa re-render pohon React.
  - Batasi pembaruan state React hanya untuk komponen daun yang membutuhkan angka numerik (seperti teks ketinggian di `FlightHeader` dan jarum di `AltitudeRuler`).
- **Target File**:
  - `src/presentation/hooks/useScrollTelemetry.ts`
  - `src/presentation/components/flight-deck/FlightDeckView.tsx`
  - `src/presentation/components/flight-deck/HeroSection.tsx`
  - `src/presentation/components/flight-deck/ProjectsSection.tsx`
  - `src/presentation/components/flight-deck/ExperienceSection.tsx`
- **Layer**: `Presentation Layer`
- **Dependensi**: `T2.2`, `T2.4`
- **Definition of Done (DoD)**:
  - Tidak terjadi re-render pada `HeroSection` atau `ProjectsSection` saat menggulir halaman.
  - Performa scrolling mencapai 60fps konstan pada pengujian CPU throttling 4x.

---

## 6. SPESIFIKASI KONTRAK & ANTARMUKA TEKNIS (CODE BLUEPRINTS)

Bagian ini menyajikan kode cetak biru (*code blueprints*) TypeScript produksi siap pakai yang mendefinisikan seluruh kontrak antar layer Clean Architecture.

### 6.1 Domain Entities (`src/domain/entities/`)

#### A. Entitas Proyek Murni (`src/domain/entities/Project.ts`)
```typescript
/**
 * @file Project.ts
 * @layer Domain Layer
 * @description Entitas murni yang merepresentasikan karya rekayasa / proyek portofolio.
 * Zero external dependencies.
 */

export type ProjectStatusType = 'active' | 'completed' | 'in-development' | 'classified';
export type ProjectCategory = 'web' | 'robotics-uav' | 'systems' | 'competition';

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly period: string;
  readonly status: string;
  readonly statusType: ProjectStatusType;
  readonly description: string;
  readonly caseStudyContent?: string;
  readonly technologies: readonly string[];
  readonly metrics?: readonly string[];
  readonly demoUrl?: string;
  readonly repositoryUrl?: string;
  readonly thumbnailUrl?: string;
  readonly featured: boolean;
}
```

#### B. Entitas Kompetensi Bebas CSS (`src/domain/entities/Competency.ts`)
```typescript
/**
 * @file Competency.ts
 * @layer Domain Layer
 * @description Entitas murni kompetensi teknis tanpa atribut tata letak visual CSS.
 */

export type CompetencyGroup = 
  | 'avionics-robotics' 
  | 'frontend' 
  | 'software-eng' 
  | 'data-ai' 
  | 'programming';

export type ProficiencyLevel = 'operational' | 'advanced' | 'experimental';

export interface Competency {
  readonly id: string;
  readonly category: string;
  readonly group: CompetencyGroup;
  readonly skills: readonly string[];
  readonly proficiencyLevel: ProficiencyLevel;
  readonly semanticColorKey: string; // Token semantik murni, bukan inline CSS
}
```

#### C. Entitas Riwayat Pengalaman (`src/domain/entities/Experience.ts`)
```typescript
/**
 * @file Experience.ts
 * @layer Domain Layer
 * @description Entitas murni riwayat pengalaman organisasi, kepanitiaan, dan rekayasa.
 */

export type ExperienceType = 'organization' | 'education' | 'engineering' | 'competition';

export interface Experience {
  readonly id: string;
  readonly type: ExperienceType;
  readonly title: string;
  readonly organization: string;
  readonly location: string;
  readonly period: string;
  readonly isCurrent: boolean;
  readonly description: string;
  readonly highlights?: readonly string[];
}
```

#### D. Entitas Transmisi Radio (`src/domain/entities/Transmission.ts`)
```typescript
/**
 * @file Transmission.ts
 * @layer Domain Layer
 * @description Entitas murni pesan transmisi komunikasi radio kokpit.
 */

export type TransmissionPriority = 'routine' | 'priority' | 'flight-clearance';

export interface Transmission {
  readonly id: string;
  readonly senderName: string;
  readonly senderCallsign?: string;
  readonly senderEmail: string;
  readonly subject: string;
  readonly priority: TransmissionPriority;
  readonly message: string;
  readonly transmittedAt: Date;
}
```

#### E. Entitas Profil Insinyur (`src/domain/entities/Profile.ts`)
```typescript
/**
 * @file Profile.ts
 * @layer Domain Layer
 * @description Entitas murni identitas profesional pemilik portofolio.
 */

export interface ExternalLink {
  readonly label: string;
  readonly url: string;
}

export interface Profile {
  readonly name: string;
  readonly callsign: string;
  readonly title: string;
  readonly studentId: string;
  readonly university: string;
  readonly faculty: string;
  readonly studyProgram: string;
  readonly email: string;
  readonly frequencyCode: string;
  readonly locationOrigin: string;
  readonly locationCurrent: string;
  readonly bioSummary: string;
  readonly photoUrl?: string;
  readonly cvUrl: string;
  readonly links: readonly ExternalLink[];
}
```

---

### 6.2 Domain Repositories (`src/domain/repositories/`)

#### A. Kontrak Repositori Portofolio (`src/domain/repositories/IPortfolioRepository.ts`)
```typescript
/**
 * @file IPortfolioRepository.ts
 * @layer Domain Layer
 * @description Kontrak interface pengambilan data portofolio.
 */

import type { Profile } from '../entities/Profile';
import type { Project, ProjectCategory } from '../entities/Project';
import type { Competency } from '../entities/Competency';
import type { Experience } from '../entities/Experience';

export interface IPortfolioRepository {
  getProfile(): Promise<Profile>;
  getProjects(filter?: { category?: ProjectCategory; featured?: boolean }): Promise<readonly Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getCompetencies(): Promise<readonly Competency[]>;
  getExperiences(): Promise<readonly Experience[]>;
}
```

#### B. Kontrak Layanan Transmisi (`src/domain/repositories/ITransmissionService.ts`)
```typescript
/**
 * @file ITransmissionService.ts
 * @layer Domain Layer
 * @description Kontrak interface transmisi pengiriman pesan kokpit.
 */

import type { Transmission } from '../entities/Transmission';

export interface TransmissionResult {
  readonly success: boolean;
  readonly transmissionId: string;
  readonly acknowledgementCode: string;
  readonly timestamp: Date;
  readonly error?: string;
}

export interface ITransmissionService {
  sendTransmission(transmission: Transmission): Promise<TransmissionResult>;
}
```

---

### 6.3 Application DTOs & Mappers (`src/application/dto/`)

#### A. DTO Radar Kompetensi & Kalkulasi Koordinat (`src/application/dto/CompetencyRadarDTO.ts`)
```typescript
/**
 * @file CompetencyRadarDTO.ts
 * @layer Application Layer
 * @description DTO yang menampung kalkulasi koordinat polar/Cartesian radar blip.
 * Mengisolasi Domain dari kebutuhan visual CSS!
 */

import type { Competency } from '@/domain/entities/Competency';

export interface RadarBlipDTO {
  readonly left: string;
  readonly top: string;
  readonly delay: string;
  readonly azimuthDegrees: number;
  readonly rangeKilometers: number;
}

export interface CompetencyRadarDTO {
  readonly id: string;
  readonly category: string;
  readonly group: string;
  readonly skills: readonly string[];
  readonly skillsFormatted: string;
  readonly proficiencyLevel: string;
  readonly colorToken: string;
  readonly blip: RadarBlipDTO;
}

// Polar to Cartesian coordinate mapping helper (Application logic)
const RADAR_LAYOUT_MAP: Record<string, RadarBlipDTO> = {
  'c-front': { left: '64%', top: '24%', delay: '-0.6s', azimuthDegrees: 48, rangeKilometers: 14.2 },
  'c-uav':   { left: '76%', top: '62%', delay: '-1.4s', azimuthDegrees: 124, rangeKilometers: 21.0 },
  'c-sys':   { left: '32%', top: '72%', delay: '-2.1s', azimuthDegrees: 220, rangeKilometers: 18.5 },
  'c-ai':    { left: '26%', top: '34%', delay: '-0.9s', azimuthDegrees: 310, rangeKilometers: 16.8 },
  'c-code':  { left: '52%', top: '48%', delay: '-1.8s', azimuthDegrees: 15, rangeKilometers: 5.4 },
};

const COLOR_TOKEN_MAP: Record<string, string> = {
  'avionics-robotics': '#D97706', // Amber avionics
  'frontend': '#2A5D8A',          // Cyan radar
  'software-eng': '#2E7D5B',      // Radar green
  'data-ai': '#7C3AED',           // Telemetry purple
  'programming': '#B45309',       // Core gold
};

export function mapCompetencyToRadarDTO(entity: Competency): CompetencyRadarDTO {
  const blip = RADAR_LAYOUT_MAP[entity.id] ?? {
    left: '50%',
    top: '50%',
    delay: '0s',
    azimuthDegrees: 0,
    rangeKilometers: 10.0,
  };

  return {
    id: entity.id,
    category: entity.category,
    group: entity.group,
    skills: entity.skills,
    skillsFormatted: entity.skills.join(' / '),
    proficiencyLevel: entity.proficiencyLevel,
    colorToken: COLOR_TOKEN_MAP[entity.group] ?? '#2A5D8A',
    blip,
  };
}
```

#### B. Skema Zod & DTO Transmisi (`src/application/dto/TransmissionDTO.ts`)
```typescript
/**
 * @file TransmissionDTO.ts
 * @layer Application Layer
 * @description Skema validasi Zod dan tipe input transmisi kontak radio.
 */

import { z } from 'zod';

export const TransmissionInputSchema = z.object({
  senderName: z
    .string()
    .min(2, { message: 'Nama/Callsign wajib minimal 2 karakter.' })
    .max(80, { message: 'Nama/Callsign maksimal 80 karakter.' }),
  senderCallsign: z
    .string()
    .max(20, { message: 'Callsign maksimal 20 karakter.' })
    .optional(),
  senderEmail: z
    .string()
    .email({ message: 'Frekuensi email tidak valid. Masukkan format email yang benar.' }),
  subject: z
    .string()
    .min(3, { message: 'Subjek transmisi minimal 3 karakter.' })
    .max(120, { message: 'Subjek transmisi maksimal 120 karakter.' }),
  priority: z.enum(['routine', 'priority', 'flight-clearance'], {
    errorMap: () => ({ message: 'Pilih tingkat prioritas penerbangan yang valid.' }),
  }),
  message: z
    .string()
    .min(10, { message: 'Isi dispatch pesan minimal 10 karakter.' })
    .max(2000, { message: 'Isi dispatch pesan maksimal 2000 karakter.' }),
});

export type TransmissionInputDTO = z.infer<typeof TransmissionInputSchema>;

export interface TransmissionResponseDTO {
  readonly success: boolean;
  readonly transmissionId?: string;
  readonly acknowledgementCode?: string;
  readonly timestamp?: string;
  readonly errors?: Record<string, string[]>;
  readonly message: string;
}
```

---

### 6.4 Application Use Cases (`src/application/use-cases/`)

#### A. Use Case Ambil Data Ikhtisar Portofolio (`GetPortfolioOverviewUseCase.ts`)
```typescript
/**
 * @file GetPortfolioOverviewUseCase.ts
 * @layer Application Layer
 * @description Mengorkestrasi pengambilan seluruh data ikhtisar portofolio untuk landing view.
 */

import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import { mapCompetencyToRadarDTO } from '../dto/CompetencyRadarDTO';
import type { PortfolioOverviewDTO } from '../dto/PortfolioOverviewDTO';

export class GetPortfolioOverviewUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<PortfolioOverviewDTO> {
    const [profile, projects, competencies, experiences] = await Promise.all([
      this.repository.getProfile(),
      this.repository.getProjects(),
      this.repository.getCompetencies(),
      this.repository.getExperiences(),
    ]);

    return {
      profile: {
        name: profile.name,
        callsign: profile.callsign,
        title: profile.title,
        studentId: profile.studentId,
        university: profile.university,
        faculty: profile.faculty,
        studyProgram: profile.studyProgram,
        email: profile.email,
        frequencyCode: profile.frequencyCode,
        locationOrigin: profile.locationOrigin,
        locationCurrent: profile.locationCurrent,
        bioSummary: profile.bioSummary,
        photoUrl: profile.photoUrl,
        cvUrl: profile.cvUrl,
        links: profile.links,
      },
      projects: projects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        role: p.role,
        category: p.category,
        period: p.period,
        status: p.status,
        statusType: p.statusType,
        description: p.description,
        caseStudyContent: p.caseStudyContent,
        technologies: p.technologies,
        metrics: p.metrics ?? [],
        demoUrl: p.demoUrl,
        repositoryUrl: p.repositoryUrl,
        thumbnailUrl: p.thumbnailUrl,
        featured: p.featured,
      })),
      competencies: competencies.map(mapCompetencyToRadarDTO),
      experiences: experiences.map((e) => ({
        id: e.id,
        type: e.type,
        title: e.title,
        organization: e.organization,
        location: e.location,
        period: e.period,
        isCurrent: e.isCurrent,
        description: e.description,
        highlights: e.highlights ?? [],
      })),
    };
  }
}
```

#### B. Use Case Kirim Pesan Transmisi Radio (`SendTransmissionUseCase.ts`)
```typescript
/**
 * @file SendTransmissionUseCase.ts
 * @layer Application Layer
 * @description Use case untuk memvalidasi dan mengirimkan pesan transmisi radio kokpit.
 */

import type { ITransmissionService } from '@/domain/repositories/ITransmissionService';
import type { Transmission } from '@/domain/entities/Transmission';
import { TransmissionInputSchema, type TransmissionInputDTO, type TransmissionResponseDTO } from '../dto/TransmissionDTO';

export class SendTransmissionUseCase {
  constructor(private readonly transmissionService: ITransmissionService) {}

  async execute(input: TransmissionInputDTO): Promise<TransmissionResponseDTO> {
    // 1. Validasi skema input
    const parseResult = TransmissionInputSchema.safeParse(input);
    if (!parseResult.success) {
      const fieldErrors = parseResult.error.flatten().fieldErrors;
      return {
        success: false,
        errors: fieldErrors,
        message: 'Validasi parameter sinyal transmisi gagal.',
      };
    }

    const validData = parseResult.data;

    // 2. Bentuk entitas domain Transmission
    const transmissionEntity: Transmission = {
      id: `TX-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      senderName: validData.senderName.trim(),
      senderCallsign: validData.senderCallsign?.trim() || undefined,
      senderEmail: validData.senderEmail.trim().toLowerCase(),
      subject: validData.subject.trim(),
      priority: validData.priority,
      message: validData.message.trim(),
      transmittedAt: new Date(),
    };

    // 3. Eksekusi transmisi melalui service
    try {
      const result = await this.transmissionService.sendTransmission(transmissionEntity);
      if (!result.success) {
        return {
          success: false,
          message: result.error || 'Gangguan telemetri: Sinyal transmisi gagal diterima oleh menara kontrol.',
        };
      }

      return {
        success: true,
        transmissionId: result.transmissionId,
        acknowledgementCode: result.acknowledgementCode,
        timestamp: result.timestamp.toISOString(),
        message: `Clearance diterima. Transmisi #${result.acknowledgementCode} tercatat di Flight Log.`,
      };
    } catch {
      return {
        success: false,
        message: 'Kegagalan sistem internal saat menyiarkan transmisi radio.',
      };
    }
  }
}
```

#### C. Use Case Ambil Detail Proyek (`src/application/use-cases/GetProjectDetailUseCase.ts`)
```typescript
/**
 * @file GetProjectDetailUseCase.ts
 * @layer Application Layer
 * @description Mengambil data rinci satu proyek berdasarkan slug atau ID untuk dialog studi kasus modal.
 */

import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import type { ProjectDTO } from '../dto/ProjectDTO';

export class GetProjectDetailUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(slugOrId: string): Promise<ProjectDTO | null> {
    const project = await this.repository.getProjectBySlug(slugOrId);
    if (!project) return null;

    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      role: project.role,
      category: project.category,
      period: project.period,
      status: project.status,
      statusType: project.statusType,
      description: project.description,
      caseStudyContent: project.caseStudyContent,
      technologies: project.technologies,
      metrics: project.metrics ?? [],
      demoUrl: project.demoUrl,
      repositoryUrl: project.repositoryUrl,
      thumbnailUrl: project.thumbnailUrl,
      featured: project.featured,
    };
  }
}
```

---

### 6.5 Infrastructure Implementations & Composition Root (`src/infrastructure/`)

#### A. Composition Root Fase 1 (`src/infrastructure/di/container.ts`)
```typescript
/**
 * @file container.ts
 * @layer Infrastructure Layer
 * @description Composition Root untuk Dependency Injection di Next.js 16 App Router (Scope Fase 1).
 * Mengisolasi dependensi portofolio tanpa forward dependency trap ke layanan transmisi Fase 3.
 */

import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import { StaticPortfolioRepository } from '../repositories/StaticPortfolioRepository';
import { GetPortfolioOverviewUseCase } from '@/application/use-cases/GetPortfolioOverviewUseCase';
import { GetProjectDetailUseCase } from '@/application/use-cases/GetProjectDetailUseCase';

// Single instance factory (IoC Container Fase 1)
class AppContainer {
  private static portfolioRepo: IPortfolioRepository | null = null;

  public static getPortfolioRepository(): IPortfolioRepository {
    if (!this.portfolioRepo) {
      this.portfolioRepo = new StaticPortfolioRepository();
    }
    return this.portfolioRepo;
  }

  public static getPortfolioUseCases() {
    const repo = this.getPortfolioRepository();

    return {
      getPortfolioOverview: new GetPortfolioOverviewUseCase(repo),
      getProjectDetail: new GetProjectDetailUseCase(repo),
    };
  }
}

export const container = AppContainer;
export const getPortfolioUseCases = () => AppContainer.getPortfolioUseCases();
```

#### B. Layanan Logging Transmisi (`src/infrastructure/services/LoggingTransmissionService.ts`)
```typescript
/**
 * @file LoggingTransmissionService.ts
 * @layer Infrastructure Layer
 * @description Layanan simulasi transmisi kokpit dengan latensi jaringan realistis (Diimplementasikan di Fase 3).
 */

import type { ITransmissionService, TransmissionResult } from '@/domain/repositories/ITransmissionService';
import type { Transmission } from '@/domain/entities/Transmission';

export class LoggingTransmissionService implements ITransmissionService {
  private readonly transmissionLog: Transmission[] = [];

  async sendTransmission(transmission: Transmission): Promise<TransmissionResult> {
    // Simulasi latensi transmisi radio aviasi (700ms)
    await new Promise((resolve) => setTimeout(resolve, 700));

    // Simpan ke log in-memory (pada lingkungan serverless / edge, persistensi cadangan dapat dialihkan ke database/file)
    this.transmissionLog.push(transmission);

    const ackCode = `ACK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Output telemetri server log
    console.info(
      `[FLIGHT DECK TRANSMISSION] Received ID: ${transmission.id} | Priority: ${transmission.priority} | Callsign: ${transmission.senderName} (${transmission.senderEmail}) | Code: ${ackCode}`
    );

    return {
      success: true,
      transmissionId: transmission.id,
      acknowledgementCode: ackCode,
      timestamp: new Date(),
    };
  }

  getRecentLogs(): readonly Transmission[] {
    return Object.freeze([...this.transmissionLog]);
  }
}
```

#### C. Implementasi Repositori Portofolio Statis (`src/infrastructure/repositories/StaticPortfolioRepository.ts`)
```typescript
/**
 * @file StaticPortfolioRepository.ts
 * @layer Infrastructure Layer
 * @description Implementasi repositori portofolio konkret yang mengembalikan entitas domain murni.
 * Bebas dari CSS styling attributes (blip, delay) dan framework dependencies.
 */

import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import type { Profile } from '@/domain/entities/Profile';
import type { Project, ProjectCategory } from '@/domain/entities/Project';
import type { Competency } from '@/domain/entities/Competency';
import type { Experience } from '@/domain/entities/Experience';

export class StaticPortfolioRepository implements IPortfolioRepository {
  private readonly profileData: Profile = {
    name: 'Rifqi Fadhil Abrar',
    callsign: 'RF-2026',
    title: 'Mahasiswa S1 Teknik Informatika & Pegiat Robotika / UAV',
    studentId: '255150200111000',
    university: 'Universitas Brawijaya',
    faculty: 'Fakultas Ilmu Komputer (FILKOM)',
    studyProgram: 'S1 Teknik Informatika',
    email: 'rifqifadhilabrar@gmail.com',
    frequencyCode: 'VHF-121.5-UB',
    locationOrigin: 'Lhokseumawe, Aceh (WITM)',
    locationCurrent: 'Malang, Jawa Timur (MLG / WARA)',
    bioSummary:
      'Mahasiswa Teknik Informatika di Universitas Brawijaya yang berfokus pada rekayasa antarmuka web modern, perancangan interaktif yang presisi, serta eksplorasi teknologi sistem robotika & UAV.',
    photoUrl: '/assets/profile-avatar.svg',
    cvUrl: '#',
    links: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'LinkedIn', url: 'https://linkedin.com' },
      { label: 'CV (PDF)', url: '#' },
    ],
  };

  private readonly projectsData: readonly Project[] = [
    {
      id: 'P-01',
      slug: 'sge-filkom-ub-2026',
      title: 'Website SGE FILKOM UB 2026',
      role: 'Frontend · Staff IT Solution',
      category: 'web',
      period: '2026',
      status: 'Berjalan',
      statusType: 'active',
      description:
        'Mengubah desain UI menjadi website dengan fitur interaktif dan layout responsif untuk semua perangkat.',
      caseStudyContent:
        'Pengembangan arsitektur antarmuka web modern berbasis Next.js 16 dan Tailwind CSS v4 untuk platform pameran karya ilmiah dan inovasi mahasiswa FILKOM UB. Mengimplementasikan isolasi state komponen, responsivitas multi-device, dan optimasi jalur kritis rendering.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      metrics: ['Lighthouse Performance 98', 'Responsif 100% Mobile & Desktop'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/sge-2026.svg',
      featured: true,
    },
    {
      id: 'P-02',
      slug: 'platform-pit-pkkmb-startup-academy',
      title: 'Platform PIT, PKKMB & Startup Academy',
      role: 'Frontend Developer',
      category: 'web',
      period: 'Jul – Des 2026',
      status: 'Selesai',
      statusType: 'completed',
      description:
        'Antarmuka responsif untuk platform acara dan integrasi fitur website bersama tim pengembang.',
      caseStudyContent:
        'Membangun antarmuka dashboard registrasi ribuan mahasiswa baru dan peserta akademi startup. Mengintegrasikan otentikasi aman, validasi form waktu-nyata, dan arsitektur komponen reusable berkecepatan tinggi.',
      technologies: ['Next.js', 'TypeScript', 'REST API', 'Figma'],
      metrics: ['Mendukung 4.000+ pengguna aktif', 'Waktu muat halaman < 1.2 detik'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/pit-pkkmb.svg',
      featured: true,
    },
    {
      id: 'P-03',
      slug: 'sistem-elektrik-robot-robotiik',
      title: 'Sistem elektrik robot ROBOTIIK',
      role: 'Electrical Staff · Atyabrama',
      category: 'robotics-uav',
      period: 'Berjalan',
      status: 'Berjalan',
      statusType: 'active',
      description:
        'Wiring, integrasi komponen elektrik, dan troubleshooting agar sistem robotik andal saat pengembangan dan kompetisi.',
      caseStudyContent:
        'Perancangan modul distribusi catu daya terisolasi, manajemen pengkabelan avionik miniatur, integrasi modul IMU dan sensor telemetri, serta debugging interferensi sinyal frekuensi radio.',
      technologies: ['Power Distribution', 'IMU Sensors', 'Hardware Debugging', 'Wiring Avionics'],
      metrics: ['Toleransi tegangan ±0.05V', 'Keandalan operasi sistem 99.8%'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/robotiik.svg',
      featured: true,
    },
    {
      id: 'P-04',
      slug: 'ktri-td-2026-ikn',
      title: 'KTRI TD 2026 – IKN',
      role: 'Robot & UAV · 2026',
      category: 'competition',
      period: '2026',
      status: 'Selesai · Juara 2',
      statusType: 'completed',
      description:
        'Kontribusi pada pengembangan dan implementasi arsitektur sistem robot dan UAV bersama tim perwakilan kampus.',
      caseStudyContent:
        'Riset dan implementasi protokol telemetri nirkabel UAV dua arah, pemrosesan sinyal sensor kendali otonom jarak jauh, serta pengujian penerbangan taktis pada arena Kontes Robot Terbang Nasional di IKN.',
      technologies: ['UAV Telemetry', 'Radio Frequency', 'Autonomous Navigation', 'Robotics Architecture'],
      metrics: ['Peringkat Juara 2 Nasional', 'Latensi telemetri < 50ms'],
      demoUrl: '#',
      repositoryUrl: 'https://github.com',
      thumbnailUrl: '/assets/projects/ktri-uav.svg',
      featured: true,
    },
  ];

  private readonly competenciesData: readonly Competency[] = [
    {
      id: 'c-front',
      category: 'Frontend',
      group: 'frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Desain Responsif', 'Clean UI'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'frontend',
    },
    {
      id: 'c-code',
      category: 'Pemrograman',
      group: 'programming',
      skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Algoritma & Struktur Data'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'programming',
    },
    {
      id: 'c-sys',
      category: 'Rekayasa Perangkat Lunak',
      group: 'software-eng',
      skills: ['Aplikasi Web', 'Clean Architecture', 'Git Workflow', 'Kerja Tim Berbasis Proyek'],
      proficiencyLevel: 'operational',
      semanticColorKey: 'software-eng',
    },
    {
      id: 'c-uav',
      category: 'Robotika & UAV',
      group: 'avionics-robotics',
      skills: ['Wiring Elektrik', 'Integrasi Komponen', 'Troubleshooting Sistem', 'Telemetri UAV'],
      proficiencyLevel: 'advanced',
      semanticColorKey: 'avionics-robotics',
    },
    {
      id: 'c-ai',
      category: 'Data & AI',
      group: 'data-ai',
      skills: ['Teknologi Berbasis Data', 'Dasar Kecerdasan Buatan', 'Machine Learning Exploratory'],
      proficiencyLevel: 'operational',
      semanticColorKey: 'data-ai',
    },
  ];

  private readonly experiencesData: readonly Experience[] = [
    {
      id: 'exp-1',
      type: 'organization',
      title: 'Staff IT Solution (Frontend)',
      organization: 'PIT & PKKMB FILKOM UB 2026',
      location: 'Malang, Jawa Timur',
      period: 'Jul – Des 2026',
      isCurrent: false,
      description:
        'Mengembangkan antarmuka pengguna website acara, memastikan tampilan responsif di ponsel dan desktop, serta berkolaborasi dengan tim lintas divisi.',
      highlights: [
        'Memimpin implementasi komponen UI responsif untuk ribuan pengguna',
        'Kolaborasi intensif dengan tim desain dan divisi backend',
      ],
    },
    {
      id: 'exp-2',
      type: 'engineering',
      title: 'Staff Divisi Elektrikal Atyabrama',
      organization: 'ROBOTIIK FILKOM UB',
      location: 'Malang, Jawa Timur',
      period: 'Des 2025 – sekarang',
      isCurrent: true,
      description:
        'Mendukung perancangan dan keandalan sistem elektrik proyek robotika selama tahap riset, prototyping, dan pengujian performa.',
      highlights: [
        'Perancangan dan pengujian jalur distribusi daya wahana robotik',
        'Troubleshooting modul sensor avionik dan sistem kendali daya',
      ],
    },
    {
      id: 'exp-3',
      type: 'education',
      title: 'S1 Teknik Informatika',
      organization: 'Universitas Brawijaya, Malang',
      location: 'Malang, Jawa Timur',
      period: 'Agu 2025 – sekarang',
      isCurrent: true,
      description:
        'Mendalami ilmu rekayasa perangkat lunak, sistem komputasi, pengembangan web modern, serta dasar-dasar kecerdasan buatan.',
      highlights: [
        'Fokus pada rekayasa antarmuka web dan sistem komputasi cerdas',
        'Aktif dalam riset perangkat keras dan sistem robotik terapan',
      ],
    },
  ];

  async getProfile(): Promise<Profile> {
    return { ...this.profileData };
  }

  async getProjects(filter?: { category?: ProjectCategory; featured?: boolean }): Promise<readonly Project[]> {
    let result = [...this.projectsData];
    if (filter?.category) {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter?.featured !== undefined) {
      result = result.filter((p) => p.featured === filter.featured);
    }
    return Object.freeze(result);
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const found = this.projectsData.find((p) => p.slug === slug || p.id === slug);
    return found ? { ...found } : null;
  }

  async getCompetencies(): Promise<readonly Competency[]> {
    return Object.freeze([...this.competenciesData]);
  }

  async getExperiences(): Promise<readonly Experience[]> {
    return Object.freeze([...this.experiencesData]);
  }
}
```

#### D. Ekstensi Composition Root Fase 3 (`src/infrastructure/di/container.ts`)
```typescript
/**
 * @file container.ts (Ekstensi Fase 3)
 * @layer Infrastructure Layer
 * @description Pembaruan Composition Root pada Fase 3 setelah LoggingTransmissionService dibuat di Task 3.1.
 */

import type { IPortfolioRepository } from '@/domain/repositories/IPortfolioRepository';
import type { ITransmissionService } from '@/domain/repositories/ITransmissionService';
import { StaticPortfolioRepository } from '../repositories/StaticPortfolioRepository';
import { LoggingTransmissionService } from '../services/LoggingTransmissionService';
import { GetPortfolioOverviewUseCase } from '@/application/use-cases/GetPortfolioOverviewUseCase';
import { GetProjectDetailUseCase } from '@/application/use-cases/GetProjectDetailUseCase';
import { SendTransmissionUseCase } from '@/application/use-cases/SendTransmissionUseCase';

class AppContainer {
  private static portfolioRepo: IPortfolioRepository | null = null;
  private static transmissionService: ITransmissionService | null = null;

  public static getPortfolioRepository(): IPortfolioRepository {
    if (!this.portfolioRepo) {
      this.portfolioRepo = new StaticPortfolioRepository();
    }
    return this.portfolioRepo;
  }

  public static getTransmissionService(): ITransmissionService {
    if (!this.transmissionService) {
      this.transmissionService = new LoggingTransmissionService();
    }
    return this.transmissionService;
  }

  public static getPortfolioUseCases() {
    const repo = this.getPortfolioRepository();
    const trans = this.getTransmissionService();

    return {
      getPortfolioOverview: new GetPortfolioOverviewUseCase(repo),
      getProjectDetail: new GetProjectDetailUseCase(repo),
      sendTransmission: new SendTransmissionUseCase(trans),
    };
  }
}

export const container = AppContainer;
export const getPortfolioUseCases = () => AppContainer.getPortfolioUseCases();
```

---

### 6.6 Shared Constants, Types, & Utilities (`src/shared/`)

#### A. Konstanta Flight Deck (`src/shared/constants/flight-deck.ts`)
```typescript
/**
 * @file flight-deck.ts
 * @layer Shared Layer
 * @description Sentralisasi nilai-nilai konstanta tematik Flight Deck Formal.
 */

export const FLIGHT_DECK_CONSTANTS = {
  CALLSIGN: 'RF-2026',
  ORIGIN_AIRPORT: 'Lhokseumawe (WITM)',
  DESTINATION_AIRPORT: 'Malang (MLG / WARA)',
  ALTITUDE_MAX_METERS: 1200,
  TIMEZONE: 'Asia/Jakarta',
  STATION_CODE: 'MLG',
  DEFAULT_ALTITUDE_TEXT: 'ALT 0000 M',
} as const;

export const FLIGHT_NAV_SECTIONS = [
  { id: 's1', label: 'Proyek', checkpointAltitude: 300, description: 'Rekayasa Perangkat Lunak & UAV' },
  { id: 's2', label: 'Kompetensi', checkpointAltitude: 600, description: 'Radar Keahlian & Teknologi' },
  { id: 's3', label: 'Pengalaman', checkpointAltitude: 900, description: 'Log Penerbangan & Organisasi' },
  { id: 's4', label: 'Transmisi', checkpointAltitude: 1200, description: 'Konsol Radio & Kontak' },
] as const;
```

#### B. Utilitas Penggabungan Class Tailwind (`src/shared/utils/cn.ts`)
```typescript
/**
 * @file cn.ts
 * @layer Shared Layer
 * @description Helper utilitas penggabungan conditional classes Tailwind v4 tanpa benturan spesifisitas.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

#### C. Utilitas Telemetri (`src/shared/utils/telemetry.ts`)
```typescript
/**
 * @file telemetry.ts
 * @layer Shared Layer
 * @description Fungsi-fungsi murni kalkulasi telemetri elevasi dan format waktu.
 */

import { FLIGHT_DECK_CONSTANTS } from '../constants/flight-deck';

export function calculateAltitudeFromProgress(progress: number): {
  altitudeMeters: number;
  formattedText: string;
} {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const altitudeMeters = Math.round(clampedProgress * FLIGHT_DECK_CONSTANTS.ALTITUDE_MAX_METERS);
  const paddedMeters = String(altitudeMeters).padStart(4, '0');

  return {
    altitudeMeters,
    formattedText: `ALT ${paddedMeters} M`,
  };
}

export function formatWibTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: FLIGHT_DECK_CONSTANTS.TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}
```

---

### 6.7 Presentation Server Actions (`src/app/actions/transmission.ts`)

```typescript
/**
 * @file transmission.ts
 * @layer Presentation Layer / App Router Server Action
 * @description Server Action Next.js 16 untuk menerima formulir transmisi radio.
 */

'use server';

import { getPortfolioUseCases } from '@/infrastructure/di/container';
import type { TransmissionResponseDTO } from '@/application/dto/TransmissionDTO';

export async function sendTransmissionAction(
  _prevState: TransmissionResponseDTO | null,
  formData: FormData
): Promise<TransmissionResponseDTO> {
  const rawData = {
    senderName: formData.get('senderName')?.toString() || '',
    senderCallsign: formData.get('senderCallsign')?.toString() || undefined,
    senderEmail: formData.get('senderEmail')?.toString() || '',
    subject: formData.get('subject')?.toString() || '',
    priority: (formData.get('priority')?.toString() || 'routine') as 'routine' | 'priority' | 'flight-clearance',
    message: formData.get('message')?.toString() || '',
  };

  const useCase = getPortfolioUseCases().sendTransmission;
  return await useCase.execute(rawData);
}
```

---

## 7. STRATEGI PENGUJIAN & VERIFIKASI (VERIFICATION STRATEGY)

Strategi pengujian disusun secara sistematis untuk memvalidasi setiap capaian implementasi secara objektif, mencegah terjadinya regresi, dan menjamin kepatuhan penuh terhadap *Clean Architecture Dependency Rule*.

### 7.1 Matriks Verifikasi Lintas Layer

| Layer yang Diuji | Aspek yang Diverifikasi | Perintah / Alat Verifikasi | Kriteria Lolos (Pass Criteria) |
| :--- | :--- | :--- | :--- |
| **Domain Layer** | Kemurnian Kode (Zero CSS & Zero External Imports) | `npx ripgrep "from '@/" src/domain` & `npx ripgrep "left|top|delay" src/domain` | **0 kecocokan**: Domain tidak memuat import keluar dan bebas koordinat CSS. |
| **Application Layer** | Decoupling DTO & Validasi Zod | Unit test use case & `npx tsc --noEmit` | Seluruh input tervalidasi skema Zod dan menghasilkan DTO terpisah. |
| **Infrastructure** | Kompatibilitas Build Turbopack | `npm run build` | Build Turbopack sukses dengan status `✓ Compiled successfully`. |
| **Presentation** | Zero Domain Imports di UI | `npx ripgrep "from '@/domain" src/presentation` | **0 kecocokan**: Komponen UI hanya mengimpor DTO dari `@/application/dto`. |
| **UI/UX & Mobile** | Aksesibilitas Navigasi Seluler | Pengujian responsif viewport 375px (iPhone SE) dan 700px | Navigasi mobile menu drawer muncul dan dapat mengarahkan ke semua seksi. |
| **Interaktivitas** | Modal Proyek & Radar Target Lock | Interaksi pengguna di peramban | Mengklik kartu memunculkan modal; meng-hover blip memicu "Target Lock". |
| **Form Transmisi** | Validasi & Dispatch Server Action | Pengujian submit form valid dan invalid | Server Action mengembalikan respons ACK terstruktur dan pesan error inline. |
| **Kinerja & a11y** | Core Web Vitals & Standar WCAG AA | Audit Lighthouse & DevTools Profiler | Skor Aksesibilitas >= 95, SEO >= 95, dan frame rate scroll stabil di 60fps. |

---

### 7.2 Skrip Pengujian Otomatis & Perintah CLI

Lakukan verifikasi berkala selama dan setelah implementasi dengan menjalankan rangkaian perintah berikut:

```powershell
# 1. Verifikasi Linting ESLint 9 (Flat Config)
npm run lint

# 2. Verifikasi Kompilasi TypeScript Strict Mode
npx tsc --noEmit

# 3. Verifikasi Keberadaan Paket Zod di dependencies (package.json)
node -e "const p = require('./package.json'); if (!p.dependencies || !p.dependencies.zod) { console.error('Zod tidak terdaftar di dependencies!'); process.exit(1); } console.log('ZOD OK:', p.dependencies.zod);"

# 4. Verifikasi Aturan Dependensi Clean Architecture (Zero Domain Imports in Presentation)
# PERINTAH INI WAJIB MENGHASILKAN 0 MATCH:
npx ripgrep "from '@/domain" src/presentation

# 5. Verifikasi Kemurnian Domain (Zero UI/CSS attributes in Domain)
# PERINTAH INI WAJIB MENGHASILKAN 0 MATCH:
npx ripgrep "blip|delay" src/domain

# 6. Verifikasi Penghapusan @import CSS Font Eksternal & Resolusi Token Unik
# PERINTAH INI WAJIB MENGHASILKAN 0 MATCH:
npx ripgrep "@import url" src/app/globals.css
# PERINTAH INI WAJIB MENGHASILKAN MINIMAL 1 MATCH (terhubung ke font preloaded Next.js):
npx ripgrep "var\(--font-newsreader\)" src/app/globals.css
# PERINTAH INI WAJIB MENGHASILKAN 0 MATCH (tidak boleh ada referensi sirkular):
npx ripgrep "--font-serif:\s*var\(--font-serif\)" src/app/globals.css

# 7. Verifikasi Pipeline Build Produksi Next.js 16 Bebas Crash EPERM di Windows
npm run build
```

---

### 7.3 Kriteria Penerimaan (Acceptance Criteria Checklist)

Checklist ini mencerminkan pemenuhan menyeluruh terhadap persyaratan di `ORIGINAL_REQUEST.md`:

#### Kategori A: Audit & Analisis Kesenjangan (Gap Analysis)
- [x] Dokumen memuat hasil audit mendalam terhadap layer presentasi (`src/presentation/components/flight-deck/`, hooks telemetri, dan styling CSS).
- [x] Dokumen mengidentifikasi pelanggaran dependensi Clean Architecture (import domain langsung di UI, pencemaran CSS di entitas domain, anemic DTO, direct repository instantiation di `page.tsx`).
- [x] Dokumen mengevaluasi ketiadaan fungsionalitas formulir transmisi/kontak interaktif.
- [x] Dokumen mengaudit build issue Turbopack, pemuatan font Google, aset grafis aviasi, SEO metadata, dan bottleneck re-render scroll.
- [x] Dokumen menetapkan matriks prioritas peningkatan (P0 – P4) dengan justifikasi teknis dan dampak pengguna yang terukur.

#### Kategori B: Struktur Rencana & Roadmap Bertahap
- [x] Roadmap terbagi ke dalam 4 fase terstruktur:
  - Fase 1: Fondasi Clean Architecture, Sistem, & Normalisasi Build.
  - Fase 2: Interaktivitas UI/UX, Navigasi Mobile, & Avionics HUD.
  - Fase 3: Flight Transmission Console (Terminal Kontak Interaktif).
  - Fase 4: Optimasi SEO, Aset Tematik, Aksesibilitas, & Performa.
- [x] Setiap fase memuat daftar tugas terperinci (*actionable tasks*) lengkap dengan ID Tugas, Target File, Layer Arsitektur, Dependensi, dan *Definition of Done* (DoD) yang jelas.

#### Kategori C: Kepatuhan Arsitektur & Kesiapan Eksekusi
- [x] Setiap fitur dan komponen dipetakan secara ketat ke layer Clean Architecture (Domain, Application, Infrastructure, Presentation, Shared).
- [x] Disediakan cetak biru kode TypeScript produksi (*Code Blueprints*) untuk entitas domain murni, kontrak repositori, application DTOs & mappers, use cases, composition root, dan Server Actions.
- [x] Menyertakan strategi pengujian dan verifikasi otomatis lintas layer yang siap dieksekusi tanpa ambiguitas teknis.

---
*Dokumen Rencana ini disusun secara resmi untuk tim rekayasa rifqi-fadhil-project dan siap digunakan sebagai panduan implementasi.*
